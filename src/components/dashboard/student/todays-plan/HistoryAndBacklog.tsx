
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { History, Flag, Clock, AlertTriangle } from 'lucide-react';

export function HistoryAndBacklog() {
  // Mock data for backlog items
  const backlogItems = [
    {
      id: "bl1",
      subject: "History",
      title: "Revolt of 1857 Flashcards",
      type: "flashcard",
      timeEstimate: 15,
      daysOverdue: 1,
      path: "/dashboard/student/flashcards/history/revolt-1857"
    },
    {
      id: "bl2",
      subject: "Math",
      title: "Quadratic Equations Concept",
      type: "concept",
      timeEstimate: 30,
      daysOverdue: 2,
      path: "/dashboard/student/concepts/math/quadratic-equations"
    },
    {
      id: "bl3",
      subject: "Physics",
      title: "Optics Mini Test",
      type: "practice-exam",
      timeEstimate: 25,
      daysOverdue: 1,
      path: "/dashboard/student/practice-exam/physics/optics-mini"
    }
  ];

  // Mock data for activity history
  const activityHistory = [
    {
      id: "a1",
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      activities: [
        { type: "concept", title: "Cellular Respiration", subject: "Biology", timeSpent: 28 },
        { type: "flashcard", title: "Organic Chemistry Terms", subject: "Chemistry", timeSpent: 15 },
        { type: "practice-exam", title: "Wave Mechanics Quiz", subject: "Physics", timeSpent: 40 }
      ]
    },
    {
      id: "a2",
      date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      activities: [
        { type: "concept", title: "Vedic Period", subject: "History", timeSpent: 32 },
        { type: "flashcard", title: "Math Formulas", subject: "Mathematics", timeSpent: 20 }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-t-4 border-t-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-500" />
            Pending Backlogs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {backlogItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Subject</th>
                    <th className="text-left py-2">Task</th>
                    <th className="text-left py-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Time</span>
                      </div>
                    </th>
                    <th className="text-left py-2">Overdue</th>
                    <th className="text-right py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {backlogItems.map(item => (
                    <tr key={item.id}>
                      <td className="py-3">{item.subject}</td>
                      <td className="py-3">{item.title}</td>
                      <td className="py-3">{item.timeEstimate} min</td>
                      <td className="py-3">
                        <Badge variant={item.daysOverdue > 1 ? 'destructive' : 'outline'} className="font-normal">
                          {item.daysOverdue} {item.daysOverdue === 1 ? 'day' : 'days'}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Link to={item.path}>
                          <Button size="sm" variant="ghost">
                            Complete Now
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <p className="font-medium">No pending backlogs!</p>
              <p className="text-muted-foreground text-sm mt-1">You're all caught up with your tasks.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-muted-foreground">Total pending: {backlogItems.length} tasks</p>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-1" />
              Manage Backlogs
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-500" />
            Recent Study History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activityHistory.map(day => (
              <div key={day.id} className="space-y-2">
                <h3 className="text-sm font-medium">
                  {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </h3>
                <div className="space-y-2">
                  {day.activities.map((activity, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.subject} • {activity.type}</p>
                      </div>
                      <Badge variant="outline">{activity.timeSpent} min</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-muted-foreground">Total activities: 5</p>
            <Link to="/dashboard/student/history">
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-1" />
                Full History
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
