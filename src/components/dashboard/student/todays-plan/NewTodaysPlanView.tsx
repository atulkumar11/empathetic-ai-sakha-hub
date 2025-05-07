
import React from 'react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, Brain, FileText, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import TimeAllocationWidget from './TimeAllocationWidget';
import RecommendationCard from './RecommendationCard';
import DailyQuote from './DailyQuote';
import StudyBreakdown from './StudyBreakdown';
import { cn } from '@/lib/utils';
import ScheduleTimeline from './ScheduleTimeline';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ planData }) => {
  const taskTotals = React.useMemo(() => {
    const concepts = planData?.concepts || [];
    const flashcards = planData?.flashcards || [];
    const practiceExams = planData?.practiceExams || [];
    
    const conceptsTotal = concepts.length;
    const conceptsCompleted = concepts.filter(c => c.status === 'completed').length;
    
    const flashcardsTotal = flashcards.length;
    const flashcardsCompleted = flashcards.filter(f => f.status === 'completed').length;
    
    const examsTotal = practiceExams.length;
    const examsCompleted = practiceExams.filter(p => p.status === 'completed').length;
    
    return {
      concepts: { total: conceptsTotal, completed: conceptsCompleted },
      flashcards: { total: flashcardsTotal, completed: flashcardsCompleted },
      practiceExams: { total: examsTotal, completed: examsCompleted }
    };
  }, [planData]);
  
  const totalProgress = React.useMemo(() => {
    const totalTasks = planData?.totalTasks || 0;
    const completedTasks = planData?.completedTasks || 0;
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }, [planData]);
  
  const streakNum = planData?.streak || 0;
  const streakStyle = cn(
    "font-bold text-lg",
    streakNum >= 10 ? "text-purple-600 dark:text-purple-400" : 
    streakNum >= 7 ? "text-blue-600 dark:text-blue-400" : 
    streakNum >= 3 ? "text-green-600 dark:text-green-400" : 
    "text-gray-600 dark:text-gray-400"
  );

  return (
    <div className="space-y-6">
      {/* Header stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Overall Progress</h3>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold mr-2">{totalProgress}%</span>
                <span className="text-xs text-muted-foreground">
                  ({planData?.completedTasks || 0}/{planData?.totalTasks || 0} tasks)
                </span>
              </div>
              <Progress value={totalProgress} className="mt-2 h-1.5" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Study Time</h3>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {planData?.timeAllocation?.total || 0}
                </span>
                <span className="text-xs ml-1 text-muted-foreground">minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Streak</h3>
            <div className="flex items-center mt-1">
              <span className={streakStyle}>{planData?.streak || 0}</span>
              <span className="text-xs ml-1 text-muted-foreground">days</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Focus Area</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {planData?.tomorrowPreview?.focusArea || "Mathematics"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks sections - Concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {planData?.concepts?.length ? (
                <div className="divide-y">
                  {planData.concepts.map((concept) => (
                    <div key={concept.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-medium">{concept.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {concept.subject} {concept.topic && `• ${concept.topic}`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">{concept.duration} min</div>
                          <Button variant={concept.status === 'completed' ? "outline" : "default"} size="sm">
                            {concept.status === 'completed' ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                Completed
                              </>
                            ) : (
                              'Start'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No concept tasks for today
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Tasks sections - Flashcards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {planData?.flashcards?.length ? (
                <div className="divide-y">
                  {planData.flashcards.map((flashcard) => (
                    <div key={flashcard.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-medium">{flashcard.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {flashcard.subject} {flashcard.cardCount && `• ${flashcard.cardCount} cards`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">{flashcard.duration} min</div>
                          <Button variant={flashcard.status === 'completed' ? "outline" : "default"} size="sm">
                            {flashcard.status === 'completed' ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                Completed
                              </>
                            ) : (
                              'Start'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No flashcard tasks for today
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Tasks sections - Practice Exams */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Practice Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              {planData?.practiceExams?.length ? (
                <div className="divide-y">
                  {planData.practiceExams.map((exam) => (
                    <div key={exam.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-medium">{exam.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {exam.subject} {exam.questionCount && `• ${exam.questionCount} questions`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">{exam.duration} min</div>
                          <Button variant={exam.status === 'completed' ? "outline" : "default"} size="sm">
                            {exam.status === 'completed' ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                Completed
                              </>
                            ) : (
                              'Start'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No practice exams for today
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Timeline view */}
          <ScheduleTimeline planData={planData} />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <StudyBreakdown planData={planData} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Time Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TimeAllocationWidget 
                  title="Concepts" 
                  value={planData.timeAllocation.concepts} 
                  total={planData.timeAllocation.total} 
                  color="bg-blue-500" 
                  subject="Concepts"
                />
                <TimeAllocationWidget 
                  title="Flashcards" 
                  value={planData.timeAllocation.flashcards} 
                  total={planData.timeAllocation.total} 
                  color="bg-green-500" 
                  subject="Flashcards"
                />
                <TimeAllocationWidget 
                  title="Practice Exams" 
                  value={planData.timeAllocation.practiceExams} 
                  total={planData.timeAllocation.total} 
                  color="bg-purple-500" 
                  subject="Practice Exams"
                />
                {planData.timeAllocation.revision && (
                  <TimeAllocationWidget 
                    title="Revision" 
                    value={planData.timeAllocation.revision} 
                    total={planData.timeAllocation.total} 
                    color="bg-amber-500" 
                    subject="Revision"
                  />
                )}
              </div>
            </CardContent>
          </Card>
          
          {planData.recommendations && planData.recommendations.length > 0 && (
            <RecommendationCard recommendations={planData.recommendations} />
          )}
          
          <DailyQuote />
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mb-3">
                <h3 className="font-medium mb-1">Need to adjust your plan?</h3>
                <p className="text-sm text-muted-foreground">
                  Let's make your study plan work better for you
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Customize Study Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewTodaysPlanView;
