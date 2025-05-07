
export interface BatchMemberInvite {
  name: string;
  email: string;
  phone?: string;
}

export interface BatchCreationData {
  batchName: string;
  examGoal: string;
  targetYear: number;
  allowProgressVisibility: boolean;
  allowLeadershipTransfer: boolean;
  invites: BatchMemberInvite[];
}
