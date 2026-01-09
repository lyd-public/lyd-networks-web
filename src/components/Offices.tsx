import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { MapPin, Mail, Globe } from 'lucide-react';

const Offices: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const offices = data.offices;
  const company = data.company;

  return (
    <section id="offices" className="py-24 lg:py-32 relative bg-secondary/20">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {offices[language].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
        </div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 stagger-children">
          {offices.locations.map((office, index) => (
            <div 
              key={office.city.en}
              className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              {/* City icon */}
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="w-8 h-8" />
              </div>

              {/* City & Country */}
              <h3 className={`font-display text-2xl font-bold text-foreground mb-2 ${language === 'jp' ? 'heading-jp' : ''}`}>
                {office.city[language]}
              </h3>
              <p className={`text-primary font-medium mb-4 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                {office.country[language]}
              </p>

              {/* Address */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {office.address}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="max-w-2xl mx-auto">
          <div className="card-premium p-8">
            <h3 className={`font-display text-xl font-bold text-foreground text-center mb-6 ${language === 'jp' ? 'heading-jp' : ''}`}>
              {data.footer[language].contact}
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>{company.email}</span>
              </a>
              <a 
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
              >
                <Globe className="w-5 h-5 text-primary" />
                <span>{company.website}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offices;
