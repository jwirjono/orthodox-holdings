import React, { useCallback, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhyOrthodox } from './components/WhyOrthodox';
import { OurClients } from './components/OurClients';
import { WhoWeAre } from './components/WhoWeAre';
import { ProcessSection } from './components/ProcessSection';
import { EcosystemSection } from './components/EcosystemSection';
import { ConsultationSection } from './components/ConsultationSection';
import { TaxCalculator } from './components/TaxCalculator';
import { ClientDashboard } from './components/ClientDashboard';
import { Footer } from './components/Footer';
import { WealthManagementPage } from './components/wealth/WealthManagementPage';
import { WealthFooter } from './components/wealth/WealthFooter';
import { NavigationProvider, type View } from './navigation';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('holding');
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [consultationMessage, setConsultationMessage] = useState<string>('');

  /**
   * Switches the top-level view. When `anchorId` is given the browser scrolls to
   * that element once the new view has rendered; otherwise it returns to the top.
   */
  const navigateView = useCallback(
    (view: View, anchorId?: string) => {
      const scrollToAnchor = () => {
        document.getElementById(anchorId!)?.scrollIntoView({ behavior: 'smooth' });
      };

      if (!anchorId) {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (view === currentView) {
        scrollToAnchor();
      } else {
        setCurrentView(view);
        // Let the incoming view mount before looking up the anchor.
        setTimeout(scrollToAnchor, 100);
      }
    },
    [currentView]
  );

  const handleOpenConsultation = useCallback(
    (customMsg?: string) => {
      if (customMsg) {
        setConsultationMessage(customMsg);
      }
      navigateView('business', 'consultation');
    },
    [navigateView]
  );

  const handleScrollToTaxCalculator = useCallback(() => {
    navigateView('business', 'tax-calculator');
  }, [navigateView]);

  const navigation = useMemo(() => ({ currentView, navigateView }), [currentView, navigateView]);

  return (
    <NavigationProvider value={navigation}>
      <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased selection:bg-white selection:text-black">
        {/* Fixed Header */}
        <Header
          currentView={currentView}
          onNavigateView={navigateView}
          onOpenDashboard={() => setDashboardOpen(true)}
          onOpenTaxCalculator={handleScrollToTaxCalculator}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Main Content Sections */}
        <main>
          {currentView === 'holding' && (
            <LandingPage
              onExploreBusiness={() => navigateView('business')}
              onExploreWealth={() => navigateView('wealth')}
              onOpenConsultation={handleOpenConsultation}
            />
          )}

          {currentView === 'business' && (
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

              {/* Section 4: Our Clients */}
              <OurClients />

              {/* Section 5: About Us & Leadership */}
              <WhoWeAre />

              {/* Section 6: How We Work (Process) */}
              <ProcessSection onOpenConsultation={handleOpenConsultation} />

              {/* Section 7: One Business. One Ecosystem. */}
              <EcosystemSection />

              {/* Section 8: Private Consultation */}
              <ConsultationSection initialMessage={consultationMessage} />

              {/* Diagnostic Sandbox: Tax Calculator */}
              <TaxCalculator onOpenConsultation={handleOpenConsultation} />
            </>
          )}

          {/* Orthodox Wealth Management — merged in from the standalone site */}
          {currentView === 'wealth' && <WealthManagementPage />}
        </main>

        {/* Footer — Wealth Management carries its own entity details */}
        {currentView === 'wealth' ? <WealthFooter /> : <Footer />}

        {/* Client Portfolio Dashboard Modal */}
        <ClientDashboard
          isOpen={dashboardOpen}
          onClose={() => setDashboardOpen(false)}
          onOpenConsultation={handleOpenConsultation}
        />
      </div>
    </NavigationProvider>
  );
}
