
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PlatformStrengths = () => {
  const strengths = [
    {
      title: "Why Choose PREPZR?",
      features: [
        "AI-powered personalized study plans that adapt to your learning style",
        "Comprehensive concept breakdown for complex topics",
        "Smart revision scheduling based on forgetting curves",
        "Real-time progress tracking and performance analytics",
        "Mood-based learning environment to maximize productivity",
        "Proven results with thousands of successful students"
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-1">
          {strengths.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-center">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="shrink-0 mt-0.5">
                        <Check className="h-5 w-5 rounded-full bg-primary/20 text-primary p-1" />
                      </div>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformStrengths;
