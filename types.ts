
export interface UserProfile {
  name: string;
  email: string;
  gpa: string;
  fieldOfStudy: string;
  targetCountry: string;
  budget: string;
  examScores: {
    ielts?: string;
    toefl?: string;
    gre?: string;
  };
}

export interface University {
  id: string;
  name: string;
  location: string;
  rank: number;
  programs: string[];
  category: 'Safe' | 'Moderate' | 'Reach';
  fee: string;
  matchScore: number;
}

export interface Application {
  id: string;
  universityName: string;
  program: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  deadline: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface DocumentInfo {
  id: string;
  type: 'SOP' | 'LOR' | 'Transcript' | 'CV';
  status: 'Pending' | 'Reviewed' | 'Needs Revision';
  lastUpdated: string;
}
