
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Star, Calendar, Clock, BookOpen, Users } from "lucide-react";

export const LiveTutorSection = () => {
  const [activeTab, setActiveTab] = useState("available");

  const tutors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      avatar: "PS",
      subject: "Physics",
      specialization: "Quantum Mechanics, Electromagnetism",
      experience: "10+ years teaching at IIT",
      rating: 4.9,
      price: "₹1200/hour",
      availability: "Available now",
      nextSlot: null
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      avatar: "RK",
      subject: "Mathematics",
      specialization: "Calculus, Linear Algebra",
      experience: "15 years at Delhi University",
      rating: 4.8,
      price: "₹1000/hour",
      availability: null,
      nextSlot: "Tomorrow, 3 PM"
    },
    {
      id: 3,
      name: "Dr. Meera Desai",
      avatar: "MD",
      subject: "Biology",
      specialization: "Human Physiology, Cell Biology",
      experience: "12 years at AIIMS",
      rating: 4.7,
      price: "₹1100/hour",
      availability: "Available now",
      nextSlot: null
    },
    {
      id: 4,
      name: "Prof. Sunil Verma",
      avatar: "SV",
      subject: "Chemistry",
      specialization: "Organic Chemistry, Biochemistry",
      experience: "8 years at Manipal University",
      rating: 4.6,
      price: "₹900/hour",
      availability: null,
      nextSlot: "Today, 8 PM"
    }
  ];

  // Filter tutors based on active tab
  const filteredTutors = tutors.filter(tutor => 
    activeTab === "available" ? tutor.availability : !tutor.availability
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Live Tutors</h2>
        <p className="text-muted-foreground">Connect with expert tutors for personalized help with your questions</p>
      </div>

      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map(tutor => (
                <Card key={tutor.id} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${tutor.name}`} />
                          <AvatarFallback>{tutor.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{tutor.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                            {tutor.subject}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="fill-amber-500 h-4 w-4" />
                        <span>{tutor.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Specialization</div>
                      <div className="text-sm text-muted-foreground">{tutor.specialization}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Experience</div>
                      <div className="text-sm text-muted-foreground">{tutor.experience}</div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="font-medium">{tutor.price}</div>
                      {tutor.availability ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          Available Now
                        </Badge>
                      ) : (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{tutor.nextSlot}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${tutor.availability ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'variant-outline'}`}
                    >
                      {tutor.availability ? (
                        <>
                          <Video className="mr-2 h-4 w-4" /> Join Live Session
                        </>
                      ) : (
                        <>
                          <Clock className="mr-2 h-4 w-4" /> Book Session
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 text-violet-500">
                <Users size={48} className="mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tutors available at the moment</h3>
              <p className="text-muted-foreground mb-6">Check back later or book an upcoming session</p>
              <Button variant="outline">View All Tutors</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="mt-8 border-dashed border-2 border-violet-200 bg-violet-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-500" />
            Create a New Query
          </CardTitle>
          <CardDescription>
            Prepare your question in advance for efficient tutoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium text-sm mb-2">Subject Area</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Physics", "Chemistry", "Biology", "Mathematics", "History", "Geography", "Economics", "English"].map(subject => (
                  <Badge key={subject} variant="outline" className="cursor-pointer py-1 px-3">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <Button className="w-full">Prepare New Query</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
