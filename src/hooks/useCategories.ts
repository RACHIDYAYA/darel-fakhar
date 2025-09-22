import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types/supabase';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCategories((data as unknown as Category[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single();
      if (error) throw error;
      await fetchCategories();
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error: message };
    }
  };

  const updateCategory = async (id: number, patch: Partial<Category>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(patch)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      await fetchCategories();
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error: message };
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      await fetchCategories();
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      return { error: message };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, fetchCategories, addCategory, updateCategory, deleteCategory };
};
