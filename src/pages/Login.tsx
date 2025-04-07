
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get('error');
  const message = queryParams.get('message');

  // Check for email confirmation success
  useEffect(() => {
    if (message && message.includes('confirmed')) {
      setConfirmSuccess(true);
      toast({
        title: "Email confirmed",
        description: "Your email has been confirmed. You can now sign in.",
        variant: "default",
      });
    }
  }, [message, toast]);

  // Check for any error messages in URL
  useEffect(() => {
    if (error) {
      setAuthError(error);
      toast({
        title: "Authentication error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        setAuthError(error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back to Snap Contest Hub.",
        });
        navigate("/");
      }
    } catch (error: any) {
      setAuthError(error.message);
      toast({
        title: "Login failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPassword(data: ResetPasswordFormValues) {
    setIsResettingPassword(true);
    setAuthError(null);
    
    try {
      // Get the current URL's origin (base URL)
      const origin = window.location.origin;
      
      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${origin}/reset-password`,
      });
      
      if (error) {
        setAuthError(error.message);
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setResetSuccess(true);
        toast({
          title: "Password reset email sent",
          description: "Check your email for a password reset link.",
        });
        setTimeout(() => {
          setIsResetDialogOpen(false);
          setResetSuccess(false);
          resetForm.reset();
        }, 3000);
      }
    } catch (error: any) {
      setAuthError(error.message);
      toast({
        title: "Password reset failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-md mx-auto py-12 px-4"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {confirmSuccess && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                Your email has been confirmed. You can now sign in.
              </AlertDescription>
            </Alert>
          )}
          
          {authError && (
            <Alert className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {authError}
              </AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm cursor-pointer">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                
                <Button 
                  variant="link" 
                  className="text-sm text-primary p-0 h-auto"
                  type="button"
                  onClick={() => setIsResetDialogOpen(true)}
                >
                  Forgot password?
                </Button>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Password Reset Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          
          {resetSuccess ? (
            <div className="py-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  Password reset email sent. Please check your inbox.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                <FormField
                  control={resetForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="sm:justify-end">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setIsResetDialogOpen(false)}
                    disabled={isResettingPassword}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? "Processing..." : "Send reset link"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Login;
