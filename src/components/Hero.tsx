import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const hero = data.hero[language] || { tagline: '', subtitle: '' };
  // data.json에서 설정한 배경 이미지 경로를 가져옵니다. 없으면 기본값 사용.
  const bgImage = data.hero.background_image || '/assets/hero-bg.jpg';
  const logoUrl = data.company.logo_url || '';
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image - data.json의 경로를 실시간으로 읽음 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* 라이트 모드에 맞게 덮개 농도 조절 (bg-white/30) */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Brand - 로고 이미지가 있으면 로고를, 없으면 텍스트를 보여줌 */}
        <div className="mb-8 animate-fade-in-up flex justify-center" style={{ animationDelay: '0.1s' }}>
          {logoUrl ? (
            <img src={logoUrl} alt="LYD Networks" className="h-20 md:h-28 w-auto object-contain" />
          ) : (
            <h1 className="font-brand text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="text-gradient-primary">LYD</span>
              <span className="text-foreground ml-4">Networks</span>
            </h1>
          )}
        </div>

        {/* Tagline */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className={`font-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 ${language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''}`}>
            {hero.tagline}
          </h2>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className={`text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
            {hero.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={scrollToAbout}
            className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg"
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
