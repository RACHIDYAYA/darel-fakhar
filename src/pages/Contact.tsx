import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { createBreadcrumbSchema } from "@/utils/structuredData";

const Contact = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const breadcrumbData = createBreadcrumbSchema([
    { name: "Home", url: "https://www.alhassaniya.com/" },
    { name: "Contact", url: "https://www.alhassaniya.com/contact" }
  ]);
  
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
    alert(t('common.success'));
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
      <SEOHead 
        title="Contact Us - Get in Touch | Dar El Fakhar Moroccan Pottery"
        description="Contact التعاونية الحسنية for wholesale pottery orders, custom designs, or inquiries. Located in Safi, Morocco. Phone: +212 656-861536"
        keywords="contact moroccan pottery, wholesale pottery safi, pottery orders morocco, dar el fakhar contact, buy moroccan ceramics, pottery supplier morocco, custom pottery orders"
        url="https://www.alhassaniya.com/contact"
        structuredData={breadcrumbData}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pottery-bronze mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-pottery-bronze/80 max-w-2xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('aboutPage.lead1')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-pottery-bronze">{t('contact.contactUs')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">{t('contact.phone')}</h3>
                    <p className="text-pottery-bronze/80" dir="ltr">+212 656-861536</p>
                    <p className="text-pottery-bronze/80" dir="ltr">+212 616-242996</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">{t('contact.email')}</h3>
                    <p className="text-pottery-bronze/80">info@hassaniyapottery.ma</p>
                    <p className="text-pottery-bronze/80">orders@hassaniyapottery.ma</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">{t('contact.address')}</h3>
                    <p className="text-pottery-bronze/80" dir={isRTL ? 'rtl' : 'ltr'}>
                      {t('hero.cooperativeName')}<br />
                      Safi - Morocco<br />
                      9V43+7Q Safi, Morocco
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pottery-gold/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-pottery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pottery-bronze mb-1">{t('contact.hours')}</h3>
                    <div className="text-pottery-bronze/80 space-y-1" dir={isRTL ? 'rtl' : 'ltr'}>
                      <p>Monday - Friday: 9:00 - 18:00</p>
                      <p>Saturday: 9:00 - 13:00</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-pottery-bronze">{t('contact.aboutUs')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pottery-bronze/80 leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('aboutPage.lead2')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-pottery-bronze">{t('contact.contactForm')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('contact.name')} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder={t('contact.name')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('contact.phone')}</Label>
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
                  <Label htmlFor="email">{t('contact.email')} *</Label>
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
                  <Label htmlFor="subject">{t('contact.subject')} *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    placeholder={t('contact.subject')}
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.message')} *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    placeholder={t('contact.message')}
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-pottery-bronze">{t('contact.location')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="relative rounded-lg p-8 text-center text-white min-h-[300px] flex flex-col justify-center"
                style={{
                  backgroundImage: "url('/src/assets/cooperative-building.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                <div className="relative z-10">
                  <MapPin className="w-16 h-16 mx-auto text-pottery-gold mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('hero.cooperativeName')}
                  </h3>
                  <p className="text-white/90" dir={isRTL ? 'rtl' : 'ltr'}>
                    Safi - Morocco
                  </p>
                  <p className="text-sm text-white/80 mt-2" dir={isRTL ? 'rtl' : 'ltr'}>
                    {t('aboutPage.features.experience.desc')}
                  </p>
                  <Button 
                    asChild
                    className="mt-4 bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
                  >
                    <a 
                      href="https://maps.app.goo.gl/NrdWAoxFxP3aWLqJ8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('contact.location')}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contact;