
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Bookmark, PenLine, Share2, Volume2, VolumeX } from "lucide-react";
import { cn } from '@/lib/utils';

// Mock concept data
const mockConcept = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "Medium",
  tags: ["Force", "Motion", "Classical Mechanics"],
  simpleExplanation: "Newton's Laws of Motion describe the relationship between an object and the forces acting upon it. The first law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. The second law explains that force equals mass times acceleration (F = ma). The third law states that for every action, there is an equal and opposite reaction.",
  detailedExplanation: "Sir Isaac Newton's three laws of motion, published in his 'Principia Mathematica' in 1687, form the foundation of classical mechanics. These laws describe the relationship between the motion of an object and the forces acting on it.\n\nFirst Law (Law of Inertia): An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This property is called inertia. In mathematical terms, when the net force on an object is zero (∑F = 0), the object will maintain its velocity.\n\nSecond Law (F = ma): The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration.\n\nThird Law (Action-Reaction): For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object. Mathematically: F₁₂ = -F₂₁.",
  examples: [
    {
      title: "Rocket Propulsion",
      description: "When a rocket expels gas downward (action), the rocket experiences an upward force (reaction), propelling it into space according to Newton's Third Law."
    },
    {
      title: "Car Acceleration",
      description: "When you press the accelerator in a car, the engine applies more force, resulting in greater acceleration according to F = ma (Second Law)."
    },
    {
      title: "Book on Table",
      description: "A book resting on a table experiences two forces: gravity pulling it down and the normal force from the table pushing up. These forces balance out (∑F = 0), keeping the book at rest (First Law)."
    }
  ],
  diagramAnalysis: [
    {
      title: "Force Diagram for First Law",
      imageUrl: "https://example.com/first-law-diagram.png",
      description: "This diagram shows an object at rest with balanced forces (∑F = 0)."
    },
    {
      title: "Force Diagram for Second Law",
      imageUrl: "https://example.com/second-law-diagram.png",
      description: "This diagram illustrates how unbalanced forces lead to acceleration proportional to F/m."
    },
    {
      title: "Force Diagram for Third Law",
      imageUrl: "https://example.com/third-law-diagram.png",
      description: "This diagram demonstrates equal and opposite forces in action-reaction pairs."
    }
  ],
  realWorldApplications: "Newton's Laws have countless real-world applications, from designing vehicles to planning space missions. Engineers use these principles to calculate the forces needed for rockets to escape Earth's gravity. In sports, understanding these laws helps athletes optimize their movements—like a swimmer pushing off the wall or a basketball player shooting. Even everyday activities like walking rely on these laws: you push backward on the ground (action), and the ground pushes you forward (reaction), allowing you to move.",
  examRelevance: "Newton's Laws appear frequently in physics exams at all levels. Key exam topics include:\n\n- Free-body diagrams and force analysis\n- Calculating acceleration using F = ma\n- Identifying action-reaction pairs\n- Applying the laws to complex systems like pulleys and inclined planes\n- Conceptual questions about inertia and equilibrium\n\nExam tip: When solving problems, always start by drawing a free-body diagram showing all forces acting on the object.",
  commonMistakes: [
    "Confusing 'no force' with 'no motion' in the First Law. Objects can move at constant velocity when forces are balanced, not just when there's no force.",
    "Forgetting that acceleration is a vector quantity in F = ma. Direction matters!",
    "Misidentifying action-reaction pairs. Remember, action-reaction forces act on different objects, not on the same object.",
    "Ignoring friction in calculations, leading to idealized results that don't match real-world observations.",
    "Assuming that the larger or more massive object exerts a greater force in an interaction. According to the Third Law, both forces are equal in magnitude."
  ],
  videoUrl: "https://example.com/newtons-laws-video",
  relatedConcepts: [
    { id: "c2", title: "Conservation of Momentum" },
    { id: "c3", title: "Circular Motion" },
    { id: "c4", title: "Work and Energy" },
    { id: "c5", title: "Friction Forces" }
  ]
};

export default function ConceptStudyPage() {
  const { conceptId } = useParams<{conceptId: string}>();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  
  // Voice reading functionality (mock implementation)
  const toggleVoiceReading = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would start or stop text-to-speech
  };
  
  // Bookmark functionality
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real implementation, this would save to the user's bookmarks
  };
  
  const concept = mockConcept; // In a real app, this would fetch based on conceptId
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back button and header */}
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/dashboard/student/concepts">&larr; Back to Concepts</Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{concept.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{concept.subject}</Badge>
              <Badge variant="outline">{concept.topic}</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {concept.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleVoiceReading} className="flex items-center gap-1">
              {isVoiceActive ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isVoiceActive ? 'Stop' : 'Read Aloud'}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleBookmark} className="flex items-center gap-1">
              <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-current" : "")} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              <Tabs defaultValue="simple" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start p-2 bg-muted/50 rounded-t-lg overflow-x-auto flex-nowrap">
                  <TabsTrigger value="simple" className="whitespace-nowrap">Simple Explanation</TabsTrigger>
                  <TabsTrigger value="detailed" className="whitespace-nowrap">Detailed Explanation</TabsTrigger>
                  <TabsTrigger value="examples" className="whitespace-nowrap">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams" className="whitespace-nowrap">Diagram Analysis</TabsTrigger>
                  <TabsTrigger value="real-world" className="whitespace-nowrap">Real-World Applications</TabsTrigger>
                  <TabsTrigger value="exam" className="whitespace-nowrap">Exam Relevance</TabsTrigger>
                  <TabsTrigger value="mistakes" className="whitespace-nowrap">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="video" className="whitespace-nowrap">Video Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Simple Explanation</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.simpleExplanation}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Detailed Explanation</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    {concept.detailedExplanation.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Examples with Walkthrough</h2>
                  <div className="space-y-6">
                    {concept.examples.map((example, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-2">{example.title}</h3>
                        <p>{example.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="diagrams" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Diagram-Based Analysis</h2>
                  <div className="space-y-8">
                    {concept.diagramAnalysis.map((diagram, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-200 dark:bg-gray-800 h-48 flex items-center justify-center">
                          <p className="text-muted-foreground">Diagram placeholder</p>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg">{diagram.title}</h3>
                          <p className="text-sm mt-2">{diagram.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="real-world" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Real-World Applications</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.realWorldApplications}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="exam" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Exam Relevance</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    {concept.examRelevance.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="mistakes" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Common Mistakes</h2>
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-3 rounded-lg text-red-800 dark:text-red-300">
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="video" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Video Analysis</h2>
                  <div className="bg-gray-200 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Video player placeholder</p>
                  </div>
                  <div className="mt-4 prose max-w-none dark:prose-invert">
                    <p>This video provides a visual explanation of Newton's Laws of Motion, with animations and real-world examples.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <Button variant="outline" size="sm" onClick={() => setNotesOpen(!notesOpen)}>
              <PenLine className="h-4 w-4 mr-1" />
              {notesOpen ? "Close Notes" : "Add Notes"}
            </Button>
          </div>
          
          {notesOpen && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <textarea 
                  className="w-full h-32 p-3 border rounded-md bg-background resize-none" 
                  placeholder="Write your notes here..."
                />
                <div className="mt-3 flex justify-end">
                  <Button size="sm">Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                Related Concepts
              </h2>
              <div className="space-y-3">
                {concept.relatedConcepts.map((related) => (
                  <Link 
                    key={related.id}
                    to={`/dashboard/student/concepts/card/${related.id}`}
                    className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    {related.title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Concept Tags</h2>
              <div className="flex flex-wrap gap-2">
                {concept.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Study Progress</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2 w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Time Spent</span>
                    <span>45 min</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-amber-500 rounded-full h-2 w-1/2"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz Score</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2 w-[85%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">Take Practice Quiz</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
