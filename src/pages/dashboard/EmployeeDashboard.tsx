
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, LineChart, MessageSquare } from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole, SubscriptionType } from "@/types/user/base";

const EmployeeDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUserProfile(UserRole.Employee);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Employee);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back, Professional!",
        description: "Your dashboard is ready.",
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
      title: "24/7 Job Advisor",
      description: "Get instant help with work challenges, emails, presentations, and more.",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/employee/advisor",
      isPremium: false,
    },
    {
      title: "Productivity Tracker",
      description: "Monitor your productivity patterns and get AI-powered insights to optimize your workflow.",
      icon: <LineChart size={20} />,
      path: "/dashboard/employee/productivity",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    },
    {
      title: "Career Guide",
      description: "Build your resume, practice interviews, and plan your career growth path.",
      icon: <Briefcase size={20} />,
      path: "/dashboard/employee/career",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    },
    {
      title: "Training Modules",
      description: "Access personalized learning paths to build skills relevant to your career goals.",
      icon: <Calendar size={20} />,
      path: "/dashboard/employee/training",
      isPremium: userProfile.subscription !== SubscriptionType.Premium,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
      <SidebarNav userType="employee" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-gray-600">Here's an overview of your work and well-being</p>
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
        
        <h2 className="text-2xl font-semibold mb-4">Your Productivity Suite</h2>
        
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
              <span>Job Advisor</span>
            </TabsTrigger>
            <TabsTrigger value="productivity" className="flex items-center gap-2">
              <LineChart size={16} />
              <span>Productivity</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Career</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Training</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="advisor">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <MessageSquare size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">24/7 Job Advisor</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Need help with a work challenge? Want feedback on an email or presentation?
                Your AI job advisor is ready to assist you with any professional questions.
              </p>
              <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                Start Advisor Session
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="productivity">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <LineChart size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Productivity Insights</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Track your work habits, analyze focus patterns, and get AI recommendations
                to optimize your productivity and work-life balance.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  View Productivity Dashboard
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="career">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <Briefcase size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Career Development</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Build your professional profile, practice interviews, and chart your 
                career growth path with AI-powered guidance.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  Explore Career Tools
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto gap-2">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="training">
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <Calendar size={64} className="mx-auto text-sakha-blue mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Training & Development</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Access personalized learning paths based on your interests and career goals,
                with bite-sized modules and hands-on projects.
              </p>
              {userProfile.subscription === SubscriptionType.Premium ? (
                <button className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-6 py-3 rounded-lg font-medium">
                  Browse Training Modules
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
      
      <ChatAssistant userType="employee" />
    </div>
  );
};

export default EmployeeDashboard;
