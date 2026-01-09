import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const hero = data.hero[language];

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/60" />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Brand */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-brand text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
            <span className="text-gradient-primary">LYD</span>
            <span className="text-foreground ml-4">Networks</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className={`font-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/90 mb-4 ${language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''}`}>
            {hero.tagline}
          </h2>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
            {hero.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={scrollToAbout}
            className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all"
          >
            {language === 'en' ? 'Explore More' : language === 'jp' ? '詳しく見る' : '더 알아보기'}
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-primary/60" />
      </div>
    </section>
  );
};

export default Hero;
