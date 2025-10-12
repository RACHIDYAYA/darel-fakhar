import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Currency mapping based on country codes
const countryCurrencyMap: Record<string, string> = {
  'MA': 'MAD', // Morocco
  'US': 'USD', // United States
  'GB': 'GBP', // United Kingdom
  'FR': 'EUR', // France
  'DE': 'EUR', // Germany
  'ES': 'EUR', // Spain
  'IT': 'EUR', // Italy
  'CA': 'CAD', // Canada
  'SA': 'SAR', // Saudi Arabia
  'AE': 'AED', // UAE
  'QA': 'QAR', // Qatar
  'KW': 'KWD', // Kuwait
  'EG': 'EGP', // Egypt
  'DZ': 'DZD', // Algeria
  'TN': 'TND', // Tunisia
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Currency detect request received');

    // Get country from CF-IPCountry header (Cloudflare) or fallback to geo detection
    const countryCode = req.headers.get('CF-IPCountry') || 
                       req.headers.get('X-Country-Code') || 
                       'MA'; // Default to Morocco

    console.log('Detected country code:', countryCode);

    // Get currency for the country
    const currency = countryCurrencyMap[countryCode] || 'MAD';
    
    console.log('Selected currency:', currency);

    // Fetch exchange rates from exchangerate-api.com (free tier)
    const ratesResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/MAD`);
    
    if (!ratesResponse.ok) {
      console.error('Failed to fetch exchange rates:', ratesResponse.status);
      // Return MAD as fallback if API fails
      return new Response(
        JSON.stringify({ 
          currency: 'MAD', 
          rate: 1,
          countryCode 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    const ratesData = await ratesResponse.json();
    const rate = ratesData.rates[currency] || 1;

    console.log('Exchange rate:', rate);

    return new Response(
      JSON.stringify({ 
        currency, 
        rate,
        countryCode,
        allRates: ratesData.rates 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in currency-detect function:', error);
    
    // Return MAD as safe fallback
    return new Response(
      JSON.stringify({ 
        currency: 'MAD', 
        rate: 1,
        error: error.message 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
