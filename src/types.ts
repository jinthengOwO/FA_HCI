/**
 * Type declarations for SkillSwap QIU Student Skill Exchange Platform.
 */

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  course: string;
  year: number;
  rating: number;
  reviewCount: number;
  bio: string;
  skillsTaught: { skill: string; level: SkillLevel }[];
  skillsWanted: string[];
  availability: {
    days: string[];
    slots: string[];
  };
  portfolio: {
    title: string;
    description: string;
    image: string;
    link?: string;
  }[];
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  tutorId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  sessionType: 'Online' | 'Physical';
  skillName: string;
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  skillName: string;
  date: string;
  timeSlot: string;
  sessionType: 'Online' | 'Physical';
  notes?: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  meetingLink?: string;
  location?: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorCourse: string;
  category: 'Request' | 'Guidance' | 'General' | 'Resource';
  title: string;
  content: string;
  tags: string[];
  likes: number;
  likedByUser?: boolean;
  comments: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    date: string;
  }[];
  date: string;
}

export interface Message {
  id: string;
  senderId: string; // 'current_user' or the tutor's ID
  text: string;
  timestamp: string;
  file?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ChatSession {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorCourse: string;
  online: boolean;
  messages: Message[];
  unread?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number; // 0 to 100
  category: 'Teaching' | 'Learning' | 'Community' | 'Profile';
}

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'booking' | 'chat' | 'badge' | 'system' | 'community';
}
