import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  name_ar: z.string().min(2, 'Required'),
  name_en: z.string().min(2, 'Required'),
  name_fr: z.string().min(2, 'Required'),
  slug: z.string().min(2, 'Required').regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, dashes'),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

type Values = z.infer<typeof schema>;

export default function AdminAddCategoryForm({ onCreated }: { onCreated?: () => void }) {
  const { toast } = useToast();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name_ar: '', name_en: '', name_fr: '', slug: '', image: '', is_active: true },
  });

  const onSubmit = async (values: Values) => {
    const payload = { ...values, image: values.image || undefined } as any;
    const { error } = await supabase.from('categories').insert([payload]);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Category added' });
      form.reset({ name_ar: '', name_en: '', name_fr: '', slug: '', image: '', is_active: true });
      onCreated?.();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField name="name_ar" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Arabic Name</FormLabel>
            <FormControl>
              <Input placeholder="مثلاً: أواني" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="name_en" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>English Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Utensils" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="name_fr" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>French Name</FormLabel>
            <FormControl>
              <Input placeholder="ex: Ustensiles" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="slug" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input placeholder="utensils" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="image" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL (optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="is_active" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Active</FormLabel>
            <FormControl>
              <div className="h-10 flex items-center">
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">Add Category</Button>
        </div>
      </form>
    </Form>
  );
}
