import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GroupSetupFormData } from './batch/types';
import PlanSummaryCard from './group-plan/PlanSummaryCard';
import BatchNameInput from './group-plan/BatchNameInput';
import EmailInviteSection from './group-plan/EmailInviteSection';
import InvitationCodeSection from './group-plan/InvitationCodeSection';

interface Plan {
  id: string;
  name: string;
  price: number;
  userCount?: number;
  planType?: 'group' | 'school' | 'corporate';
}

interface GroupPlanInviteModalProps {
  plan: Plan;
  onClose: () => void;
  onComplete: (emails: string[], inviteCodes: string[], batchName: string, roleType: string) => void;
}

const GroupPlanInviteModal = ({ plan, onClose, onComplete }: GroupPlanInviteModalProps) => {
  const getMaxUsers = () => plan.userCount || 5;

  const [formData, setFormData] = useState<GroupSetupFormData>({
    batchName: '',
    roleType: 'batch_leader',
    inviteMethod: 'email',
    emails: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [inviteCodes] = useState<string[]>(
    Array(getMaxUsers()).fill(0).map(() => 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase())
  );

  const handleSubmit = () => {
    if (!formData.batchName.trim()) {
      toast({
        title: "Batch Name Required",
        description: "Please enter a name for your batch",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onComplete(
        formData.emails,
        inviteCodes.slice(0, Math.max(formData.emails.length, 1)),
        formData.batchName,
        formData.roleType
      );
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Set Up Your {plan.planType === 'school' ? 'School' : plan.planType === 'corporate' ? 'Corporate' : 'Group'} Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <PlanSummaryCard plan={plan} maxUsers={getMaxUsers()} />

          <div className="space-y-4">
            <BatchNameInput 
              batchName={formData.batchName}
              onChange={(value) => setFormData(prev => ({ ...prev, batchName: value }))}
            />

            <Tabs value={formData.inviteMethod} onValueChange={(v) => setFormData(prev => ({ ...prev, inviteMethod: v as 'email' | 'code' }))}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Invite by Email
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Manage Access Codes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <EmailInviteSection
                  emails={formData.emails}
                  maxInvites={getMaxUsers() - 1}
                  onAddEmail={(email) => setFormData(prev => ({ ...prev, emails: [...prev.emails, email] }))}
                  onRemoveEmail={(email) => setFormData(prev => ({ ...prev, emails: prev.emails.filter(e => e !== email) }))}
                />
              </TabsContent>

              <TabsContent value="code">
                <InvitationCodeSection codes={inviteCodes} maxInvites={getMaxUsers()} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex items-start space-x-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              You'll be able to invite more members and manage your batch after completing the payment process.
              Access codes will be activated once payment is confirmed.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.batchName.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupPlanInviteModal;
