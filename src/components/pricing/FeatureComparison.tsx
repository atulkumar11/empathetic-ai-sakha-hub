
import React from "react";
import { Check, X } from "lucide-react";

const features = [
  {
    name: "Concept Cards",
    free: "5 total",
    pro: "Unlimited (via Study Plan)",
    group: "Unlimited (via Study Plan)"
  },
  {
    name: "Flashcards",
    free: "5 total",
    pro: "Unlimited",
    group: "Unlimited"
  },
  {
    name: "Practice Exams",
    free: "5 total",
    pro: "Unlimited",
    group: "Unlimited"
  },
  {
    name: "Custom Card Creation",
    free: false,
    pro: "via credits",
    group: "shared credit pool"
  },
  {
    name: "Academic Advisor",
    free: "1 plan",
    pro: "2/month",
    group: "4/month shared"
  },
  {
    name: "Smart Study Plan",
    free: "Basic",
    pro: "Full + Mood-Based",
    group: "Full + Mood-Based"
  },
  {
    name: "AI Tutor",
    free: "10 requests",
    pro: "Unlimited (Fair Use)",
    group: "Unlimited (Per User)"
  },
  {
    name: "Study Groups",
    free: false,
    pro: false,
    group: true
  },
  {
    name: "Admin Dashboard",
    free: false,
    pro: false,
    group: true
  },
  {
    name: "Batch Manager",
    free: false,
    pro: false,
    group: true
  },
  {
    name: "Feel Good Corner",
    free: true,
    pro: true,
    group: true
  },
  {
    name: "Surrounding Influence",
    free: false,
    pro: true,
    group: true
  }
];

const FeatureComparison = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Feature Access by Plan</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Free Plan</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Pro Plan</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Group Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className="py-3 text-sm font-medium">{feature.name}</td>
                  <td className="py-3 text-sm">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )
                    ) : (
                      feature.free
                    )}
                  </td>
                  <td className="py-3 text-sm">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )
                    ) : (
                      feature.pro
                    )}
                  </td>
                  <td className="py-3 text-sm">
                    {typeof feature.group === "boolean" ? (
                      feature.group ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )
                    ) : (
                      feature.group
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;
