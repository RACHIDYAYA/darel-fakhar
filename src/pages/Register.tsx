import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
  role: z.enum(['user', 'admin', 'editor', 'manager']).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof schema>;

const Register = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '', confirmPassword: '', role: 'user' } });

  const onSubmit = async (values: FormValues) => {
    const { error } = await signUp({ email: values.email, password: values.password, role: values.role });
    if (error) {
      toast({ title: 'Registration failed', description: error, variant: 'destructive' });
    } else {
      toast({ title: 'Registration successful', description: 'Please verify your email if required, then login.' });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="confirmPassword" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="role" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Form>
        <p className="text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
