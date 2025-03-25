export interface Skill {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  level: string;
  duration: string;
  enrolled: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'documentation' | 'tutorial' | 'video' | 'article';
  tags: string[];
  source: 'github' | 'stackoverflow' | 'devto';
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: number;
  totalXP: number;
  skills: Skill[];
  badges: Badge[];
  enrolledCourses: string[];
  bio?: string;
  location?: string;
  github?: string;
  linkedin?: string;
}