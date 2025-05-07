
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuickAccessButtons } from "./QuickAccessButtons";

interface SharedSectionLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
}

export function SharedSectionLayout({ title, subtitle, children, stats }: SharedSectionLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Quick Access Buttons */}
      <QuickAccessButtons />
      
      {/* Header Section */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base text-muted-foreground">
            {subtitle || "Welcome to your personalized learning journey"}
          </h3>
        </div>
        
        {stats && (
          <div className="flex flex-wrap gap-4">
            {stats.map((stat, index) => (
              <Badge key={index} variant="outline" className="font-normal">
                {stat.label}: {stat.value}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-12">
          <Card className="p-6">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
