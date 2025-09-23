import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import AddProductForm from '@/components/AddProductForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrders, Order } from '@/hooks/useOrders';
import { Loader2, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/hooks/useCategories';
import AdminAddCategoryForm from '@/components/AdminAddCategoryForm';
import { Switch } from '@/components/ui/switch';
import { useAdminPosts } from '@/hooks/useAdminPosts';
import AdminAddPostForm from '@/components/AdminAddPostForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProducts } from '@/hooks/useProducts';

const Admin = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { products, updateProduct, deleteProduct, refetch } = useProducts();
  const { categories, updateCategory, deleteCategory, fetchCategories } = useCategories();
  const { posts, updatePost, deletePost, fetchAll: fetchAllPosts } = useAdminPosts();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [tabValue, setTabValue] = useState<'orders' | 'products' | 'categories' | 'blog'>('orders');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const handleStatusUpdate = async (orderId: number, newStatus: Order['status']) => {
    const { error } = await updateOrderStatus(orderId, newStatus);
    if (error) {
      toast({
        title: t('common.error'),
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('common.success'),
        description: 'Order status updated successfully',
      });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} MAD`;
  };


  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t('admin.title')}</h1>
        <Tabs value={tabValue} onValueChange={(v) => setTabValue(v as 'orders' | 'products' | 'categories' | 'blog')} className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">{t('admin.orders')}</TabsTrigger>
            <TabsTrigger value="products">{t('admin.products')}</TabsTrigger>
            <TabsTrigger value="categories">{t('admin.categories')}</TabsTrigger>
            <TabsTrigger value="blog">{t('admin.blog', { defaultValue: 'Blog' })}</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.orders')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.customer_name} - {order.customer_phone}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(order.status)}>
                            {t(`admin.${order.status}`)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{formatPrice(order.total_amount)}</p>
                        <Select
                          value={order.status}
                          onValueChange={(value: Order['status']) =>
                            handleStatusUpdate(order.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">{t('admin.pending')}</SelectItem>
                            <SelectItem value="processing">{t('admin.processing')}</SelectItem>
                            <SelectItem value="shipped">{t('admin.shipped')}</SelectItem>
                            <SelectItem value="delivered">{t('admin.delivered')}</SelectItem>
                            <SelectItem value="cancelled">{t('admin.cancelled')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}

                  {orders.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No orders found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{t('admin.products')}</h2>
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة منتج جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>إضافة منتج جديد / Add New Product</DialogTitle>
                  </DialogHeader>
                  <AddProductForm onSuccess={() => { setAddOpen(false); refetch(); }} />
                </DialogContent>
              </Dialog>
            </div>
            <Card id="products">
              <CardHeader>
                <CardTitle>{t('admin.products')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-2">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name_ar}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold">{product.name_ar}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="font-semibold">{formatPrice(product.price)}</p>
                      {product.sale_price && (
                        <p className="text-sm text-muted-foreground line-through">{formatPrice(product.sale_price)}</p>
                      )}
                      <p className="text-sm">Stock: {product.stock}</p>
                      {product.is_featured && (
                        <Badge variant="secondary" className="mt-1">Featured</Badge>
                      )}
                      <div className="mt-3 flex gap-2">
                        <Dialog open={editOpen && editing?.id === product.id} onOpenChange={(o) => { if (!o) { setEditOpen(false); setEditing(null); } }}>
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditing(product);
                            setEditForm({
                              name_ar: product.name_ar || '',
                              name_en: product.name_en || '',
                              name_fr: product.name_fr || '',
                              description_ar: product.description_ar || '',
                              description_en: product.description_en || '',
                              description_fr: product.description_fr || '',
                              price: product.price || 0,
                              sale_price: product.sale_price ?? '',
                              category: product.category || '',
                              stock: product.stock || 0,
                              is_featured: !!product.is_featured,
                            });
                            setEditOpen(true);
                          }}>
                            <Edit className="h-4 w-4 mr-1" /> تعديل
                          </Button>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>تعديل المنتج</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm">الاسم (AR)</label>
                                <Input value={editForm.name_ar} onChange={(e) => setEditForm({ ...editForm, name_ar: e.target.value })} />
                              </div>
                              <div>
                                <label className="text-sm">Name (EN)</label>
                                <Input value={editForm.name_en} onChange={(e) => setEditForm({ ...editForm, name_en: e.target.value })} />
                              </div>
                              <div>
                                <label className="text-sm">Nom (FR)</label>
                                <Input value={editForm.name_fr} onChange={(e) => setEditForm({ ...editForm, name_fr: e.target.value })} />
                              </div>
                              <div>
                                <label className="text-sm">السعر</label>
                                <Input type="number" step="0.01" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })} />
                              </div>
                              <div>
                                <label className="text-sm">سعر البيع</label>
                                <Input type="number" step="0.01" value={editForm.sale_price ?? ''} onChange={(e) => setEditForm({ ...editForm, sale_price: e.target.value ? parseFloat(e.target.value) : null })} />
                              </div>
                              <div>
                                <label className="text-sm">الفئة</label>
                                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                                  {categories.map((c) => (
                                    <option key={c.slug} value={c.slug}>{c.name_ar} / {c.name_en}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-sm">المخزون</label>
                                <Input type="number" value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value || '0', 10) })} />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-sm">الوصف (AR)</label>
                                <Textarea rows={3} value={editForm.description_ar} onChange={(e) => setEditForm({ ...editForm, description_ar: e.target.value })} />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-sm">Description (EN)</label>
                                <Textarea rows={3} value={editForm.description_en} onChange={(e) => setEditForm({ ...editForm, description_en: e.target.value })} />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-sm">Description (FR)</label>
                                <Textarea rows={3} value={editForm.description_fr} onChange={(e) => setEditForm({ ...editForm, description_fr: e.target.value })} />
                              </div>
                              <div className="md:col-span-2 flex items-center gap-2">
                                <input type="checkbox" id="edit_is_featured" checked={!!editForm.is_featured} onChange={(e) => setEditForm({ ...editForm, is_featured: e.target.checked })} />
                                <label htmlFor="edit_is_featured" className="text-sm">منتج مميز</label>
                              </div>
                              <div className="md:col-span-2 flex justify-end gap-2">
                                <Button variant="secondary" onClick={() => { setEditOpen(false); setEditing(null); }}>إلغاء</Button>
                                <Button onClick={async () => {
                                  if (!editing) return;
                                  const payload = { ...editForm };
                                  const { error } = await updateProduct(editing.id, payload);
                                  if (error) {
                                    toast({ title: t('common.error'), description: error, variant: 'destructive' });
                                  } else {
                                    toast({ title: t('common.success'), description: 'Product updated' });
                                    setEditOpen(false);
                                    setEditing(null);
                                  }
                                }}>حفظ</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={async () => {
                          const { error } = await deleteProduct(product.id);
                          if (error) {
                            toast({ title: t('common.error'), description: error, variant: 'destructive' });
                          } else {
                            toast({ title: t('common.success'), description: 'Product deleted' });
                          }
                        }}>
                          <Trash2 className="h-4 w-4 mr-1" /> حذف
                        </Button>
                      </div>
                    </div>
                  ))}

                  {products.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No products found. Add your first product above!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Category</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminAddCategoryForm onCreated={fetchCategories} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('admin.categories')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name (AR)</th>
                        <th className="p-2">Slug</th>
                        <th className="p-2">Active</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat) => (
                        <tr key={cat.id} className="border-b last:border-0">
                          <td className="p-2">{cat.id}</td>
                          <td className="p-2">{cat.name_ar}</td>
                          <td className="p-2">{cat.slug}</td>
                          <td className="p-2">
                            <Switch
                              checked={cat.is_active}
                              onCheckedChange={async (checked) => {
                                const { error } = await updateCategory(cat.id, { is_active: checked });
                                if (error) {
                                  toast({ title: t('common.error'), description: error, variant: 'destructive' });
                                }
                              }}
                            />
                          </td>
                          <td className="p-2 space-x-2 rtl:space-x-reverse">
                            <Button variant="destructive" size="sm" onClick={async () => {
                              const { error } = await deleteCategory(cat.id);
                              if (error) {
                                toast({ title: t('common.error'), description: error, variant: 'destructive' });
                              }
                            }}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                      {categories.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-muted-foreground">No categories found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminAddPostForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Slug</th>
                        <th className="p-2">Published</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((p) => (
                        <tr key={p.id} className="border-b last:border-0">
                          <td className="p-2">{p.id}</td>
                          <td className="p-2">{p.slug}</td>
                          <td className="p-2">
                            <Switch
                              checked={p.is_published}
                              onCheckedChange={async (checked) => {
                                const { error } = await updatePost(p.id, { is_published: checked });
                                if (error) {
                                  toast({ title: t('common.error'), description: error, variant: 'destructive' });
                                } else if (checked) {
                                  await fetchAllPosts();
                                }
                              }}
                            />
                          </td>
                          <td className="p-2 space-x-2 rtl:space-x-reverse">
                            <Button variant="destructive" size="sm" onClick={async () => {
                              const { error } = await deletePost(p.id);
                              if (error) {
                                toast({ title: t('common.error'), description: error, variant: 'destructive' });
                              }
                            }}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                      {posts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-6 text-center text-muted-foreground">No posts found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Order #{selectedOrder.id} Details</CardTitle>
                <Button
                  variant="outline"
                  className="absolute top-4 right-4"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <p>Name: {selectedOrder.customer_name}</p>
                  <p>Phone: {selectedOrder.customer_phone}</p>
                  {selectedOrder.customer_email && (
                    <p>Email: {selectedOrder.customer_email}</p>
                  )}
                  <p>Address: {selectedOrder.customer_address}, {selectedOrder.customer_city}</p>
                  {selectedOrder.notes && (
                    <p>Notes: {selectedOrder.notes}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(selectedOrder.total_amount)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Order Status</h3>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value: Order['status']) => {
                      handleStatusUpdate(selectedOrder.id, value);
                      setSelectedOrder({...selectedOrder, status: value});
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{t('admin.pending')}</SelectItem>
                      <SelectItem value="processing">{t('admin.processing')}</SelectItem>
                      <SelectItem value="shipped">{t('admin.shipped')}</SelectItem>
                      <SelectItem value="delivered">{t('admin.delivered')}</SelectItem>
                      <SelectItem value="cancelled">{t('admin.cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
