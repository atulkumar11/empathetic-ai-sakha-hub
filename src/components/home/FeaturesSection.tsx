
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { individualPlans, groupPlans } from "@/components/pricing/pricingData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PricingCard from "@/components/pricing/PricingCard";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Choose Your Plan</h2>
          <p className="text-lg text-gray-700">
            Get started with Sakha AI today and transform your learning journey
          </p>
        </div>

        <Tabs defaultValue="individual" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="individual">Individual Plans</TabsTrigger>
              <TabsTrigger value="group">Group Plans</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="individual">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {individualPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {groupPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
