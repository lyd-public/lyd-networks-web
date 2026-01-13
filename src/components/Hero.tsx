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

  // Auto-advance slides
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

  // Format duration text
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

  // Render branding type slide (centered layout)
  const renderBrandingSlide = () => (
    <div className="text-center">
      {/* Brand */}
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

      {/* Tagline - with fade effect */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 
          className={cn(
            "font-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 transition-opacity duration-500",
            isTransitioning ? "opacity-0" : "opacity-100",
            language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''
          )}
        >
          {tagline}
        </h2>
      </div>

      {/* Subtitle - with fade effect */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <p 
          className={cn(
            "text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 transition-opacity duration-500",
            isTransitioning ? "opacity-0" : "opacity-100",
            language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
          )}
        >
          {subtitle}
        </p>
      </div>

      {/* CTA Button */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <button 
          onClick={scrollToAbout}
          className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg"
        >
          {language === 'en' ? 'Explore More' : language === 'jp' ? '詳しく見る' : '더 알아보기'}
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  // Render news type slide (left-aligned, cinematic layout)
  const renderNewsSlide = () => (
    <div className="flex flex-col justify-end h-full min-h-[60vh] pb-8 lg:pb-16">
      <div className={cn(
        "max-w-2xl text-left transition-opacity duration-500",
        isTransitioning ? "opacity-0" : "opacity-100"
      )}>
        {/* Premiere / Awards - Largest emphasis */}
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

        {/* Title */}
        {title && (
          <h1 className={cn(
            "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up",
            language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''
          )} style={{ animationDelay: '0.15s' }}>
            {title}
          </h1>
        )}

        {/* Meta info row */}
        <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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

        {/* Cast */}
        {cast && (
          <div className={cn(
            "flex items-center gap-2 text-white/70 text-sm mb-4 animate-fade-in-up",
            language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
          )} style={{ animationDelay: '0.25s' }}>
            <Users className="w-4 h-4 text-primary" />
            <span>{cast}</span>
          </div>
        )}

        {/* Synopsis */}
        {synopsis && (
          <p className={cn(
            "text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-xl animate-fade-in-up line-clamp-3",
            language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
          )} style={{ animationDelay: '0.3s' }}>
            {synopsis}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          {videoUrl && (
            <a 
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg text-sm"
            >
              <Play className="w-4 h-4" />
              {language === 'en' ? 'Watch Trailer' : language === 'jp' ? '予告編を見る' : '예고편 보기'}
            </a>
          )}
          {officialUrl && (
            <a 
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              {language === 'en' ? 'Official Site' : language === 'jp' ? '公式サイト' : '공식 홈페이지'}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images - all slides preloaded, only active one visible */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
            index === currentSlide && !isTransitioning ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${slide.background_image})` }}
        />
      ))}
      
      {/* Overlay - different for each type */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        slideType === 'news' 
          ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent" 
          : "bg-white/30 backdrop-blur-[2px]"
      )} />

      {/* Animated background elements for branding slides */}
      {slideType === 'branding' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        </div>
      )}

      <div className={cn(
        "relative z-10 container mx-auto px-4",
        slideType === 'news' ? "flex items-end min-h-screen pb-24" : ""
      )}>
        {slideType === 'news' ? renderNewsSlide() : renderBrandingSlide()}
      </div>

      {/* Slide indicators - centered at bottom */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentSlide 
                  ? "bg-primary w-8" 
                  : slideType === 'news'
                    ? "bg-white/40 hover:bg-white/60 w-2" 
                    : "bg-foreground/30 hover:bg-foreground/50 w-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;