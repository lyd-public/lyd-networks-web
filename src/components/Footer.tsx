import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const footer = data.footer[language];
  const nav = data.nav[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Header와 동일하게 스크롤 위치 조정
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // 1. 배경색 및 높이감 통일 (Header의 h-16~20 느낌 반영)
    <footer className="py-12 lg:py-16 bg-[#F8F9FA] border-t border-border/20">
      {/* 2. Container: Header와 동일한 px-4 lg:px-8 적용 */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* 3. Logo: Header의 로고 텍스트 스타일 완벽 일치 */}
          <div className="flex items-center cursor-pointer select-none" onClick={scrollToTop}>
            <span className="font-brand text-xl lg:text-2xl font-bold tracking-tight text-foreground">
              Live <span className="text-primary">Your Dream</span>
            </span>
          </div>

          {/* 4. Navigation: Header의 gap-8, font-medium, text-foreground/80 일치 */}
          <nav className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
            <button 
              onClick={scrollToTop} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              {nav.about}
            </button>
            <button 
              onClick={() => scrollToSection('channels')} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              {nav.channels}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              {nav.portfolio}
            </button>
            <button 
              onClick={() => scrollToSection('offices')} 
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              {nav.offices}
            </button>
          </nav>

          {/* 5. Copyright: Header의 우측 언어 버튼들과의 균형을 위해 살짝 차분하게 설정 */}
          <p className="text-sm text-muted-foreground font-medium">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
