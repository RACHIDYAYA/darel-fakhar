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
import { useProducts } from '@/hooks/useProducts';
import { Loader2, Package, Users, TrendingUp, Eye, LayoutDashboard, ClipboardList, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

const Admin = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { products } = useProducts();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [tabValue, setTabValue] = useState<'orders' | 'products'>('orders');

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

  const totalRevenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total_amount, 0);

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalProducts = products.length;

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
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#overview"><LayoutDashboard /> <span>Overview</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setTabValue('orders')}>
                    <ClipboardList /> <span>{t('admin.orders')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setTabValue('products')}>
                    <Package /> <span>{t('admin.products')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
            </div>

            <section id="overview" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingOrders}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="orders" className="scroll-mt-24">
              <Tabs value={tabValue} onValueChange={(v) => setTabValue(v as 'orders' | 'products')} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="orders">{t('admin.orders')}</TabsTrigger>
                  <TabsTrigger value="products">{t('admin.products')}</TabsTrigger>
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
                  <AddProductForm onSuccess={() => {
                    toast({
                      title: t('common.success'),
                      description: 'Product added successfully',
                    });
                  }} />

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
              </Tabs>
            </section>

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
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Admin;
