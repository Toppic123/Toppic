import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet, ArrowUpRight, ArrowDownLeft, Euro, Clock, CheckCircle, XCircle } from "lucide-react";

interface WalletData {
  balance: number;
  total_earned: number;
  total_withdrawn: number;
}

interface Transaction {
  id: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  status: string;
  payment_method: string;
  requested_at: string;
}

const UserWallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const MIN_WITHDRAWAL = 50;

  useEffect(() => {
    if (user) {
      loadWalletData();
      loadTransactions();
      loadWithdrawalRequests();
    }
  }, [user]);

  const loadWalletData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading wallet:', error);
        return;
      }

      setWalletData(data || { balance: 0, total_earned: 0, total_withdrawn: 0 });
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const loadWithdrawalRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('requested_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setWithdrawalRequests(data || []);
    } catch (error) {
      console.error('Error loading withdrawal requests:', error);
    }
  };

  const handleWithdrawal = async () => {
    if (!user || !walletData) return;

    const amount = parseFloat(withdrawalAmount);
    
    if (amount < MIN_WITHDRAWAL) {
      toast({
        title: "Cantidad insuficiente",
        description: `El mínimo para retirar es ${MIN_WITHDRAWAL}€`,
        variant: "destructive"
      });
      return;
    }

    if (amount > walletData.balance) {
      toast({
        title: "Saldo insuficiente",
        description: "No tienes suficiente saldo para realizar esta retirada",
        variant: "destructive"
      });
      return;
    }

    setIsWithdrawing(true);

    try {
      const { error } = await supabase
        .from('withdrawal_requests')
        .insert({
          user_id: user.id,
          amount,
          payment_method: paymentMethod,
          payment_details: { details: paymentDetails }
        });

      if (error) throw error;

      toast({
        title: "Solicitud enviada",
        description: "Tu solicitud de retiro ha sido enviada y será procesada pronto"
      });

      setWithdrawalAmount("");
      setPaymentDetails("");
      loadWithdrawalRequests();
    } catch (error) {
      console.error('Error creating withdrawal request:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar la solicitud de retiro",
        variant: "destructive"
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobado';
      case 'completed':
        return 'Completado';
      case 'rejected':
        return 'Rechazado';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <Card>
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Mi Cartera Digital
          </CardTitle>
          <CardDescription>
            Gestiona tus ganancias de premios y solicita retiros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                <Euro className="h-5 w-5" />
                {walletData?.balance?.toFixed(2) || '0.00'}
              </div>
              <p className="text-sm text-muted-foreground">Saldo disponible</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                <Euro className="h-5 w-5" />
                {walletData?.total_earned?.toFixed(2) || '0.00'}
              </div>
              <p className="text-sm text-muted-foreground">Total ganado</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                <Euro className="h-5 w-5" />
                {walletData?.total_withdrawn?.toFixed(2) || '0.00'}
              </div>
              <p className="text-sm text-muted-foreground">Total retirado</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                disabled={!walletData?.balance || walletData.balance < MIN_WITHDRAWAL}
                className="w-full"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Solicitar Retiro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar Retiro</DialogTitle>
                <DialogDescription>
                  Mínimo para retirar: {MIN_WITHDRAWAL}€. Tu saldo actual: {walletData?.balance?.toFixed(2)}€
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Cantidad a retirar (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min={MIN_WITHDRAWAL}
                    max={walletData?.balance || 0}
                    step="0.01"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    placeholder={`Mínimo ${MIN_WITHDRAWAL}€`}
                  />
                </div>
                <div>
                  <Label htmlFor="payment-method">Método de pago</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Transferencia bancaria</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payment-details">
                    {paymentMethod === 'bank_transfer' ? 'IBAN' : 'Email de PayPal'}
                  </Label>
                  <Input
                    id="payment-details"
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    placeholder={paymentMethod === 'bank_transfer' ? 'ES00 0000 0000 0000 0000 0000' : 'email@ejemplo.com'}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleWithdrawal}
                  disabled={!withdrawalAmount || !paymentDetails || isWithdrawing}
                >
                  {isWithdrawing ? 'Procesando...' : 'Solicitar Retiro'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No hay transacciones aún</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {transaction.transaction_type === 'prize_won' ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`font-bold ${transaction.transaction_type === 'prize_won' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.transaction_type === 'prize_won' ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Withdrawal Requests */}
      {withdrawalRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes de Retiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {withdrawalRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <p className="font-medium">€{request.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.requested_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={request.status === 'completed' ? 'default' : 'secondary'}>
                    {getStatusText(request.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserWallet;