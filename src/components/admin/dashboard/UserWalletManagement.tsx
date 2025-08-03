import React, { useState, useEffect } from 'react';
import { Search, Edit, Wallet, Plus, Minus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

interface UserWalletData {
  user_id: string;
  email: string;
  name: string;
  points: number;
  balance: number;
  total_earned: number;
  total_withdrawn: number;
}

interface WalletTransaction {
  id: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
}

export const UserWalletManagement: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWalletData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWalletData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWalletData | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [editForm, setEditForm] = useState({
    points: 0,
    balance: 0,
    reason: ''
  });
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<UserWalletData[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, username')
        .not('email', 'is', null);

      if (profilesError) throw profilesError;

      // Get user points separately
      const { data: userPoints } = await supabase
        .from('user_points')
        .select('user_id, points');

      // Get user wallets separately  
      const { data: userWallets } = await supabase
        .from('user_wallets')
        .select('user_id, balance, total_earned, total_withdrawn');

      // Combine the data
      const formattedUsers: UserWalletData[] = profiles?.map(profile => {
        const userPoint = userPoints?.find(up => up.user_id === profile.id);
        const userWallet = userWallets?.find(uw => uw.user_id === profile.id);
        
        return {
          user_id: profile.id,
          email: profile.email || '',
          name: profile.username || profile.email || 'Usuario sin nombre',
          points: userPoint?.points || 0,
          balance: userWallet?.balance || 0,
          total_earned: userWallet?.total_earned || 0,
          total_withdrawn: userWallet?.total_withdrawn || 0,
        };
      }) || [];

      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos de usuarios.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
      setSearchSuggestions([]);
      return;
    }
    // Enhanced search to include username field (which corresponds to the name field in profiles)
    const filtered = users.filter(user => 
      (user.name && user.name.toLowerCase().includes(query.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(query.toLowerCase())) ||
      (user.user_id && user.user_id.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered);
    
    // Set suggestions for dropdown (limit to 5 for better UX)
    const suggestions = filtered.slice(0, 5);
    setSearchSuggestions(suggestions);
  };

  const handleSelectUser = (user: UserWalletData) => {
    setSearchQuery(user.name || user.email);
    setFilteredUsers([user]);
    setSearchSuggestions([]);
    setSearchOpen(false);
  };

  const handleEditWallet = (user: UserWalletData) => {
    setSelectedUser(user);
    setEditForm({
      points: user.points,
      balance: user.balance,
      reason: ''
    });
    setIsEditDialogOpen(true);
  };

  const handleViewTransactions = async (user: UserWalletData) => {
    setSelectedUser(user);
    try {
      // Get point transactions
      const { data: pointTransactions } = await supabase
        .from('point_transactions')
        .select('*')
        .eq('user_id', user.user_id)
        .order('created_at', { ascending: false })
        .limit(20);

      // Get wallet transactions
      const { data: walletTransactions } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.user_id)
        .order('created_at', { ascending: false })
        .limit(20);

      const allTransactions = [
        ...(pointTransactions || []).map(t => ({
          id: t.id,
          amount: t.amount,
          transaction_type: `Points: ${t.transaction_type}`,
          description: t.description || '',
          created_at: t.created_at
        })),
        ...(walletTransactions || []).map(t => ({
          id: t.id,
          amount: t.amount,
          transaction_type: `Wallet: ${t.transaction_type}`,
          description: t.description || '',
          created_at: t.created_at
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setTransactions(allTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
    setIsTransactionDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    try {
      const pointsDiff = editForm.points - selectedUser.points;
      const balanceDiff = editForm.balance - selectedUser.balance;

      // Update points if changed
      if (pointsDiff !== 0) {
        const { error: pointsError } = await supabase.rpc('add_points_to_user', {
          p_user_id: selectedUser.user_id,
          p_amount: pointsDiff,
          p_transaction_type: pointsDiff > 0 ? 'admin_adjustment_add' : 'admin_adjustment_subtract',
          p_description: `Admin adjustment: ${editForm.reason || 'Manual adjustment'}`
        });

        if (pointsError) throw pointsError;
      }

      // Update wallet balance if changed
      if (balanceDiff !== 0) {
        if (balanceDiff > 0) {
          const { error: walletError } = await supabase.rpc('add_prize_money', {
            p_user_id: selectedUser.user_id,
            p_amount: balanceDiff,
            p_contest_id: null,
            p_description: `Admin adjustment: ${editForm.reason || 'Manual adjustment'}`
          });
          if (walletError) throw walletError;
        } else {
          // For negative adjustments, we need to directly update the wallet
          const { error: updateError } = await supabase
            .from('user_wallets')
            .update({ 
              balance: editForm.balance,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', selectedUser.user_id);

          if (updateError) throw updateError;

          // Record the transaction
          const { error: transactionError } = await supabase
            .from('wallet_transactions')
            .insert({
              user_id: selectedUser.user_id,
              amount: balanceDiff,
              transaction_type: 'admin_adjustment',
              description: `Admin adjustment: ${editForm.reason || 'Manual adjustment'}`
            });

          if (transactionError) throw transactionError;
        }
      }

      toast({
        title: 'Cambios guardados',
        description: 'La cartera del usuario ha sido actualizada correctamente.',
      });

      setIsEditDialogOpen(false);
      loadUsers(); // Reload to get fresh data
    } catch (error) {
      console.error('Error updating wallet:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron guardar los cambios.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Carteras</h2>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchQuery}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                    setSearchOpen(e.target.value.length > 0);
                  }}
                  onFocus={() => setSearchOpen(searchQuery.length > 0)}
                  className="w-64"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandList>
                  {searchSuggestions.length > 0 ? (
                    <CommandGroup>
                      {searchSuggestions.map((user) => (
                        <CommandItem
                          key={user.user_id}
                          onSelect={() => handleSelectUser(user)}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : searchQuery.length > 0 ? (
                    <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
                  ) : null}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.user_id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewTransactions(user)}
                  >
                    <History className="h-4 w-4 mr-1" />
                    Historial
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditWallet(user)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{user.points}</div>
                  <div className="text-sm text-muted-foreground">Puntos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">€{user.balance}</div>
                  <div className="text-sm text-muted-foreground">Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">€{user.total_earned}</div>
                  <div className="text-sm text-muted-foreground">Total Ganado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">€{user.total_withdrawn}</div>
                  <div className="text-sm text-muted-foreground">Total Retirado</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Wallet Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Cartera de Usuario</DialogTitle>
            <DialogDescription>
              Modificar puntos y balance de {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="points">Puntos</Label>
              <Input
                id="points"
                type="number"
                value={editForm.points}
                onChange={(e) => setEditForm({...editForm, points: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <Label htmlFor="balance">Balance (€)</Label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                value={editForm.balance}
                onChange={(e) => setEditForm({...editForm, balance: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <Label htmlFor="reason">Motivo del ajuste</Label>
              <Input
                id="reason"
                value={editForm.reason}
                onChange={(e) => setEditForm({...editForm, reason: e.target.value})}
                placeholder="Ej: Corrección de error, premio adicional..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transactions Dialog */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Historial de Transacciones</DialogTitle>
            <DialogDescription>
              Transacciones recientes de {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">{transaction.transaction_type}</div>
                    <div className="text-sm text-muted-foreground">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <Badge variant={transaction.amount > 0 ? 'default' : 'destructive'}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </Badge>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No hay transacciones disponibles
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};