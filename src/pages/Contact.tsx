import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    alert("تم إرسال رسالتكم بنجاح! سنرد عليكم في أقرب وقت.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pottery-bronze mb-4">تواصل معنا</h1>
          <p className="text-lg text-pottery-bronze/80 max-w-2xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتكم حول منتجاتنا من الفخار المغربي الأصيل
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-pottery-bronze">معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">الهاتف</h3>
                    <p className="text-pottery-bronze/80" dir="ltr">+212 5XX-XXXXXX</p>
                    <p className="text-pottery-bronze/80" dir="ltr">+212 6XX-XXXXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">البريد الإلكتروني</h3>
                    <p className="text-pottery-bronze/80">info@hassaniyapottery.ma</p>
                    <p className="text-pottery-bronze/80">orders@hassaniyapottery.ma</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">العنوان</h3>
                    <p className="text-pottery-bronze/80" dir="rtl">
                      التعاونية الحسنية للفخار<br />
                      حي الصناعات التقليدية<br />
                      سلا - المغرب
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">ساعات العمل</h3>
                    <div className="text-pottery-bronze/80 space-y-1">
                      <p>الاثنين - الجمعة: 9:00 - 18:00</p>
                      <p>السبت: 9:00 - 13:00</p>
                      <p>الأحد: مغلق</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-pottery-bronze">عن التعاونية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pottery-bronze/80 leading-relaxed" dir="rtl">
                  التعاونية الحسنية للفخار هي تعاونية مغربية متخصصة في صناعة الفخار التقليدي 
                  بأيادي حرفية ماهرة. نحن نفخر بتقديم منتجات عالية الجودة تحافظ على التراث 
                  المغربي الأصيل وتلبي احتياجات العصر الحديث.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-pottery-bronze">إرسال رسالة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="06XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">الموضوع *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    placeholder="ما هو موضوع رسالتكم؟"
                  />
                </div>

                <div>
                  <Label htmlFor="message">الرسالة *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    placeholder="اكتبوا رسالتكم هنا..."
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-pottery-bronze">موقعنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-pottery-cream/30 rounded-lg p-8 text-center">
                <MapPin className="w-16 h-16 mx-auto text-pottery-gold mb-4" />
                <h3 className="text-xl font-bold text-pottery-bronze mb-2">
                  التعاونية الحسنية للفخار
                </h3>
                <p className="text-pottery-bronze/80" dir="rtl">
                  حي الصناعات التقليدية، سلا - المغرب
                </p>
                <p className="text-sm text-pottery-bronze/60 mt-2">
                  يمكنكم زيارتنا لمشاهدة المنتجات عن قرب والتعرف على عملية الصناعة
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contact;