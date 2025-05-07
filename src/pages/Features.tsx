
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Briefcase, Stethoscope, Rocket, MessageSquare, Calendar, PencilRuler, HeartPulse, LineChart, BookOpen, Brain } from "lucide-react";

const Features = () => {
  const userRoles = [
    {
      id: "student",
      icon: <Book size={24} />,
      title: "Students",
    },
    {
      id: "employee",
      icon: <Briefcase size={24} />,
      title: "Employees",
    },
    {
      id: "doctor",
      icon: <Stethoscope size={24} />,
      title: "Doctors & Researchers",
    },
    {
      id: "founder",
      icon: <Rocket size={24} />,
      title: "Founders",
    }
  ];
  
  const roleFeatures = {
    student: [
      {
        icon: <MessageSquare size={36} className="text-sakha-blue" />,
        title: "24/7 Tutor",
        description: "Get instant help with any subject, from math problems to essay writing, anytime you need it."
      },
      {
        icon: <Calendar size={36} className="text-sakha-blue" />,
        title: "Academic Advisor",
        description: "Custom study plans based on your exams, interests, and available time."
      },
      {
        icon: <HeartPulse size={36} className="text-sakha-blue" />,
        title: "Motivation Coach",
        description: "Daily nudges, habit tracking, and mood logs to keep you motivated and focused."
      },
      {
        icon: <BookOpen size={36} className="text-sakha-blue" />,
        title: "Memory Skills",
        description: "Flashcards, spaced repetition, and memory games to help you retain information better."
      },
      {
        icon: <Brain size={36} className="text-sakha-blue" />,
        title: "Practice Exams",
        description: "Topic-wise & subject-wise mock tests with rewards and improvement suggestions."
      },
      {
        icon: <PencilRuler size={36} className="text-sakha-blue" />,
        title: "MVP Builder",
        description: "Build your own projects with step-by-step guidance from idea to execution."
      }
    ],
    employee: [
      {
        icon: <MessageSquare size={36} className="text-sakha-blue" />,
        title: "24/7 Job Advisor",
        description: "Get guidance on workplace challenges, career decisions, and skill development anytime."
      },
      {
        icon: <LineChart size={36} className="text-sakha-blue" />,
        title: "Productivity Tracker",
        description: "Track your focus sessions, work logs, and get smart feedback to improve productivity."
      },
      {
        icon: <HeartPulse size={36} className="text-sakha-blue" />,
        title: "Wellness Assistant",
        description: "Monitor stress levels, receive wellness tips, and practice self-care activities."
      },
      {
        icon: <Brain size={36} className="text-sakha-blue" />,
        title: "Training Modules",
        description: "Personalized skill development paths with progress tracking and micro-certifications."
      },
      {
        icon: <Calendar size={36} className="text-sakha-blue" />,
        title: "Career Guide",
        description: "Resume building, interview preparation, and career path planning tools."
      },
      {
        icon: <PencilRuler size={36} className="text-sakha-blue" />,
        title: "Side Project Builder",
        description: "Development tools for building personal or professional side projects."
      }
    ],
    doctor: [
      {
        icon: <PencilRuler size={36} className="text-sakha-blue" />,
        title: "Thesis & Research Planner",
        description: "Organize your research journey from proposal to publication with milestone tracking."
      },
      {
        icon: <MessageSquare size={36} className="text-sakha-blue" />,
        title: "24/7 Research Advisor",
        description: "Get guidance on research methodology, structure, and referencing styles anytime."
      },
      {
        icon: <LineChart size={36} className="text-sakha-blue" />,
        title: "Performance Feedback",
        description: "Track productivity, writing progress, and research milestone achievements."
      },
      {
        icon: <Calendar size={36} className="text-sakha-blue" />,
        title: "Career Guide",
        description: "Find grants, publication opportunities, and build your researcher profile."
      },
      {
        icon: <HeartPulse size={36} className="text-sakha-blue" />,
        title: "Wellness Assistant",
        description: "Balance intensive research with self-care through burnout detection and wellness activities."
      },
      {
        icon: <Brain size={36} className="text-sakha-blue" />,
        title: "Literature Companion",
        description: "Organize research papers, generate summaries, and track your literature review progress."
      }
    ],
    founder: [
      {
        icon: <MessageSquare size={36} className="text-sakha-blue" />,
        title: "24/7 Startup Advisor",
        description: "Get guidance on business models, go-to-market strategies, and fundraising anytime."
      },
      {
        icon: <PencilRuler size={36} className="text-sakha-blue" />,
        title: "MVP Builder",
        description: "Validate ideas and build prototypes with structured frameworks and guidance."
      },
      {
        icon: <Briefcase size={36} className="text-sakha-blue" />,
        title: "Company Coach",
        description: "Tools for hiring, pitch deck creation, and company culture development."
      },
      {
        icon: <HeartPulse size={36} className="text-sakha-blue" />,
        title: "Founder Wellness",
        description: "Balance the intensity of startup life with wellness tracking and burnout prevention."
      },
      {
        icon: <Brain size={36} className="text-sakha-blue" />,
        title: "Skill Gap Analyzer",
        description: "Identify team skill gaps and get hiring recommendations based on your startup stage."
      },
      {
        icon: <LineChart size={36} className="text-sakha-blue" />,
        title: "Startup Dashboard",
        description: "Track KPIs, fundraising readiness, and goal achievement in one central dashboard."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
                Personalized Features for Every User
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Discover how Sakha AI adapts its features to support your specific role and goals.
              </p>
            </div>
          </div>
        </section>

        {/* Role-Based Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="student" className="space-y-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {userRoles.map((role) => (
                    <TabsTrigger 
                      key={role.id} 
                      value={role.id}
                      className="flex items-center gap-2 py-3"
                    >
                      {role.icon}
                      <span>{role.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.keys(roleFeatures).map((role) => (
                  <TabsContent key={role} value={role}>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center">
                      Sakha AI Features for {userRoles.find(r => r.id === role)?.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {roleFeatures[role as keyof typeof roleFeatures].map((feature, index) => (
                        <div 
                          key={index}
                          className="glass-card p-6 rounded-xl hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="mb-5 p-3 bg-sakha-lavender/10 inline-block rounded-lg">
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Feature Table Comparison */}
        <section className="py-16 bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold mb-10 text-center">Basic vs Premium Features</h2>
              
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-sakha-dark-blue text-white">
                      <th className="py-4 px-6 text-left">Feature</th>
                      <th className="py-4 px-6 text-center">Basic (Free)</th>
                      <th className="py-4 px-6 text-center bg-sakha-blue">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-medium">AI Conversations</td>
                      <td className="py-4 px-6 text-center">5 queries/day</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-medium">Personalized Dashboard</td>
                      <td className="py-4 px-6 text-center">Basic</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Advanced</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-medium">Role-specific Tools</td>
                      <td className="py-4 px-6 text-center">Limited</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Full Access</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-medium">Emotional Intelligence</td>
                      <td className="py-4 px-6 text-center">Basic</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Advanced</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-medium">Burnout Detection</td>
                      <td className="py-4 px-6 text-center">❌</td>
                      <td className="py-4 px-6 text-center bg-blue-50">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-medium">Analytics & Reports</td>
                      <td className="py-4 px-6 text-center">Limited</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Comprehensive</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium">Support</td>
                      <td className="py-4 px-6 text-center">Email Only</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Priority Access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10 flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                  size="lg"
                  asChild
                >
                  <Link to="/signup">Get Started with Sakha AI</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingAvatar />
    </div>
  );
};

export default Features;
