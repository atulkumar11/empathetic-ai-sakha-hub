
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Star, ArrowRight, BookOpen, Dumbbell, BarChartHorizontal, Lightbulb } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/types/student/todaysPlans";

interface SmartExtrasSectionProps {
  recommendations: {
    title: string;
    description: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    status: TaskStatus;
    id: string;
  }[];
  weaknesses: {
    subject: string;
    topic: string;
    accuracy: number;
  }[];
  insights: string[];
}

const SmartExtrasSection: React.FC<SmartExtrasSectionProps> = ({
  recommendations,
  weaknesses,
  insights
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* AI Recommendations */}
      <Card className="border-blue-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-pointer">
                  {rec.type === 'concept' && <BookOpen className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />}
                  {rec.type === 'flashcard' && <Star className="h-5 w-5 mr-3 text-amber-500 mt-0.5" />}
                  {rec.type === 'practice-exam' && <Dumbbell className="h-5 w-5 mr-3 text-green-500 mt-0.5" />}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      {rec.status === "completed" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completed</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                  </div>
                </div>
              ))}
              
              <button className="flex items-center justify-center w-full text-sm text-blue-600 font-medium hover:underline">
                See all recommendations <ArrowRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <Lightbulb className="h-12 w-12 mb-2 text-gray-400" />
              <p className="text-center">No recommendations available yet. Complete more study tasks to receive personalized suggestions.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Areas to Improve */}
      <Card className="border-red-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <BarChartHorizontal className="h-5 w-5 mr-2 text-red-500" />
            Areas to Improve
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weaknesses.length > 0 ? (
            <div className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-red-50 hover:border-red-100 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{weakness.topic}</h4>
                      <p className="text-sm text-gray-500">{weakness.subject}</p>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      {weakness.accuracy}% accuracy
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <BarChartHorizontal className="h-12 w-12 mb-2 text-gray-400" />
              <p className="text-center">No weaknesses identified yet. Complete more practice tests to receive feedback.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartExtrasSection;
