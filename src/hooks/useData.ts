import { useState, useEffect } from 'react';

interface SiteData {
  company: {
    name: string;
    email: string;
    website: string;
    logo_url?: string;
  };
  hero: Record<string, { tagline?: string; subtitle?: string }> & { background_image?: string };
  about: Record<string, { title: string; mission: { title: string; text: string }; vision: { title: string; text: string } }>;
  coreValues: Record<string, { title: string; values: Array<{ name: string; description: string }> }>;
  timeline: {
    en: { title: string };
    jp: { title: string };
    kr: { title: string };
    milestones: Array<{ year: string; en: string; jp: string; kr: string }>;
  };
  channels: {
    en: { title: string };
    jp: { title: string };
    kr: { title: string };
    list: Array<{ name: string; logo: string }>;
  };
  portfolio: {
    en: { title: string; allFilter: string };
    jp: { title: string; allFilter: string };
    kr: { title: string; allFilter: string };
    categories: Record<string, string[]>;
    items: Array<{
      title: Record<string, string>;
      category: string;
      year: string;
      image: string;
    }>;
  };
  offices: {
    en: { title: string };
    jp: { title: string };
    kr: { title: string };
    locations: Array<{
      city: Record<string, string>;
      country: Record<string, string>;
      address: string;
    }>;
  };
  footer: Record<string, { copyright: string; contact: string }>;
  nav: Record<string, { about: string; channels: string; portfolio: string; offices: string; contact: string }>;
}

export const useData = () => {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
