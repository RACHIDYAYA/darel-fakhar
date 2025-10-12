import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CurrencyContextType {
  currency: string;
  rate: number;
  countryCode: string;
  isLoading: boolean;
  setCurrency: (currency: string) => void;
  convertPrice: (priceInMAD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: React.ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrencyState] = useState('MAD');
  const [rate, setRate] = useState(1);
  const [countryCode, setCountryCode] = useState('MA');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectCurrency();
  }, []);

  const detectCurrency = async () => {
    try {
      // Check if user has manually selected a currency
      const savedCurrency = localStorage.getItem('preferred-currency');
      if (savedCurrency) {
        const savedRate = parseFloat(localStorage.getItem('currency-rate') || '1');
        setCurrencyState(savedCurrency);
        setRate(savedRate);
        setIsLoading(false);
        return;
      }

      // Auto-detect based on location
      const { data, error } = await supabase.functions.invoke('currency-detect');
      
      if (error) {
        console.error('Currency detection error:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setCurrencyState(data.currency);
        setRate(data.rate);
        setCountryCode(data.countryCode);
        
        // Cache the detected currency
        localStorage.setItem('detected-currency', data.currency);
        localStorage.setItem('detected-rate', data.rate.toString());
      }
    } catch (error) {
      console.error('Error detecting currency:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
    
    // Fetch new rate if needed (for now, we'll need to call the function again)
    // In production, you might want to store all rates and just look them up
  };

  const convertPrice = (priceInMAD: number): number => {
    return priceInMAD * rate;
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        rate, 
        countryCode, 
        isLoading, 
        setCurrency, 
        convertPrice 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
