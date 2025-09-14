import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  customer_city: string;
  notes?: string;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  name: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      const newOrder = {
        ...orderData,
        status: 'pending'
      };
      
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder] as any)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh orders list
      fetchOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error creating order:', err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'An error occurred' 
      };
    }
  };

  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating order status:', err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'An error occurred' 
      };
    }
  };

  const getOrderById = async (id: number): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Order;
    } catch (err) {
      console.error('Error fetching order:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    getOrderById,
    refetch: fetchOrders,
  };
};