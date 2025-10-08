# Facebook Integration Documentation

## تكامل Facebook مع موقع التعاونية الحسنية

تم تكامل الموقع بالكامل مع Facebook لتلبية متطلبات التطبيق وتحسين التتبع والتسويق.

## ✅ التكاملات المنفذة

### 1. Facebook Pixel
- **معرف Pixel**: `1159240716111709`
- **الموقع**: `index.html`
- **الوظائف**:
  - تتبع زيارات الصفحات (PageView)
  - تتبع التحويلات
  - إنشاء جماهير مخصصة
  - تحسين الإعلانات

### 2. Facebook Domain Verification
- **رمز التحقق**: `9n5oh1hx6yw6wya62vjxj68wkaexmh`
- **الموقع**: `index.html` - meta tag
- يؤكد ملكيتك للنطاق في Facebook Business Manager

### 3. Open Graph Meta Tags
تم تضمينها في جميع الصفحات عبر مكون `SEOHead`:
- `og:title` - عنوان الصفحة
- `og:description` - وصف الصفحة
- `og:image` - صورة المشاركة (Logo)
- `og:url` - رابط الصفحة
- `og:type` - نوع المحتوى
- `og:locale` - اللغات المدعومة (ar_MA, en_US, fr_FR)

### 4. الصفحات المطلوبة لتطبيق Facebook

#### Privacy Policy (سياسة الخصوصية)
- **الرابط**: `https://www.alhassaniya.com/privacy-policy`
- **الصفحة**: `src/pages/PrivacyPolicy.tsx`
- **المحتوى**: سياسة خصوصية شاملة متعددة اللغات (عربي، فرنسي، إنجليزي)

#### Terms of Service (شروط الخدمة)
- **الرابط**: `https://www.alhassaniya.com/terms`
- **الصفحة**: `src/pages/Terms.tsx`
- **المحتوى**: شروط استخدام الموقع بثلاث لغات

#### Data Deletion Instructions (تعليمات حذف البيانات)
- **الرابط**: `https://www.alhassaniya.com/data-deletion`
- **الصفحة**: `src/pages/DataDeletion.tsx`
- **المحتوى**: 
  - خطوات حذف البيانات الشخصية
  - معلومات حذف بيانات Facebook
  - معلومات الاتصال بمسؤول حماية البيانات

## 📊 معلومات التطبيق على Facebook

### البيانات الأساسية
- **معرف التطبيق**: `1159240716111709`
- **اسم التطبيق**: Al Hassaniya COOP
- **الفئة**: أنشطة تجارية وصفحات
- **البريد الإلكتروني**: alhassaniya790@gmail.com

### روابط السياسات المسجلة
- Privacy Policy: https://www.alhassaniya.com/privacy-policy
- Terms of Service: https://www.alhassaniya.com/terms
- Data Deletion: https://www.alhassaniya.com/data-deletion

### مسؤول حماية البيانات (DPO)
- **الاسم**: Yaya Rachid
- **البريد الإلكتروني**: rachidyaya790@gmail.com
- **العنوان**: DR OD ALAYACHI SAADLA SAFI، المغرب

## 🔍 التحقق من التكامل

### 1. اختبار Facebook Pixel
```bash
# افتح متصفحك وانتقل إلى:
https://www.alhassaniya.com

# ثبت Facebook Pixel Helper Extension
# تحقق من ظهور Pixel ID: 1159240716111709
```

### 2. اختبار Open Graph
```bash
# استخدم Facebook Sharing Debugger:
https://developers.facebook.com/tools/debug/

# أدخل روابط الموقع واختبر:
- https://www.alhassaniya.com
- https://www.alhassaniya.com/shop
- https://www.alhassaniya.com/about
```

### 3. اختبار Domain Verification
```bash
# في Facebook Business Manager:
# Settings > Brand Safety > Domains
# تحقق من ظهور alhassaniya.com كنطاق محقق
```

## 🚀 الخطوات التالية (اختياري)

### 1. Facebook Login Integration
لإضافة تسجيل الدخول عبر Facebook:

```typescript
// إضافة Facebook SDK
<script async defer crossorigin="anonymous" 
  src="https://connect.facebook.net/en_US/sdk.js">
</script>

// تهيئة SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1159240716111709',
    cookie     : true,
    xfbml      : true,
    version    : 'v18.0'
  });
};
```

### 2. Facebook Share Button
لإضافة زر المشاركة على Facebook:

```tsx
import { Facebook } from 'lucide-react';

const ShareButton = ({ url, title }) => {
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  return (
    <button onClick={shareOnFacebook}>
      <Facebook /> Share
    </button>
  );
};
```

### 3. Facebook Catalog للمنتجات
لعرض المنتجات في Facebook Shop:
- إنشاء Product Feed
- ربطه مع Facebook Catalog
- مزامنة المنتجات تلقائياً

## 📝 ملاحظات مهمة

1. **HTTPS مطلوب**: تأكد من نشر الموقع على HTTPS
2. **اختبار الروابط**: اختبر جميع الروابط قبل إرسال التطبيق للمراجعة
3. **الالتزام بسياسات Facebook**: تأكد من التزام الموقع بسياسات Facebook Platform
4. **تحديث المحتوى**: حافظ على تحديث سياسات الخصوصية والشروط

## 🔐 الأمان والخصوصية

- ✅ Facebook Domain Verification مفعل
- ✅ سياسة خصوصية شاملة متوفرة
- ✅ آلية حذف البيانات موثقة
- ✅ معلومات مسؤول حماية البيانات متوفرة
- ✅ GDPR متوافق

## 📱 Threads Integration

تم تسجيل معلومات Threads:
- **معرف تطبيق Threads**: `978383311146913`
- **اسم العرض**: Al Hassaniya COOP

## 🛠️ الدعم الفني

للمشاكل المتعلقة بتكامل Facebook:
1. تحقق من Facebook Pixel Helper
2. استخدم Facebook Debug Tools
3. راجع Facebook App Dashboard
4. اتصل بدعم Facebook Business

## 📚 روابط مفيدة

- [Facebook for Developers](https://developers.facebook.com/)
- [Facebook Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Open Graph Documentation](https://developers.facebook.com/docs/sharing/webmasters)
- [Facebook Business Help Center](https://www.facebook.com/business/help)
