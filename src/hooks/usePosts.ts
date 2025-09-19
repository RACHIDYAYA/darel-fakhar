import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';

export type Post = {
  id: number;
  slug: string;
  cover_image?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  // localized fields
  title_ar?: string; title_en?: string; title_fr?: string;
  excerpt_ar?: string; excerpt_en?: string; excerpt_fr?: string;
  content_ar?: string; content_en?: string; content_fr?: string;
};

export const usePosts = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      setPosts((data as unknown as Post[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const getBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      if (error) throw error;
      return data as unknown as Post;
    } catch (err) {
      console.error('Error fetching post:', err);
      return null;
    }
  };

  const tField = (post: Post, base: 'title' | 'excerpt' | 'content') => {
    const lang = i18n.language?.split('-')[0] as 'ar' | 'en' | 'fr' | undefined;
    const key = `${base}_${lang || 'ar'}` as keyof Post;
    return (post[key] as string) || '';
  };

  useEffect(() => { fetchPosts(); }, []);

  return { posts, loading, error, fetchPosts, getBySlug, tField };
}
