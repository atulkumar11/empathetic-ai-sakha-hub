
export interface Joke {
  id: number;
  content: string;
  likes: number;
  author: string;
}

export interface BrainTeaser {
  id: number;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
}
