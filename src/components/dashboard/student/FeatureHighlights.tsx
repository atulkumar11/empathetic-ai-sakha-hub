
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Feature {
  id: string;
  title: string;
  description: string;
  isNew?: boolean;
  isPremium?: boolean;
}

interface FeatureHighlightsProps {
  features: Feature[];
}

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ features }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {features.map(feature => (
            <div key={feature.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{feature.title}</h3>
                <div className="space-x-1">
                  {feature.isNew && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">New</Badge>
                  )}
                  {feature.isPremium && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">Premium</Badge>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              <Button variant="outline" size="sm" className="mt-3">
                Explore
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureHighlights;
