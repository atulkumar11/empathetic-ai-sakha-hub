
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, BookOpen, Clock, Calendar, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const StudyPlanPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Sample study plan data - this would come from an API in a real app
  const studyPlanEvents = [
    { id: 1, date: new Date(), subject: "Physics", topic: "Kinematics", duration: 60 },
    { id: 2, date: new Date(), subject: "Chemistry", topic: "Chemical Bonding", duration: 45 },
    { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 1)), subject: "Mathematics", topic: "Calculus", duration: 90 },
    { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 2)), subject: "Biology", topic: "Cell Structure", duration: 60 },
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = studyPlanEvents.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );
  
  return (
    <SharedPageLayout 
      title="Complete Study Plan"
      subtitle="Your comprehensive study schedule for exam preparation"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Study Calendar
            </h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{event.subject}</h4>
                        <p className="text-sm text-muted-foreground">{event.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.duration} min
                      </div>
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-1" /> Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  No study sessions scheduled for this date
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Overall Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Subjects Completed</div>
                <div className="text-2xl font-bold">3/8</div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '37.5%' }} />
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Hours Studied</div>
                <div className="text-2xl font-bold">24/120</div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Days Remaining</div>
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs text-muted-foreground">Until exam day</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
