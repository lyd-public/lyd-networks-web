import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { Film, Play, ChevronDown, Clock, Users, Tag, ExternalLink } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayCount, setDisplayCount] = useState(8);

  // 1. 데이터 처리 및 필터링
  const processedItems = useMemo(() => {
    if (!data?.portfolio?.items) return [];
    
    const sorted = [...data.portfolio.items].sort((a, b) => 
      parseInt(b.year || '0') - parseInt(a.year || '0')
    );

    return activeFilter === 'All' 
      ? sorted 
      : sorted.filter(item => item.category === activeFilter);
  }, [data?.portfolio?.items, activeFilter]);

  // 2. 카테고리 목록 생성
  const categories = useMemo(() => {
    if (!data?.portfolio?.items) return ['All'];
    return ['All', ...new Set(data.portfolio.items.map(item => item.category))];
  }, [data?.portfolio?.items]);

  if (!data) return null;
  const portfolio = data.portfolio;
  const visibleItems = processedItems.slice(0, displayCount);

  // 카테고리 라벨 다국어 처리
  const getCategoryLabel = (category: string) => {
    if (category === 'All') {
      return portfolio[language]?.allFilter || 'All';
    }
    const categoryIndex = portfolio.categories?.en?.indexOf(category) ?? -1;
    if (categoryIndex !== -1 && portfolio.categories?.[language]) {
      return portfolio.categories[language][categoryIndex] || category;
    }
    return category;
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setDisplayCount(8);
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {portfolio[language].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeFilter === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              } ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((item, index) => (
            <a 
              key={`${item.title.en}-${index}`}
              href={item.video_url || '#'}
              target={item.video_url ? '_blank' : undefined}
              rel={item.video_url ? 'noopener noreferrer' : undefined}
              onClick={(e) => { if (!item.video_url) e.preventDefault(); }}
              className="card-premium group cursor-pointer overflow-hidden animate-fade-in-up block"
              style={{ animationDelay: `${(index % 8) * 0.05}s` }}
            >
              <div className="relative aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title[language]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10" />
                <div className="absolute top-3 left-3 z-20">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-accent/90 text-accent-foreground ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex flex-col justify-end p-4">
                  {item.synopsis?.[language] && (
                    <p className={`text-white/90 text-xs leading-relaxed mb-3 overflow-y-auto max-h-[160px] pr-2 custom-scrollbar ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                      {item.synopsis[language]}
                    </p>
                  )}
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                  {item.video_url && (
                    <p className="text-white/70 text-xs text-center flex items-center justify-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {language === 'en' ? 'Watch Trailer' : language === 'jp' ? '予告編を見る' : '예고편 보기'}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className={`font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                  {item.title[language]}
                </h3>
                
                {/* 시간 및 회차 정보 (핵심 수정 부분) */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <span className="font-medium">{item.year}</span>
                  
                  {item.runtime && (
                    <span className="flex items-center gap-1">
                      <span className="text-muted-foreground/50">•</span>
                      <Clock className="w-3 h-3" />
                      {item.runtime}
                      {language === 'en' ? ' min' : language === 'jp' ? '分' : '분'}
                    </span>
                  )}

                  {item.episodes && item.duration_per_ep && (
                    <span className="flex items-center gap-1">
                      <span className="text-muted-foreground/50">•</span>
                      <Clock className="w-3 h-3" />
                      {item.episodes}
                      {language === 'en' ? ' eps' : language === 'jp' ? '話' : '부작'} 
                      × {item.duration_per_ep}
                      {language === 'en' ? ' min' : language === 'jp' ? '分' : '분'}
                    </span>
                  )}
                </div>

                {item.genre && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3 text-primary/70" />
                    <span className={`line-clamp-1 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                      {typeof item.genre === 'string' ? item.genre : item.genre[language] || item.genre.en}
                    </span>
                  </div>
                )}
                {item.cast && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3 h-3 text-primary/70" />
                    <span className={`line-clamp-1 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                      {typeof item.cast === 'string' ? item.cast : item.cast[language] || item.cast.en}
                    </span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center mt-16">
          {displayCount < processedItems.length ? (
            <button
              onClick={() => setDisplayCount(prev => prev + 8)}
              className="btn-glow inline-flex items-center gap-2 px-10 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all shadow-xl group"
            >
              {language === 'en' ? 'View More Works' : language === 'jp' ? '作品をもっと見る' : '작품 더보기'}
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          ) : (
            <p className="text-muted-foreground font-medium">
              {language === 'en' ? `All ${processedItems.length} titles displayed` : language === 'jp' ? `全${processedItems.length}作品を表示中` : `전체 ${processedItems.length}개 작품 표시 중`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
