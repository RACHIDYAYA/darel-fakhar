import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialCartItems = [
  {
    id: 1,
    image: "/lovable-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png",
    titleAr: "مجموعة أطقم شاي سيراميك ملونة",
    titleEn: "Colorful Ceramic Tea Sets Collection",
    price: 280,
    quantity: 1,
  },
  {
    id: 2,
    image: "/lovable-uploads/07d084e1-0d0a-40b6-a3df-8c0f3f506742.png",
    titleAr: "طاجين مغربي أصيل بنقوش تقليدية",
    titleEn: "Authentic Moroccan Tagine with Traditional Patterns",
    price: 350,
    quantity: 2,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 30; // Free shipping over 500 DH
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    alert("تم إرسال طلبكم بنجاح! سنتواصل معكم قريباً.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pottery-bronze mb-2">سلة التسوق</h1>
          <p className="text-pottery-bronze/80">مراجعة طلبكم وإتمام عملية الشراء</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto text-pottery-cream mb-6" />
            <h2 className="text-2xl font-bold text-pottery-bronze mb-4">
              السلة فارغة
            </h2>
            <p className="text-pottery-bronze/60 mb-6">
              لم تقم بإضافة أي منتجات إلى السلة بعد
            </p>
            <Button 
              className="bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
              onClick={() => window.location.href = "/shop"}
            >
              تصفح المنتجات
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-pottery-bronze">المنتجات ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-pottery-cream rounded-lg">
                        <img
                          src={item.image}
                          alt={item.titleEn}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-pottery-bronze mb-1">
                            {item.titleEn}
                          </h3>
                          <p className="text-sm text-pottery-bronze/60 mb-2" dir="rtl">
                            {item.titleAr}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-pottery-gold">
                                {item.price * item.quantity} درهم
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
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
                  <CardTitle className="text-pottery-bronze">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-pottery-bronze/80">المجموع الفرعي:</span>
                      <span className="font-medium">{subtotal} درهم</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-pottery-bronze/80">الشحن:</span>
                      <span className="font-medium">
                        {shipping === 0 ? "مجاني" : `${shipping} درهم`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-sm text-green-600">
                        🎉 شحن مجاني للطلبات أكثر من 500 درهم
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع الكلي:</span>
                      <span className="text-pottery-gold">{total} درهم</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-pottery-bronze">معلومات التسليم</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        required
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        required
                        placeholder="06XXXXXXXX"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="example@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">المدينة *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        required
                        placeholder="مثال: الرباط، الدار البيضاء..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">العنوان الكامل *</Label>
                      <Textarea
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        required
                        placeholder="الحي، الزنقة، رقم المنزل..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">ملاحظات إضافية</Label>
                      <Textarea
                        id="notes"
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                        placeholder="أي تفاصيل إضافية للطلب..."
                        rows={2}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
                      size="lg"
                    >
                      تأكيد الطلب
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