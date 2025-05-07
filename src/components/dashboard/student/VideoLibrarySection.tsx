
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, BookOpen, Filter, Search, CheckCircle, Star } from "lucide-react";

export const VideoLibrarySection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const videoCategories = [
    { id: "all", label: "All Videos" },
    { id: "lectures", label: "Lectures" },
    { id: "practicals", label: "Practicals & Demos" },
    { id: "shortcuts", label: "Tips & Shortcuts" },
    { id: "solved", label: "Solved Problems" }
  ];

  const videos = [
    {
      id: 1,
      title: "Understanding Newton's Laws of Motion",
      subject: "Physics",
      topic: "Classical Mechanics",
      duration: "32 min",
      views: 1420,
      rating: 4.8,
      instructor: "Dr. Priya Sharma",
      thumbnail: "https://picsum.photos/seed/physics1/300/200",
      category: "lectures",
      watched: true
    },
    {
      id: 2,
      title: "Organic Chemistry: Alcohol Reactions",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      duration: "45 min",
      views: 890,
      rating: 4.6,
      instructor: "Prof. Rajesh Kumar",
      thumbnail: "https://picsum.photos/seed/chem1/300/200",
      category: "lectures",
      watched: false
    },
    {
      id: 3,
      title: "Cell Division Demonstration with 3D Models",
      subject: "Biology",
      topic: "Cell Biology",
      duration: "28 min",
      views: 1250,
      rating: 4.9,
      instructor: "Dr. Meera Desai",
      thumbnail: "https://picsum.photos/seed/bio1/300/200",
      category: "practicals",
      watched: true
    },
    {
      id: 4,
      title: "Integration Techniques for JEE Advanced",
      subject: "Mathematics",
      topic: "Calculus",
      duration: "52 min",
      views: 2340,
      rating: 4.7,
      instructor: "Prof. Sunil Verma",
      thumbnail: "https://picsum.photos/seed/math1/300/200",
      category: "solved",
      watched: false
    },
    {
      id: 5,
      title: "Quick Tricks to Solve Kinematics Problems",
      subject: "Physics",
      topic: "Mechanics",
      duration: "18 min",
      views: 3650,
      rating: 4.9,
      instructor: "Dr. Priya Sharma",
      thumbnail: "https://picsum.photos/seed/physics2/300/200",
      category: "shortcuts",
      watched: false
    },
    {
      id: 6,
      title: "DNA Extraction Lab Demonstration",
      subject: "Biology",
      topic: "Molecular Biology",
      duration: "24 min",
      views: 980,
      rating: 4.5,
      instructor: "Dr. Meera Desai",
      thumbnail: "https://picsum.photos/seed/bio2/300/200",
      category: "practicals",
      watched: true
    }
  ];

  // Filter videos based on active tab and search term
  const filteredVideos = videos.filter(video => 
    (activeTab === "all" || video.category === activeTab) &&
    (video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     video.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     video.topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const CustomSearchInput = ({ 
    value, 
    onChange, 
    placeholder,
    className
  }: { 
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className: string;
  }) => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className={`pl-9 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Video Library</h2>
        <p className="text-muted-foreground">Access high-quality educational videos tailored to your exam</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <CustomSearchInput
          placeholder="Search videos by title, subject, or topic..."
          className="w-full sm:max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full overflow-x-auto flex whitespace-nowrap justify-start tab-scrollbar py-1">
          {videoCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="px-4"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="rounded-full bg-white hover:bg-white/90">
                        <PlayCircle className="h-8 w-8 text-violet-600 fill-white" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">
                      <Clock className="h-3 w-3 mr-1" /> {video.duration}
                    </Badge>
                    {video.watched && (
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1 text-violet-400" /> Watched
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-purple-50">
                        {video.subject}
                      </Badge>
                      <div className="flex items-center text-amber-500 text-sm">
                        <Star className="fill-amber-500 h-3 w-3 mr-1" />
                        <span>{video.rating}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">{video.topic}</p>
                    <p className="text-sm text-muted-foreground">{video.instructor}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600">
                      <PlayCircle className="mr-2 h-4 w-4" /> Watch Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 text-violet-500">
                <BookOpen size={48} className="mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-medium mb-2">No videos found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button variant="outline">Reset Filters</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
