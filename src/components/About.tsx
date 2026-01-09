import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/hooks/useData';
import { Target, Eye, MessageCircle, BookOpen, Users, Zap, Shield } from 'lucide-react';

const valueIcons = [MessageCircle, BookOpen, Users, Zap, Shield];

const About: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useData();

  if (!data) return null;

  const about = data.about[language];
  const coreValues = data.coreValues[language];
  const timeline = data.timeline;

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="card-premium p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Target className="w-7 h-7" />
              </div>
              <h3 className={`font-display text-2xl font-bold text-foreground ${language === 'jp' ? 'heading-jp' : ''}`}>
                {about.mission.title}
              </h3>
            </div>
            <p className={`text-lg text-foreground/80 leading-relaxed ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
              {about.mission.text}
            </p>
          </div>

          {/* Vision */}
          <div className="card-premium p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className={`font-display text-2xl font-bold text-foreground ${language === 'jp' ? 'heading-jp' : ''}`}>
                {about.vision.title}
              </h3>
            </div>
            <p className={`text-lg text-foreground/80 leading-relaxed ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
              {about.vision.text}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className={`font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {coreValues.title}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 stagger-children">
            {coreValues.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <div 
                  key={value.name}
                  className="card-premium p-6 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className={`font-semibold text-foreground mb-2 ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                    {value.name}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className={`font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12 ${language === 'jp' ? 'heading-jp' : ''}`}>
            {timeline[language].title}
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            <div className="space-y-8">
              {timeline.milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                    <div className="card-premium p-6 inline-block">
                      <span className="text-sm font-bold text-accent mb-2 block">{milestone.year}</span>
                      <p className={`text-foreground ${language === 'jp' ? 'font-jp' : language === 'kr' ? 'font-kr' : ''}`}>
                        {milestone[language]}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
