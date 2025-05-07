
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import BatchManagement from '@/components/subscription/BatchManagement';
import BatchDetails from '@/components/subscription/batch/BatchDetails';
import BatchInvitationInput from '@/components/subscription/BatchInvitationInput';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, ChartBar, Settings } from 'lucide-react';
import { BatchMember } from '@/components/subscription/batch/types';

export default function BatchManagementPage() {
  const {
    userProfile,
    loading,
    activeTab,
    showWelcomeTour,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    showStudyPlan,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();
  
  const [currentTab, setCurrentTab] = useState<'members' | 'analytics' | 'settings'>('members');
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batchInfo, setBatchInfo] = useState({
    name: 'My Study Group',
    planType: 'group' as const,
    maxMembers: 5,
    currentUserRole: 'leader' as "leader" | "member" | "school_admin" | "corporate_admin",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mock data initialization
    setTimeout(() => {
      const mockMembers: BatchMember[] = [
        {
          id: 'current-user-id',
          name: userProfile?.name || 'Current User',
          email: userProfile?.email || 'user@example.com',
          role: 'leader',
          status: 'active',
          joinedDate: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Raj Patel',
          email: 'raj.patel@example.com',
          role: 'member',
          status: 'active',
          joinedDate: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          role: 'member',
          status: 'pending',
          invitationCode: 'SAKHA-123456'
        }
      ];
      
      setBatchMembers(mockMembers);
      setIsLoading(false);
    }, 1000);
  }, [userProfile]);
  
  const handleAddMember = async (email: string): Promise<{ success: boolean; inviteCode?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inviteCode = 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const newMember: BatchMember = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          role: 'member',
          status: 'pending',
          invitationCode: inviteCode
        };
        
        setBatchMembers([...batchMembers, newMember]);
        resolve({ success: true, inviteCode });
      }, 1000);
    });
  };
  
  const handleRemoveMember = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setBatchMembers(batchMembers.filter(member => member.id !== id));
        resolve();
      }, 500);
    });
  };
  
  const handleChangeBatchName = async (name: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setBatchInfo({...batchInfo, name});
        resolve(true);
      }, 500);
    });
  };
  
  const handleTransferLeadership = async (memberId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedMembers = batchMembers.map(member => {
          if (member.id === memberId) {
            return {...member, role: 'leader'};
          }
          if (member.id === 'current-user-id') {
            return {...member, role: 'member'};
          }
          return member;
        });
        
        setBatchMembers(updatedMembers);
        
        toast({
          title: "Leadership Transferred",
          description: "You are no longer the batch leader",
        });
        
        setTimeout(() => {
          navigate('/dashboard/student/subscription');
        }, 3000);
        
        resolve();
      }, 1500);
    });
  };

  if (isLoading || !userProfile) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Batch Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Manage your batch members and settings
        </p>
        
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)}>
          <TabsList className="mb-6">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <UserCheck size={16} />
              Members
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <ChartBar size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <BatchManagement
              batchMembers={batchMembers}
              batchName={batchInfo.name}
              planType={batchInfo.planType}
              maxMembers={batchInfo.maxMembers}
              currentUserRole={batchInfo.currentUserRole}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
              onChangeBatchName={handleChangeBatchName}
              onTransferLeadership={handleTransferLeadership}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  This feature will be available soon. Track your batch's progress and engagement metrics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Additional settings for managing your batch will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <BatchDetails
            planType={batchInfo.planType}
            currentUserRole={batchInfo.currentUserRole}
          />
          
          <BatchInvitationInput
            onJoinBatch={async (code) => {
              toast({
                title: "Processing",
                description: "Verifying invitation code...",
              });
              
              await new Promise(resolve => setTimeout(resolve, 1500));
              
              toast({
                title: "Success!",
                description: "You've joined the batch successfully",
              });
              
              return;
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
