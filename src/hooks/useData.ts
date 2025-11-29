import { useState, useEffect } from 'react';
import yaml from 'js-yaml';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface PaymentAddress {
  name: string;
  address: string;
  icon: string;
  color: string;
}

export interface AppData {
  profile: {
    name: string;
    title: string;
  };
  subtitles: string[];
  socialLinks: SocialLink[];
  paymentAddresses: PaymentAddress[];
}

export const useData = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.yaml');
        const yamlText = await response.text();
        const parsedData = yaml.load(yamlText) as AppData;
        setData(parsedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
