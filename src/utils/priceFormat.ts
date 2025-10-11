/**
 * Format price based on locale and language
 * @param price - The price amount
 * @param language - Current language (ar, en, fr)
 * @param options - Additional formatting options
 */
export const formatPrice = (
  price: number,
  language: string = 'ar',
  options?: {
    showCurrency?: boolean;
    useShortForm?: boolean;
  }
): string => {
  const { showCurrency = true, useShortForm = false } = options || {};
  
  // Format number based on locale
  let formattedNumber: string;
  
  if (language === 'ar') {
    // Arabic locale with Arabic-Indic numerals
    formattedNumber = price.toLocaleString('ar-MA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  } else if (language === 'fr') {
    // French locale
    formattedNumber = price.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  } else {
    // English locale
    formattedNumber = price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  
  // Add currency based on language
  if (!showCurrency) {
    return formattedNumber;
  }
  
  const currency = getCurrencyText(language, useShortForm);
  
  // For Arabic, currency comes after the number
  if (language === 'ar') {
    return `${formattedNumber} ${currency}`;
  }
  
  // For English and French, currency can come before or after
  // Using "DH" format for both (after number)
  return `${formattedNumber} ${currency}`;
};

/**
 * Get currency text based on language
 */
export const getCurrencyText = (
  language: string = 'ar',
  useShortForm: boolean = false
): string => {
  if (useShortForm) {
    return 'DH';
  }
  
  switch (language) {
    case 'ar':
      return 'درهم';
    case 'fr':
      return 'DH';
    case 'en':
      return 'DH';
    default:
      return 'DH';
  }
};

/**
 * Format price range
 */
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  language: string = 'ar'
): string => {
  const min = formatPrice(minPrice, language, { useShortForm: true });
  const max = formatPrice(maxPrice, language, { useShortForm: true });
  
  if (language === 'ar') {
    return `${min} - ${max}`;
  }
  
  return `${min} - ${max}`;
};
