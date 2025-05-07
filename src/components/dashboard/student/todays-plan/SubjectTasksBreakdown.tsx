
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Book, BookOpen, FileText } from 'lucide-react';

export function SubjectTasksBreakdown() {
  // Mock data for subjects
  const subjects = [
    {
      name: "Physics",
      color: "blue",
      totalTime: 90,
      progress: 35,
      tasks: {
        concepts: [
          { id: "c1", title: "Newton's Laws", timeEstimate: 25, completed: false },
          { id: "c2", title: "Motion Kinematics", timeEstimate: 20, completed: true }
        ],
        flashcards: [
          { id: "f1", title: "Force & Motion", cardCount: 10, timeEstimate: 15, progress: 30, completed: false }
        ],
        practiceTests: [
          { id: "pt1", title: "Mini Test", timeEstimate: 30, completed: false }
        ]
      }
    },
    {
      name: "Chemistry",
      color: "green",
      totalTime: 75,
      progress: 20,
      tasks: {
        concepts: [
          { id: "c3", title: "Periodic Table", timeEstimate: 25, completed: false }
        ],
        flashcards: [
          { id: "f2", title: "Elements", cardCount: 5, timeEstimate: 10, progress: 60, completed: false }
        ],
        practiceTests: [
          { id: "pt2", title: "Quick Quiz", timeEstimate: 15, completed: false }
        ]
      }
    },
    {
      name: "Mathematics",
      color: "violet",
      totalTime: 65,
      progress: 10,
      tasks: {
        concepts: [
          { id: "c4", title: "Calculus Basics", timeEstimate: 30, completed: false }
        ],
        flashcards: [
          { id: "f3", title: "Math Formulas", cardCount: 8, timeEstimate: 15, progress: 0, completed: false }
        ],
        practiceTests: [
          { id: "pt3", title: "Practice Problems", timeEstimate: 20, completed: false }
        ]
      }
    }
  ];

  // Helper function to get color classes for a subject
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, {
      bg: string,
      border: string,
      darkBg: string, 
      darkBorder: string,
      text: string,
      darkText: string
    }> = {
      blue: {
        bg: "bg-blue-50/70", 
        border: "border-blue-200",
        darkBg: "dark:bg-blue-900/20",
        darkBorder: "dark:border-blue-800/30",
        text: "text-blue-700",
        darkText: "dark:text-blue-300"
      },
      green: {
        bg: "bg-green-50/70",
        border: "border-green-200",
        darkBg: "dark:bg-green-900/20",
        darkBorder: "dark:border-green-800/30",
        text: "text-green-700",
        darkText: "dark:text-green-300"
      },
      violet: {
        bg: "bg-violet-50/70",
        border: "border-violet-200",
        darkBg: "dark:bg-violet-900/20", 
        darkBorder: "dark:border-violet-800/30",
        text: "text-violet-700",
        darkText: "dark:text-violet-300"
      },
      amber: {
        bg: "bg-amber-50/70",
        border: "border-amber-200", 
        darkBg: "dark:bg-amber-900/20",
        darkBorder: "dark:border-amber-800/30",
        text: "text-amber-700", 
        darkText: "dark:text-amber-300"
      }
    };

    return colorMap[color] || colorMap.blue;
  };

  // Helper function to toggle task completion status
  const handleTaskCompletion = (subjectName: string, taskType: string, taskId: string) => {
    console.log(`Toggle completion: ${subjectName} - ${taskType} - ${taskId}`);
    // In a real app, this would update state or call an API
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Today's Subject Breakdown</h2>
      
      <div className="space-y-6">
        {subjects.map(subject => {
          const colorClasses = getColorClasses(subject.color);
          
          return (
            <Card key={subject.name} className={`border ${colorClasses.border} ${colorClasses.darkBorder}`}>
              <CardHeader className={`${colorClasses.bg} ${colorClasses.darkBg}`}>
                <div className="flex justify-between items-center">
                  <CardTitle className={`text-lg ${colorClasses.text} ${colorClasses.darkText}`}>
                    {subject.name}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`${colorClasses.bg} ${colorClasses.text} ${colorClasses.border}`}>
                      {subject.progress}% Complete
                    </Badge>
                    <Badge variant="outline">
                      {Math.floor(subject.totalTime / 60) > 0 ? 
                        `${Math.floor(subject.totalTime / 60)}h ${subject.totalTime % 60}m` : 
                        `${subject.totalTime}m`}
                    </Badge>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2 mt-2" />
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Concepts section */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
                      Concepts
                    </h3>
                    
                    <div className="space-y-2">
                      {subject.tasks.concepts.map(concept => (
                        <div 
                          key={concept.id} 
                          className="p-2 border rounded-md flex items-center justify-between bg-white dark:bg-gray-800"
                        >
                          <div>
                            <div className="flex items-center">
                              {concept.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <Circle 
                                  className="h-4 w-4 text-gray-300 mr-2 cursor-pointer hover:text-gray-400"
                                  onClick={() => handleTaskCompletion(subject.name, 'concepts', concept.id)} 
                                />
                              )}
                              <span className="font-medium text-sm">{concept.title}</span>
                            </div>
                            <div className="ml-6 text-xs text-muted-foreground mt-1">
                              {concept.timeEstimate} minutes
                            </div>
                          </div>
                          
                          <Link to={`/dashboard/student/concepts/${subject.name.toLowerCase()}/${concept.id}`}>
                            <Button variant="ghost" size="sm">Study</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Flashcards section */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Book className="h-4 w-4 mr-1 text-amber-500" />
                      Flashcards
                    </h3>
                    
                    <div className="space-y-2">
                      {subject.tasks.flashcards.map(flashcard => (
                        <div 
                          key={flashcard.id} 
                          className="p-2 border rounded-md bg-white dark:bg-gray-800"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              {flashcard.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <Circle 
                                  className="h-4 w-4 text-gray-300 mr-2 cursor-pointer hover:text-gray-400"
                                  onClick={() => handleTaskCompletion(subject.name, 'flashcards', flashcard.id)} 
                                />
                              )}
                              <span className="font-medium text-sm">{flashcard.title}</span>
                            </div>
                            <span className="text-xs">{flashcard.cardCount} cards</span>
                          </div>
                          
                          <div className="ml-6 mb-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{flashcard.progress}%</span>
                            </div>
                            <Progress value={flashcard.progress} className="h-1 mt-1" />
                          </div>
                          
                          <div className="flex justify-between items-center ml-6">
                            <span className="text-xs text-muted-foreground">{flashcard.timeEstimate} min</span>
                            <Link to={`/dashboard/student/flashcards/${subject.name.toLowerCase()}/${flashcard.id}`}>
                              <Button variant="ghost" size="sm">Review</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Practice Tests section */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-purple-500" />
                      Practice Tests
                    </h3>
                    
                    <div className="space-y-2">
                      {subject.tasks.practiceTests.map(test => (
                        <div 
                          key={test.id} 
                          className="p-2 border rounded-md flex items-center justify-between bg-white dark:bg-gray-800"
                        >
                          <div>
                            <div className="flex items-center">
                              {test.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <Circle 
                                  className="h-4 w-4 text-gray-300 mr-2 cursor-pointer hover:text-gray-400"
                                  onClick={() => handleTaskCompletion(subject.name, 'practiceTests', test.id)} 
                                />
                              )}
                              <span className="font-medium text-sm">{test.title}</span>
                            </div>
                            <div className="ml-6 text-xs text-muted-foreground mt-1">
                              {test.timeEstimate} minutes
                            </div>
                          </div>
                          
                          <Link to={`/dashboard/student/practice-exam/${test.id}/start`}>
                            <Button variant="ghost" size="sm">Take Test</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
