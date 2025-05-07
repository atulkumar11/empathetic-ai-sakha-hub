
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Brain, Calendar } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';

interface TodaysPlanSectionProps {
  studyPlan: any;
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ 
  studyPlan,
  currentMood 
}) => {
  const navigate = useNavigate();
  
  // Render appropriate message based on mood
  const getMoodBasedMessage = () => {
    switch(currentMood) {
      case MoodType.TIRED:
      case MoodType.STRESSED:
        return "Your plan has been adjusted for today based on your mood. Focus on lighter review tasks.";
      case MoodType.FOCUSED:
      case MoodType.MOTIVATED:
        return "Great energy today! Your plan includes some challenging concepts to leverage your focus.";
      default:
        return "Your personalized study plan for today is ready.";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-violet-600" />
            Today's Study Plan
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Personalized
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {getMoodBasedMessage()}
          </p>
          
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-800/50">
            <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Quick Summary</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Tasks for today:</span>
                <span className="font-medium">5</span>
              </li>
              <li className="flex justify-between">
                <span>Estimated time:</span>
                <span className="font-medium">2h 15m</span>
              </li>
              <li className="flex justify-between">
                <span>Priority subject:</span>
                <span className="font-medium">Physics</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/dashboard/student/today')}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
            >
              View Study Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
