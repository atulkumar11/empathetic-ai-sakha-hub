
export interface BatchDetails {
  id: string;
  name: string;
  planType: string;
  maxMembers: number;
  leader: BatchMember;
  members: BatchMember[];
  createdAt: string;
  expiryDate: string;
}

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'leader' | 'member' | 'school_admin' | 'corporate_admin';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
  };
}

export interface BatchInvitation {
  id: string;
  email: string;
  code: string;
  expires: string;
  used: boolean;
}
