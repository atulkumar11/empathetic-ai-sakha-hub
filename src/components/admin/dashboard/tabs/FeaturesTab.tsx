
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";
import { Layers, ArrowRight, Shield, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FeaturesTab = () => {
  const navigate = useNavigate();
  const features = getFeatures();
  
  const premiumFeatures = features.filter(feature => feature.isPremium);
  const basicFeatures = features.filter(feature => !feature.isPremium);
  
  const premiumPercentage = Math.round((premiumFeatures.length / features.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Platform Features Management</h2>
        <Button onClick={() => navigate('/admin/features')} className="flex items-center gap-2">
          <Layers size={16} />
          <span>Manage All Features</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{features.length}</div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Layers size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Available across all plans
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Premium Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{premiumFeatures.length}</div>
              <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                <Shield size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Restricted to premium plans
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Free Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{basicFeatures.length}</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <Users size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Available to all users
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Premium Features</span>
              <span className="text-sm font-medium">{premiumPercentage}%</span>
            </div>
            <Progress value={premiumPercentage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Free Features</span>
              <span className="text-sm font-medium">{100 - premiumPercentage}%</span>
            </div>
            <Progress value={100 - premiumPercentage} className="h-2 bg-gray-200 dark:bg-gray-700">
              <div className="h-full bg-green-500 transition-all" style={{ transform: `translateX(-${100 - (100 - premiumPercentage)}%)` }} />
            </Progress>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Feature Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-xs text-gray-500">
                        {feature.isPremium ? 'Premium Access' : 'Free Access'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/admin/features')}>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">24/7 Tutor</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Academic Advisor</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Flashcards & Revision</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Practice Exams</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeaturesTab;
