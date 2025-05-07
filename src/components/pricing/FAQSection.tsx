
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { faq } from "./pricingData";

const FAQSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg mb-6">Still have questions?</p>
            <Button variant="outline" asChild>
              <Link to="/support">Contact Our Support Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
