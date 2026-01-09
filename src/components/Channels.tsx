import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';

const Channels: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const channels = data.channels;

  return (
    <section id="channels" className="py-24 lg:py-32 relative bg-secondary/20">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {channels[language].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
        </div>

        {/* Channel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {channels.list.map((channel, index) => (
            <div 
              key={channel.name}
              className="card-premium p-6 flex flex-col items-center justify-center aspect-square group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Placeholder for channel logo - using text fallback */}
              <div className="w-full h-16 flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">
                    {channel.name.charAt(0)}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground/80 text-center group-hover:text-primary transition-colors">
                {channel.name}
              </span>
            </div>
          ))}
        </div>

        {/* Partner count badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-bold text-lg">10+</span>
            <span className="text-foreground/70">
              {language === 'en' ? 'Global Partners' : language === 'jp' ? 'グローバルパートナー' : '글로벌 파트너'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Channels;
