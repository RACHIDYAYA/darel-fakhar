// Structured Data (JSON-LD) helpers for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dar El Fakhar - التعاونية الحسنية",
  "alternateName": "Hassaniya Cooperative",
  "url": "https://www.alhassaniya.com",
  "logo": "https://www.alhassaniya.com/logo.png",
  "description": "Traditional Moroccan pottery cooperative specializing in handcrafted ceramics with authentic designs and gold accents",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA",
    "addressLocality": "Morocco"
  },
  "sameAs": [
    "https://www.facebook.com/darelfakhar",
    "https://www.instagram.com/darelfakhar"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dar El Fakhar",
  "url": "https://www.alhassaniya.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.alhassaniya.com/shop?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const createProductSchema = (product: {
  id: number;
  name: string;
  description: string;
  price: number;
  currency?: string;
  image: string;
  availability?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "sku": `PROD-${product.id}`,
  "offers": {
    "@type": "Offer",
    "url": `https://www.alhassaniya.com/product/${product.id}`,
    "priceCurrency": product.currency || "MAD",
    "price": product.price,
    "availability": product.availability || "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Dar El Fakhar"
    }
  }
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createBlogPostSchema = (post: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "image": post.image,
  "datePublished": post.datePublished,
  "dateModified": post.dateModified,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dar El Fakhar",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.alhassaniya.com/logo.png"
    }
  }
});