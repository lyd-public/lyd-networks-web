import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const footer = data.footer[language];
  const nav = data.nav[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <span className="font-brand text-2xl font-bold tracking-tight">
              <span className="text-primary">LYD</span>
              <span className="text-foreground/80 font-medium ml-1">Networks</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            <button onClick={() => scrollToSection('about')} className="text-sm text-foreground/60 hover:text-primary transition-colors">
              {nav.about}
            </button>
            <button onClick={() => scrollToSection('channels')} className="text-sm text-foreground/60 hover:text-primary transition-colors">
              {nav.channels}
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-sm text-foreground/60 hover:text-primary transition-colors">
              {nav.portfolio}
            </button>
            <button onClick={() => scrollToSection('offices')} className="text-sm text-foreground/60 hover:text-primary transition-colors">
              {nav.offices}
            </button>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
