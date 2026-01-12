import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Channels from '@/components/Channels';
import Portfolio from '@/components/Portfolio';
import Offices from '@/components/Offices';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Channels />
          <Portfolio />
          <Offices />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
