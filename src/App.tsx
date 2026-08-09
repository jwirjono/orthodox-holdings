import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhyOrthodox } from './components/WhyOrthodox';
import { WhoWeAre } from './components/WhoWeAre';
import { ProcessSection } from './components/ProcessSection';
import { EcosystemSection } from './components/EcosystemSection';
import { ConsultationSection } from './components/ConsultationSection';
import { TaxCalculator } from './components/TaxCalculator';
import { ClientDashboard } from './components/ClientDashboard';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'holding' | 'business'>('holding');
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [consultationMessage, setConsultationMessage] = useState<string>('');

  const handleNavigateView = (view: 'holding' | 'business') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (customMsg?: string) => {
    if (customMsg) {
      setConsultationMessage(customMsg);
    }
    if (currentView !== 'business') {
      setCurrentView('business');
      setTimeout(() => {
        const elem = document.getElementById('consultation');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const elem = document.getElementById('consultation');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTaxCalculator = () => {
    if (currentView !== 'business') {
      setCurrentView('business');
      setTimeout(() => {
        const elem = document.getElementById('tax-calculator');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const elem = document.getElementById('tax-calculator');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased selection:bg-white selection:text-black">
      {/* Fixed Header */}
      <Header
        currentView={currentView}
        onNavigateView={handleNavigateView}
        onOpenDashboard={() => setDashboardOpen(true)}
        onOpenTaxCalculator={handleScrollToTaxCalculator}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Content Sections */}
      <main>
        {currentView === 'holding' ? (
          <LandingPage
            onExploreBusiness={() => handleNavigateView('business')}
            onOpenConsultation={handleOpenConsultation}
          />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection
              onOpenConsultation={handleOpenConsultation}
              onOpenDashboard={() => setDashboardOpen(true)}
            />

            {/* Section 2: How Can We Help You, Frequent Problem To Solve & Our Service */}
            <ProblemSection onOpenConsultation={handleOpenConsultation} />

            {/* Section 3: Why Orthodox */}
            <WhyOrthodox />

            {/* Section 4: About Us & Leadership */}
            <WhoWeAre />

            {/* Section 5: How We Work (Process) */}
            <ProcessSection onOpenConsultation={handleOpenConsultation} />

            {/* Section 6: One Business. One Ecosystem. */}
            <EcosystemSection />

            {/* Section 7: Private Consultation */}
            <ConsultationSection initialMessage={consultationMessage} />

            {/* Diagnostic Sandbox: Tax Calculator */}
            <TaxCalculator onOpenConsultation={handleOpenConsultation} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Client Portfolio Dashboard Modal */}
      <ClientDashboard
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        onOpenConsultation={handleOpenConsultation}
      />
    </div>
  );
}


