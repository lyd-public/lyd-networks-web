import { useState, useEffect } from 'react';

interface MultiLangText {
  en?: string;
  jp?: string;
  kr?: string;
  [key: string]: string | undefined;
}

interface HeroSlide {
  background_image: string;
  tagline?: MultiLangText;
  subtitle?: MultiLangText;
  title?: MultiLangText;
  genre?: MultiLangText;
  cast?: MultiLangText;
  synopsis?: MultiLangText;
  runtime?: number;
  episodes?: number;
  duration_per_ep?: number;
  video_url?: string;
}

interface FeaturedNewsItem {
  id: string;
  title: MultiLangText;
  genre: MultiLangText;
  cast: MultiLangText;
  duration: string; // "8부작 x 30분" or "120분" etc.
  synopsis: MultiLangText;
  poster_image: string;
  video_url?: string;
  official_url?: string;
  release_date?: string;
}

interface SiteData {
  company: {
    name: string;
    email: string;
    website: string;
    logo_url?: string;
  };
  hero: {
    slides: HeroSlide[];
  };
  featured_news: {
    en: { title: string; trailer_button: string; official_button: string };
    jp: { title: string; trailer_button: string; official_button: string };
    kr: { title: string; trailer_button: string; official_button: string };
    items: FeaturedNewsItem[];
  };
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
      runtime?: number;
      episodes?: number;
      duration_per_ep?: number;
      genre?: Record<string, string> | string;
      cast?: Record<string, string> | string;
      synopsis?: Record<string, string>;
      video_url?: string;
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

export type { HeroSlide, FeaturedNewsItem, MultiLangText };

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
