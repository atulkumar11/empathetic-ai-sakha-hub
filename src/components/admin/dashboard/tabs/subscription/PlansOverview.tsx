
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

const planDistributionData = [
  {
    name: "Free Plan (7 Days)",
    users: 564,
    percentage: 56,
    color: "bg-gray-500",
  },
  {
    name: "Pro Plan (Monthly)",
    users: 284,
    percentage: 28,
    color: "bg-purple-500",
  },
  {
    name: "Pro Plan (Annual)",
    users: 103,
    percentage: 10,
    color: "bg-indigo-500",
  },
  {
    name: "Group Plan (5 Users)",
    users: 45,
    percentage: 4.5,
    color: "bg-blue-500",
  },
  {
    name: "Group Plan (Annual)",
    users: 17,
    percentage: 1.5,
    color: "bg-cyan-500",
  },
];

const PlansOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Plan Distribution</span>
          <span className="text-sm font-normal text-muted-foreground">
            Total Users: 1,013
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress bar visualization */}
          <div className="h-4 w-full flex rounded-full overflow-hidden">
            {planDistributionData.map((plan, i) => (
              <div 
                key={i} 
                className={`${plan.color} h-full`} 
                style={{ width: `${plan.percentage}%` }}
              />
            ))}
          </div>
          
          {/* Plans breakdown */}
          <div className="space-y-4">
            {planDistributionData.map((plan, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{plan.users} users</span>
                  <span className="text-sm font-medium">({plan.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Conversion stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Free to Pro Conversion</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">24.8%</span>
                <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">+2.3%</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <span>Monthly trend</span>
                <ArrowRight size={12} />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Monthly to Annual</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">36.2%</span>
                <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">+5.7%</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <span>Monthly trend</span>
                <ArrowRight size={12} />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Retention Rate</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">84.5%</span>
                <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">+1.2%</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <span>Monthly trend</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansOverview;
