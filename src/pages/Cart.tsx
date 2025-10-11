import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice } from "@/utils/priceFormat";

const Cart = () => {
  const { items: cartItems, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const removeCartItem = (productId: number) => {
    removeItem(productId);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 30; // Free shipping over 500 DH
  const total = subtotal + shipping;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
      toast({
        title: t('common.error'),
        description: t('checkout.requiredFields'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.sale_price || item.product.price,
        name: item.product.name_ar
      }));

      await createOrder({
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email,
        customer_address: customerInfo.address,
        customer_city: customerInfo.city,
        items: orderItems,
        total_amount: total,
        notes: customerInfo.notes
      });

      clearCart();
      
      toast({
        title: t('cart.orderSuccess'),
        description: t('cart.orderSuccessDescription'),
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: t('cart.orderError'),
        description: t('cart.orderErrorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pottery-bronze mb-2">{t('cart.title')}</h1>
          <p className="text-pottery-bronze/80">{t('cart.reviewOrder')}</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto text-pottery-cream mb-6" />
            <h2 className="text-2xl font-bold text-pottery-bronze mb-4">
              {t('cart.empty')}
            </h2>
            <p className="text-pottery-bronze/60 mb-6">
              {t('cart.emptyDescription')}
            </p>
            <Button 
              className="bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
              onClick={() => window.location.href = "/shop"}
            >
              {t('cart.browseProducts')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-pottery-bronze">{t('cart.products')} ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-4 border border-pottery-cream rounded-lg">
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name_en}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-pottery-bronze mb-1">
                            {item.product.name_en}
                          </h3>
                          <p className="text-sm text-pottery-bronze/60 mb-2" dir="rtl">
                            {item.product.name_ar}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-pottery-gold">
                                {formatPrice((item.product.sale_price || item.product.price) * item.quantity, language)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCartItem(item.product.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Customer Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-pottery-bronze">{t('cart.orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-pottery-bronze/80">{t('cart.subtotal')}:</span>
                      <span className="font-medium">{formatPrice(subtotal, language)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-pottery-bronze/80">{t('cart.shipping')}:</span>
                      <span className="font-medium">
                        {shipping === 0 ? t('cart.free') : formatPrice(shipping, language)}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-sm text-green-600">
                        🎉 {t('cart.freeShippingOver')} {formatPrice(500, language)}
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('cart.total')}:</span>
                      <span className="text-pottery-gold">{formatPrice(total, language)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-pottery-bronze">{t('checkout.deliveryInfo')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <Label htmlFor="name">{t('checkout.name')} *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        required
                        placeholder={t('checkout.namePlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">{t('checkout.phone')} *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        required
                        placeholder={t('checkout.phonePlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">{t('checkout.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder={t('checkout.emailPlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">{t('checkout.city')} *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        required
                        placeholder={t('checkout.cityPlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">{t('checkout.fullAddress')} *</Label>
                      <Textarea
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        required
                        placeholder={t('checkout.addressPlaceholder')}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">{t('checkout.notes')}</Label>
                      <Textarea
                        id="notes"
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                        placeholder={t('checkout.notesPlaceholder')}
                        rows={2}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('cart.submittingOrder') : t('checkout.submitOrder')}
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;