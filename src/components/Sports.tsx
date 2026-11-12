import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import klpgaAsset from '@/assets/sports/klpga.png.asset.json';

const logoMap: Record<string, string> = {
  'klpga': klpgaAsset.url,
  'fight-sports': '/channels/fight-sports.png',
};

const Sports: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data || !data.sports) return null;

  const sports = data.sports;

  return (
    <section id="sports" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {sports[language].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {sports.list.map((sport) => (
            <div
              key={sport.key}
              className="card-premium p-8 flex flex-col items-center text-center group hover:scale-105 transition-all duration-300"
            >
              {/* Sport logo */}
              <div className="w-full h-32 flex items-center justify-center mb-4">
                <img
                  src={logoMap[sport.key]}
                  alt={sport.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>

              {/* Sport name */}
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {sport.name}
              </span>

              {/* Category badge */}
              {sport.category && (
                <span className="mt-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                  {sport.category[language] || sport.category.en}
                </span>
              )}

              {/* Description */}
              {sport.description && (
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                  {sport.description[language] || sport.description.en}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sports;
