import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
  titleEn?: string;
  descriptionEn?: string;
  titleAr?: string;
  descriptionAr?: string;
  titleFr?: string;
  descriptionFr?: string;
}

const SEOHead = ({
  title = "دار الفخار - Dar El Fakhar | Traditional Moroccan Pottery",
  description = "Discover authentic Moroccan pottery and ceramics with gold accents. Traditional handcrafted pieces including cups, tagines, and decorative items.",
  keywords = "Moroccan pottery, traditional ceramics, handcrafted pottery, tagine, cups, Dar El Fakhar, فخار مغربي, سيراميك",
  image = "https://www.alhassaniya.com/logo.png",
  url = "https://www.alhassaniya.com",
  type = "website",
  structuredData,
  titleEn,
  descriptionEn,
  titleAr,
  descriptionAr,
  titleFr,
  descriptionFr,
}: SEOHeadProps) => {
  const { language } = useLanguage();
  
  // Language-specific content
  const localeMap: Record<string, string> = {
    ar: 'ar_MA',
    en: 'en_US',
    fr: 'fr_FR'
  };
  
  const currentLocale = localeMap[language] || 'en_US';
  
  // Generate alternate URLs for all languages
  const baseUrl = url.replace(/\/(ar|en|fr)\//, '/').replace(/\/(ar|en|fr)$/, '');
  const alternateUrls = {
    ar: baseUrl.includes('alhassaniya.com') ? baseUrl : `${baseUrl}`,
    en: baseUrl.includes('alhassaniya.com') ? baseUrl : `${baseUrl}`,
    fr: baseUrl.includes('alhassaniya.com') ? baseUrl : `${baseUrl}`,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Dar El Fakhar - Al Hassaniya Cooperative" />
      <html lang={language} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Hreflang Tags for Multi-language SEO */}
      <link rel="alternate" hrefLang="ar" href={alternateUrls.ar} />
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="fr" href={alternateUrls.fr} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.en} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Moroccan Pottery - Traditional Handcrafted Ceramics" />
      <meta property="og:site_name" content="Dar El Fakhar - Al Hassaniya Cooperative" />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content="ar_MA" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Rachid_dev" />
      <meta name="twitter:creator" content="@Rachid_dev" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Moroccan Pottery - Traditional Handcrafted Ceramics" />
      
      {/* Robots & Crawling */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Geographic Targeting */}
      <meta name="geo.region" content="MA" />
      <meta name="geo.placename" content="Safi" />
      <meta name="geo.position" content="32.2994;-9.2372" />
      <meta name="ICBM" content="32.2994, -9.2372" />
      
      {/* Additional SEO */}
      <meta name="language" content={language === 'ar' ? 'Arabic' : language === 'fr' ? 'French' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;