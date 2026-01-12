import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { ChevronDown, Play, Clock, Users, Tag, ExternalLink } from 'lucide-react';
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
  const bgImage = currentSlideData?.background_image || '/assets/hero-bg.jpg';

  // Check if this slide has detailed content info
  const hasDetailedInfo = title || genre || cast || synopsis;

  // Format duration text
  const getDurationText = () => {
    if (episodes && durationPerEp) {
      return language === 'en' 
        ? `${episodes} eps × ${durationPerEp} min` 
        : `${episodes}부작 × ${durationPerEp}분`;
    }
    if (runtime) {
      return language === 'en' ? `${runtime} min` : `${runtime}분`;
    }
    return null;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      
      {/* Overlay - darker for content slides */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        hasDetailedInfo 
          ? "bg-gradient-to-r from-black/80 via-black/50 to-transparent" 
          : "bg-white/30 backdrop-blur-[2px]"
      )} />

      {/* Animated background elements */}
      {!hasDetailedInfo && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        {hasDetailedInfo ? (
          /* News-style horizontal layout for content slides */
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left side - Content Info */}
            <div className={cn(
              "flex-1 max-w-2xl text-left transition-opacity duration-500",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}>
              {/* Logo */}
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {logoUrl && (
                  <img src={logoUrl} alt="LYD Networks" className="h-12 md:h-16 w-auto object-contain" />
                )}
              </div>

              {/* Title */}
              {title && (
                <h1 className={cn(
                  "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up",
                  language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''
                )} style={{ animationDelay: '0.15s' }}>
                  {title}
                </h1>
              )}

              {/* Tagline if no title */}
              {!title && tagline && (
                <h2 className={cn(
                  "font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-4 animate-fade-in-up",
                  language === 'jp' ? 'font-jp heading-jp' : language === 'kr' ? 'font-kr' : ''
                )} style={{ animationDelay: '0.15s' }}>
                  {tagline}
                </h2>
              )}

              {/* Meta info row */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {genre && (
                  <span className={cn(
                    "flex items-center gap-1.5",
                    language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                  )}>
                    <Tag className="w-4 h-4 text-primary" />
                    {genre}
                  </span>
                )}
                {getDurationText() && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    {getDurationText()}
                  </span>
                )}
              </div>

              {/* Cast */}
              {cast && (
                <div className={cn(
                  "flex items-center gap-2 text-white/70 text-sm mb-6 animate-fade-in-up",
                  language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                )} style={{ animationDelay: '0.25s' }}>
                  <Users className="w-4 h-4 text-primary" />
                  <span>{cast}</span>
                </div>
              )}

              {/* Synopsis */}
              {synopsis && (
                <p className={cn(
                  "text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl animate-fade-in-up",
                  language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                )} style={{ animationDelay: '0.3s' }}>
                  {synopsis}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                {videoUrl && (
                  <a 
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    {language === 'en' ? 'Watch Trailer' : language === 'jp' ? '予告編を見る' : '예고편 보기'}
                  </a>
                )}
                <button 
                  onClick={scrollToAbout}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
                >
                  {language === 'en' ? 'Explore More' : language === 'jp' ? '詳しく見る' : '더 알아보기'}
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right side - decorative space for background image visibility */}
            <div className="hidden lg:block flex-1" />
          </div>
        ) : (
          /* Original centered layout for simple slides */
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
                className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg"
              >
                {language === 'en' ? 'Explore More' : language === 'jp' ? '詳しく見る' : '더 알아보기'}
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="flex justify-center lg:justify-start gap-2 mt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "bg-primary w-8" 
                    : hasDetailedInfo 
                      ? "bg-white/30 hover:bg-white/50" 
                      : "bg-foreground/30 hover:bg-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className={cn(
          "w-6 h-6",
          hasDetailedInfo ? "text-white/60" : "text-primary/60"
        )} />
      </div>
    </section>
  );
};

export default Hero;