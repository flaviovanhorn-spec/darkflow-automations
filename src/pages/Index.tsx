import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Automation Agency</title>
        <meta 
          name="description" 
          content="Automate the busywork and focus on what matters. Custom automation solutions using n8n, Make, Google Workspace, HubSpot, and Power BI for small businesses and teams." 
        />
        <meta name="keywords" content="automation, n8n, Make, workflow automation, HubSpot, Power BI, business automation, CRM automation" />
        <link rel="canonical" href="https://dark3d.agency" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dark3D - Custom Automation Agency" />
        <meta property="og:description" content="Automate the busywork and focus on what matters. Custom automation solutions for small businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dark3d.agency" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dark3D - Custom Automation Agency" />
        <meta name="twitter:description" content="Automate the busywork and focus on what matters. Custom automation solutions for small businesses." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
