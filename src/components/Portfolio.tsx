import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { Film, Play } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();
  const [activeFilter, setActiveFilter] = useState('All');

  if (!data) return null;

  const portfolio = data.portfolio;
  const categories = ['All', ...new Set(portfolio.items.map(item => item.category))];

  const filteredItems = activeFilter === 'All' 
    ? portfolio.items 
    : portfolio.items.filter(item => item.category === activeFilter);

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
              onClick={() => setActiveFilter(category)}
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
          {filteredItems.map((item, index) => (
            <div 
              key={item.title.en}
              className="card-premium group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image placeholder */}
              <div className="relative aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                {/* Gradient overlay for visual interest */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-accent/90 text-accent-foreground ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>

                {/* Play icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/40 transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Film icon as placeholder */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                  <Film className="w-12 h-12 text-muted-foreground/30" />
                </div>
              </div>

              {/* Content info */}
              <div className="p-4">
                <h3 className={`font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                  {item.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground">{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View more indicator */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {language === 'en' ? `Showing ${filteredItems.length} titles` : language === 'jp' ? `${filteredItems.length}作品を表示中` : `${filteredItems.length}개 작품 표시 중`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
