import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { data } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = data?.nav[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9FA] border-b border-border/20 shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="font-brand text-xl lg:text-2xl font-bold tracking-tight text-foreground">
  Live <span className="text-primary">Your Dream</span>
</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {nav && (
              <>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  {nav.home}
                </button>
                <button onClick={() => scrollToSection('about')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  {nav.about}
                </button>
                <button onClick={() => scrollToSection('channels')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  {nav.channels}
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  {nav.portfolio}
                </button>
                <button onClick={() => scrollToSection('offices')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  {nav.offices}
                </button>
              </>
            )}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                  language === 'en' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('jp')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                  language === 'jp' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                JP
              </button>
              <button
                onClick={() => setLanguage('kr')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                  language === 'kr' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                KR
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && nav && (
          <nav className="lg:hidden py-4 border-t border-border/30 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2">
                {nav.about}
              </button>
              <button onClick={() => scrollToSection('channels')} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2">
                {nav.channels}
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2">
                {nav.portfolio}
              </button>
              <button onClick={() => scrollToSection('offices')} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2">
                {nav.offices}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
