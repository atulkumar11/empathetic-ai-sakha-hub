
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookText, Calendar, LineChart, MessageSquare } from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole, SubscriptionType } from "@/types/user/base";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUserProfile(UserRole.Doctor);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Doctor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back, Doctor!",
        description: "Your research dashboard is ready.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
        <div className="text-center">
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="w-16 h-16 mx-auto animate-pulse mb-4" 
          />
          <h2 className="text-xl font-medium mb-2">Loading your dashboard...</h2>
          <p className="text-gray-500">Personalizing your experience</p>
        </div>
      </div>
    );
  }
  
  const features = [
    {
      title: "Research Hub",
      description: "Get instant help with research questions, literature reviews, and methodology design.",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/doctor/research",
      isPremium: false,
    },
    {
      title: "Thesis Planner",
      description: "Plan, organize, and track your research project with AI-powered guidance.",
      icon: <Calendar size={20} />,
      path: "/dashboard/doctor/thesis",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    },
    {
      title: "Literature Assistant",
      description: "Organize and analyze research papers, find key insights, and manage citations.",
      icon: <BookOpen size={20} />,
      path: "/dashboard/doctor/literature",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    },
    {
      title: "Publications Tracker",
      description: "Track your publications, citations, and research impact metrics.",
      icon: <BookText size={20} />,
      path: "/dashboard/doctor/publications",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
      <SidebarNav userType="doctor" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-gray-600">Here's an overview of your research progress</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map(kpi => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
          </div>
          <div>
            <ProfileCard profile={userProfile} />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Your Research Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              path={feature.path}
              isPremium={feature.isPremium}
              userSubscription={userProfile.subscription}
            />
          ))}
        </div>
        
        <Tabs defaultValue="research" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="research" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Research Hub</span>
            </TabsTrigger>
            <TabsTrigger value="thesis" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Thesis Planner</span>
            </TabsTrigger>
            <TabsTrigger value="literature" className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Literature</span>
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <LineChart size={16} />
              <span>Publications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="research">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <MessageSquare size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Research Hub</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Get instant help with research questions, methodology design, statistical analysis,
                and more from your AI research companion.
              </p>
              <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                Start Research Session
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="thesis">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <Calendar size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Thesis Planner</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Plan, organize, and track your research project with milestone tracking,
                progress analysis, and AI-powered guidance.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  View Thesis Planner
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="literature">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <BookOpen size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Literature Assistant</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Find, organize, and analyze research papers with AI-powered summaries,
                key insight extraction, and citation management.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  Access Literature Tools
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="publications">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <LineChart size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Publications Tracker</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Track your publications, citations, and research impact metrics
                with automated updates and analysis.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  View Publication Analytics
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatAssistant userType="doctor" />
    </div>
  );
};

export default DoctorDashboard;
