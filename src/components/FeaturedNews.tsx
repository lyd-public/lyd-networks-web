import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { Clock, Users, Tag, Play, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeaturedNews: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data?.featured_news) return null;

  const sectionData = data.featured_news[language] || data.featured_news.en;
  const items = data.featured_news.items || [];

  if (items.length === 0) return null;

  const getLocalizedText = (obj: { en?: string; jp?: string; kr?: string; [key: string]: string | undefined } | string | undefined, fallback = ''): string => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || obj.kr || obj.jp || fallback;
  };

  return (
    <section id="featured-news" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className={cn(
            "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4",
            language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
          )}>
            {sectionData?.title || 'Latest News & Releases'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* News Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <article
              key={item.id || index}
              className={cn(
                "card-premium p-0 overflow-hidden animate-fade-in-up",
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn(
                "flex flex-col lg:flex-row",
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              )}>
                {/* Poster Image */}
                <div className="lg:w-1/2 relative overflow-hidden group">
                  <div className="aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                    {item.poster_image ? (
                      <img
                        src={item.poster_image}
                        alt={getLocalizedText(item.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Play className="w-16 h-16 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                  {/* Release Date Badge */}
                  {item.release_date && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 w-fit">
                      {item.release_date}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className={cn(
                    "font-display text-2xl lg:text-3xl font-bold text-foreground mb-4",
                    language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                  )}>
                    {getLocalizedText(item.title)}
                  </h3>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    {/* Genre */}
                    {item.genre && (
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-primary" />
                        <span>{getLocalizedText(item.genre)}</span>
                      </div>
                    )}
                    
                    {/* Duration */}
                    {item.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{item.duration}</span>
                      </div>
                    )}

                    {/* Cast */}
                    {item.cast && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{getLocalizedText(item.cast)}</span>
                      </div>
                    )}
                  </div>

                  {/* Synopsis */}
                  {item.synopsis && (
                    <p className={cn(
                      "text-muted-foreground leading-relaxed mb-6 line-clamp-4",
                      language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''
                    )}>
                      {getLocalizedText(item.synopsis)}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {item.video_url && (
                      <a
                        href={item.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                      >
                        <Play className="w-4 h-4" />
                        {sectionData?.trailer_button || 'Watch Trailer'}
                      </a>
                    )}
                    {item.official_url && (
                      <a
                        href={item.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {sectionData?.official_button || 'Official Site'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
