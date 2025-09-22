import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAdminPosts } from '@/hooks/useAdminPosts';

const schema = z.object({
  slug: z.string().min(2, 'Required').regex(/^[a-z0-9-]+$/, 'lowercase letters, numbers, dashes'),
  cover_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.string().optional(),
  is_published: z.boolean().default(true),
  title_ar: z.string().min(3, 'Required'),
  title_en: z.string().min(3, 'Required'),
  title_fr: z.string().min(3, 'Required'),
  excerpt_ar: z.string().min(10, 'Required'),
  excerpt_en: z.string().min(10, 'Required'),
  excerpt_fr: z.string().min(10, 'Required'),
  content_ar: z.string().min(20, 'Required'),
  content_en: z.string().min(20, 'Required'),
  content_fr: z.string().min(20, 'Required'),
});

type Values = z.infer<typeof schema>;

export default function AdminAddPostForm() {
  const { toast } = useToast();
  const { createPost } = useAdminPosts();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: '', cover_image: '', tags: '', is_published: true,
      title_ar: '', title_en: '', title_fr: '',
      excerpt_ar: '', excerpt_en: '', excerpt_fr: '',
      content_ar: '', content_en: '', content_fr: ''
    }
  });

  const onSubmit = async (v: Values) => {
    const tagsArr = v.tags ? v.tags.split(',').map(s => s.trim()).filter(Boolean) : [];
    const { error } = await createPost({
      slug: v.slug,
      cover_image: v.cover_image || null,
      tags: tagsArr,
      is_published: v.is_published,
      title_ar: v.title_ar, title_en: v.title_en, title_fr: v.title_fr,
      excerpt_ar: v.excerpt_ar, excerpt_en: v.excerpt_en, excerpt_fr: v.excerpt_fr,
      content_ar: v.content_ar, content_en: v.content_en, content_fr: v.content_fr,
    });
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Post published' });
      form.reset({
        slug: '', cover_image: '', tags: '', is_published: true,
        title_ar: '', title_en: '', title_fr: '',
        excerpt_ar: '', excerpt_en: '', excerpt_fr: '',
        content_ar: '', content_en: '', content_fr: ''
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField name="slug" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl><Input placeholder="my-first-post" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="cover_image" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Image URL</FormLabel>
            <FormControl><Input placeholder="https://..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="tags" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Tags (comma separated)</FormLabel>
            <FormControl><Input placeholder="pottery, crafts" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="is_published" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Published</FormLabel>
            <FormControl><div className="h-10 flex items-center"><Switch checked={field.value} onCheckedChange={field.onChange} /></div></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField name="title_ar" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title (AR)</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="title_en" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title (EN)</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="title_fr" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title (FR)</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField name="excerpt_ar" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (AR)</FormLabel>
              <FormControl><Textarea rows={3} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="excerpt_en" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (EN)</FormLabel>
              <FormControl><Textarea rows={3} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="excerpt_fr" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (FR)</FormLabel>
              <FormControl><Textarea rows={3} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          <FormField name="content_ar" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Content (AR)</FormLabel>
              <FormControl><Textarea rows={8} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="content_en" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Content (EN)</FormLabel>
              <FormControl><Textarea rows={8} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="content_fr" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Content (FR)</FormLabel>
              <FormControl><Textarea rows={8} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">Publish Post</Button>
        </div>
      </form>
    </Form>
  );
}
