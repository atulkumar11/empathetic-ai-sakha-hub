
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import FAQSection from "@/components/pricing/FAQSection";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <PricingHero />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <SubscriptionPlans />
          </div>
        </section>
        
        <FAQSection />
      </main>
      <Footer />
      <FloatingAvatar />
    </div>
  );
};

export default Pricing;
