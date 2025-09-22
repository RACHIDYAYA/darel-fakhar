import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export type AdminPost = {
  id: number;
  slug: string;
  cover_image?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  title_ar?: string; title_en?: string; title_fr?: string;
  excerpt_ar?: string; excerpt_en?: string; excerpt_fr?: string;
  content_ar?: string; content_en?: string; content_fr?: string;
};

export const useAdminPosts = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts((data as unknown as AdminPost[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (payload: Omit<AdminPost, 'id' | 'created_at' | 'updated_at'>) => {
    const insert = { ...payload } as any;
    if (insert.is_published && !insert.published_at) {
      insert.published_at = new Date().toISOString();
    }
    const { data, error } = await supabase.from('posts').insert([insert]).select().single();
    if (!error) await fetchAll();
    return { data, error: error?.message ?? null };
  };

  const updatePost = async (id: number, patch: Partial<AdminPost>) => {
    const upd = { ...patch } as any;
    if (upd.is_published && !upd.published_at) {
      upd.published_at = new Date().toISOString();
    }
    const { data, error } = await supabase.from('posts').update(upd).eq('id', id).select().single();
    if (!error) await fetchAll();
    return { data, error: error?.message ?? null };
  };

  const deletePost = async (id: number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) await fetchAll();
    return { error: error?.message ?? null };
  };

  useEffect(() => { fetchAll(); }, []);

  return { posts, loading, error, fetchAll, createPost, updatePost, deletePost };
};
