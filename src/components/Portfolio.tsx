import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { Film, Play, ChevronDown } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();
  const [activeFilter, setActiveFilter] = useState('All');
  
  // 1. 처음 보여줄 작품 개수 설정 (예: 8개)
  const [displayCount, setDisplayCount] = useState(8);

  if (!data) return null;

  const portfolio = data.portfolio;
  const categories = ['All', ...new Set(portfolio.items.map(item => item.category))];

  // 2. 최신순 정렬 및 필터링 로직 (성능을 위해 useMemo 사용)
  const processedItems = useMemo(() => {
    // 먼저 최신 연도순으로 정렬
    const sorted = [...portfolio.items].sort((a, b) => 
      parseInt(b.year) - parseInt(a.year)
    );

    // 카테고리 필터 적용
    return activeFilter === 'All' 
      ? sorted 
      : sorted.filter(item => item.category === activeFilter);
  }, [portfolio.items, activeFilter]);

  // 3. 현재 화면에 보여줄 개수만큼 자르기
  const visibleItems = processedItems.slice(0, displayCount);

  const getCategoryLabel = (category: string) => {
    if (category === 'All') {
      return portfolio[language].allFilter;
    }
    const categoryIndex = portfolio.categories.en.indexOf(category);
    if (categoryIndex !== -1) {
      return portfolio.categories[language][categoryIndex];
    }
    return category;
  };

  // 필터 변경 시 개수 초기화
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setDisplayCount(8); // 카테고리를 바꾸면 다시 8개만 보여줌
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
            <div 
              key={`${item.title.en}-${index}`}
              className="card-premium group cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${(index % 8) * 0.05}s` }}
            >
              {/* Image placeholder */}
              <div className="relative aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-accent/90 text-accent-foreground ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/40 transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                  <Film className="w-12 h-12 text-muted-foreground/30" />
                </div>
              </div>

              <div className="p-4">
                <h3 className={`font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                  {item.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 및 상태 표시 */}
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
