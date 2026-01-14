import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { ChevronDown, Play, Clock, Users, Tag, ExternalLink, Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = data?.hero?.slides || [];
  const logoUrl = data?.company?.logo_url || '';

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  }, [currentSlide]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!data || slides.length === 0) return null;

  const currentSlideData = slides[currentSlide];
  const slideType = currentSlideData?.type || 'branding';
  const title = currentSlideData?.title?.[language] || currentSlideData?.title?.en || '';
  const tagline = currentSlideData?.tagline?.[language] || currentSlideData?.tagline?.en || '';
  const subtitle = currentSlideData?.subtitle?.[language] || currentSlideData?.subtitle?.en || '';
  const genre = currentSlideData?.genre?.[language] || currentSlideData?.genre?.en || '';
  const cast = currentSlideData?.cast?.[language] || currentSlideData?.cast?.en || '';
  const synopsis = currentSlideData?.synopsis?.[language] || currentSlideData?.synopsis?.en || '';
  const runtime = currentSlideData?.runtime;
  const episodes = currentSlideData?.episodes;
  const durationPerEp = currentSlideData?.duration_per_ep;
  const videoUrl = currentSlideData?.video_url;
  const officialUrl = currentSlideData?.official_url;
  const premiere = currentSlideData?.premiere?.[language] || currentSlideData?.premiere?.en || '';
  const awards = currentSlideData?.awards?.[language] || currentSlideData?.awards?.en || '';
  const bgImage = currentSlideData?.background_image || '/assets/hero-bg.jpg';

  const getDurationText = () => {
    if (episodes && durationPerEp) {
      return language === 'en' 
        ? `${episodes} eps × ${durationPerEp} min` 
        : language === 'jp'
        ? `${episodes}話 × ${durationPerEp}分`
        : `${episodes}부작 × ${durationPerEp}분`;
    }
    if (runtime) {
      return language === 'en' ? `${runtime} min` : language === 'jp' ? `${runtime}分` : `${runtime}분`;
    }
    return null;
  };

  const renderBrandingSlide = () => (
    <div className="text-center">
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

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className={cn(
          "font-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 transition-opacity duration-500",
          isTransitioning ? "opacity-0" : "opacity-100",
          language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''
        )}>
          {tagline}
        </h2>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <p className={cn(
          "text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 transition-opacity duration-500",
          isTransitioning ? "opacity-0" : "opacity-100",
          language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
        )}>
          {subtitle}
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <button onClick={scrollToAbout} className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
          {language === 'en' ? 'Explore More' : language === 'jp' ? '詳しく見る' : '더 알아보기'}
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderNewsSlide = () => (
    <div className="flex flex-col justify-center h-full max-w-4xl text-left">
      <div className={cn(
        "transition-opacity duration-500",
        isTransitioning ? "opacity-0" : "opacity-100"
      )}>
        {(premiere || awards) && (
          <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {premiere && (
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className={cn(
                  "text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide",
                  language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                )}>
                  {premiere}
                </span>
              </div>
            )}
            {awards && (
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className={cn(
                  "text-xl md:text-2xl lg:text-3xl font-bold text-amber-400",
                  language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                )}>
                  {awards}
                </span>
              </div>
            )}
          </div>
        )}

        {title && (
          <h1 className={cn(
            "font-display text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up",
            language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''
          )} style={{ animationDelay: '0.15s' }}>
            {title}
          </h1>
        )}

        <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {genre && (
            <span className={cn(
              "flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full",
              language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
            )}>
              <Tag className="w-4 h-4 text-primary" />
              {genre}
            </span>
          )}
          {getDurationText() && (
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-primary" />
              {getDurationText()}
            </span>
          )}
        </div>

        {cast && (
          <div className={cn(
            "flex items-center gap-2 text-white/70 text-sm mb-6 animate-fade-in-up",
            language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
          )} style={{ animationDelay: '0.25s' }}>
            <Users className="w-4 h-4 text-primary" />
            <span>{cast}</span>
          </div>
        )}

        {synopsis && (
          <p className={cn(
            "text-white/80 text-sm md:text-lg leading-relaxed max-w-2xl animate-fade-in-up mb-8",
            language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
          )} style={{ animationDelay: '0.3s' }}>
            {synopsis}
          </p>
        )}

        {/* Buttons - Back to left side below synopsis */}
        {(videoUrl || officialUrl) && (
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            {videoUrl && (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                <Play className="w-5 h-5" />
                {language === 'en' ? 'Watch Trailer' : language === 'jp' ? '予告編を見る' : '예고편 보기'}
              </a>
            )}
            {officialUrl && (
              <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20">
                <ExternalLink className="w-5 h-5" />
                {language === 'en' ? 'Official Site' : language === 'jp' ? '公式サイト' : '공식 홈페이지'}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className={cn("absolute inset-0 bg-cover bg-center transition-opacity duration-1000", index === currentSlide && !isTransitioning ? "opacity-100" : "opacity-0")} style={{ backgroundImage: `url(${slide.background_image})` }} />
      ))}
      
      <div className={cn("absolute inset-0 transition-all duration-500", slideType === 'news' ? "bg-gradient-to-r from-black/80 via-black/40 to-transparent" : "bg-white/30 backdrop-blur-[2px]")} />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {slideType === 'news' ? renderNewsSlide() : renderBrandingSlide()}
      </div>

      {/* Slide Indicators - Moved to Right Center vertically */}
      {slides.length > 1 && (
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 rounded-full transition-all duration-300",
                index === currentSlide 
                  ? "bg-primary h-10" 
                  : slideType === 'news' ? "bg-white/30 hover:bg-white/60 h-2" : "bg-black/20 hover:bg-black/40 h-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={scrollToAbout}>
        <ChevronDown className={cn("w-8 h-8", slideType === 'news' ? "text-white" : "text-black")} />
      </div>
    </section>
  );
};

export default Hero;
