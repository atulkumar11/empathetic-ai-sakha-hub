
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SharedPageLayout } from '../SharedPageLayout';
import { BookMarked, Calendar, FileText, MessageSquare } from 'lucide-react';

const AcademicAdvisorSection = () => {
  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Academic Advisor</CardTitle>
            <CardDescription>
              AI-powered guidance for your exam preparation and academic goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-blue-700" />
                    </div>
                    <CardTitle className="text-lg">Ask Your Advisor</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get personalized answers to your academic questions and guidance on study strategies.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full justify-start text-left">
                      How should I prepare for the physics section of IIT-JEE?
                    </Button>
                    <Button className="w-full justify-start text-left">
                      What topics should I focus on for NEET chemistry?
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Ask your own question...
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-green-700" />
                    </div>
                    <CardTitle className="text-lg">Study Planning</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get help creating and optimizing your study schedule based on your goals and timeline.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full">Create Custom Study Plan</Button>
                    <Button variant="outline" className="w-full">Optimize Current Plan</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookMarked className="h-5 w-5 text-purple-700" />
                  </div>
                  <CardTitle className="text-lg">Subject-Specific Guidance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <div className="bg-red-100 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-red-700" />
                    </div>
                    <span>Physics</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-green-700" />
                    </div>
                    <span>Chemistry</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-blue-700" />
                    </div>
                    <span>Mathematics</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-amber-700" />
                    </div>
                    <span>Biology</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorSection;
