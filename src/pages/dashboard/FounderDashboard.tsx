
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, LineChart, MessageSquare, PieChart } from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole, SubscriptionType } from "@/types/user/base";

const FounderDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUserProfile(UserRole.Founder);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Founder);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back, Founder!",
        description: "Your startup dashboard is ready.",
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
      title: "Startup Advisor",
      description: "Get instant answers and guidance on all aspects of building your startup.",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/founder/advisor",
      isPremium: false,
    },
    {
      title: "MVP Builder",
      description: "Plan, design, and track your minimum viable product with AI assistance.",
      icon: <Code size={20} />,
      path: "/dashboard/founder/mvp",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    },
    {
      title: "Pitch Deck Creator",
      description: "Create and refine your investor pitch deck with AI-powered guidance.",
      icon: <PieChart size={20} />,
      path: "/dashboard/founder/pitch",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    },
    {
      title: "Startup Metrics",
      description: "Track key performance metrics for your startup and get insights.",
      icon: <LineChart size={20} />,
      path: "/dashboard/founder/metrics",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
      <SidebarNav userType="founder" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-gray-600">Here's an overview of your startup progress</p>
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
        
        <h2 className="text-2xl font-semibold mb-4">Your Startup Tools</h2>
        
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
        
        <Tabs defaultValue="advisor" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="advisor" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Startup Advisor</span>
            </TabsTrigger>
            <TabsTrigger value="mvp" className="flex items-center gap-2">
              <Code size={16} />
              <span>MVP Builder</span>
            </TabsTrigger>
            <TabsTrigger value="pitch" className="flex items-center gap-2">
              <PieChart size={16} />
              <span>Pitch Deck</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <LineChart size={16} />
              <span>Metrics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="advisor">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <MessageSquare size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Startup Advisor</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Get instant answers on business strategy, fundraising, legal questions,
                marketing, and more from your AI startup advisor.
              </p>
              <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                Start Advisory Session
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="mvp">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <Code size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">MVP Builder</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Plan, design, and track your minimum viable product with feature prioritization,
                resource allocation, and development timeline assistance.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  Open MVP Builder
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pitch">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <PieChart size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Pitch Deck Creator</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Create compelling pitch decks with AI-powered content generation,
                slide design suggestions, and presentation coaching.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  Build Your Pitch Deck
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <LineChart size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Startup Metrics</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Track key performance indicators for your startup, analyze trends,
                and get AI insights on improving your metrics.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  View Metrics Dashboard
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
      
      <ChatAssistant userType="founder" />
    </div>
  );
};

export default FounderDashboard;
