/**
 * Format price based on locale, language, and currency
 * @param price - The price amount (in MAD by default)
 * @param language - Current language (ar, en, fr)
 * @param currency - Currency code (MAD, USD, EUR, etc.)
 * @param options - Additional formatting options
 */
export const formatPrice = (
  price: number,
  language: string = 'ar',
  currency: string = 'MAD',
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
  
  // Add currency based on currency code
  if (!showCurrency) {
    return formattedNumber;
  }
  
  const currencyText = getCurrencyText(currency, language, useShortForm);
  
  // Special handling for currencies that go before the number
  if (currency === 'USD' || currency === 'GBP' || currency === 'EUR') {
    if (language === 'ar') {
      return `${formattedNumber} ${currencyText}`;
    }
    return `${currencyText}${formattedNumber}`;
  }
  
  // For other currencies (including MAD), currency comes after
  return `${formattedNumber} ${currencyText}`;
};

/**
 * Get currency text based on currency code and language
 */
export const getCurrencyText = (
  currencyCode: string = 'MAD',
  language: string = 'ar',
  useShortForm: boolean = false
): string => {
  // Currency symbols/names
  const currencyNames: Record<string, { short: string; ar: string; full: string }> = {
    'MAD': { short: 'DH', ar: 'درهم', full: 'MAD' },
    'USD': { short: '$', ar: 'دولار', full: 'USD' },
    'EUR': { short: '€', ar: 'يورو', full: 'EUR' },
    'GBP': { short: '£', ar: 'جنيه', full: 'GBP' },
    'SAR': { short: 'SR', ar: 'ريال', full: 'SAR' },
    'AED': { short: 'AED', ar: 'درهم إماراتي', full: 'AED' },
    'CAD': { short: 'C$', ar: 'دولار كندي', full: 'CAD' },
    'QAR': { short: 'QR', ar: 'ريال قطري', full: 'QAR' },
    'KWD': { short: 'KD', ar: 'دينار كويتي', full: 'KWD' },
    'EGP': { short: 'E£', ar: 'جنيه مصري', full: 'EGP' },
    'DZD': { short: 'DA', ar: 'دينار جزائري', full: 'DZD' },
    'TND': { short: 'DT', ar: 'دينار تونسي', full: 'TND' },
  };

  const currencyInfo = currencyNames[currencyCode] || currencyNames['MAD'];
  
  if (useShortForm) {
    return currencyInfo.short;
  }
  
  if (language === 'ar') {
    return currencyInfo.ar;
  }
  
  return currencyInfo.short;
};

/**
 * Format price range
 */
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  language: string = 'ar',
  currency: string = 'MAD'
): string => {
  const min = formatPrice(minPrice, language, currency, { useShortForm: true });
  const max = formatPrice(maxPrice, language, currency, { useShortForm: true });
  
  return `${min} - ${max}`;
};
