export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name_ar: string;
          name_en: string;
          name_fr: string;
          description_ar: string;
          description_en: string;
          description_fr: string;
          price: number;
          sale_price?: number;
          category: string;
          images: string[];
          stock: number;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name_ar: string;
          name_en: string;
          name_fr: string;
          description_ar: string;
          description_en: string;
          description_fr: string;
          price: number;
          sale_price?: number;
          category: string;
          images: string[];
          stock?: number;
          is_active?: boolean;
          is_featured?: boolean;
        };
        Update: {
          name_ar?: string;
          name_en?: string;
          name_fr?: string;
          description_ar?: string;
          description_en?: string;
          description_fr?: string;
          price?: number;
          sale_price?: number;
          category?: string;
          images?: string[];
          stock?: number;
          is_active?: boolean;
          is_featured?: boolean;
        };
      };
      orders: {
        Row: {
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
        };
        Insert: {
          customer_name: string;
          customer_phone: string;
          customer_email?: string;
          customer_address: string;
          customer_city: string;
          notes?: string;
          items: OrderItem[];
          total_amount: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        };
        Update: {
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string;
          customer_address?: string;
          customer_city?: string;
          notes?: string;
          items?: OrderItem[];
          total_amount?: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        };
      };
      categories: {
        Row: {
          id: number;
          name_ar: string;
          name_en: string;
          name_fr: string;
          slug: string;
          image?: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name_ar: string;
          name_en: string;
          name_fr: string;
          slug: string;
          image?: string;
          is_active?: boolean;
        };
        Update: {
          name_ar?: string;
          name_en?: string;
          name_fr?: string;
          slug?: string;
          image?: string;
          is_active?: boolean;
        };
      };
    };
  };
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  name: string;
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];