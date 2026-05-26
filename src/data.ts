import { Tutor, ForumPost, ChatSession, AchievementBadge, Review, SystemNotification } from './types';

export const SKILL_CATEGORIES = [
  { id: 'prog', name: 'Programming', icon: 'Code', count: 24, color: 'from-blue-500 to-indigo-500' },
  { id: 'uiux', name: 'UI/UX Design', icon: 'Layers', count: 18, color: 'from-purple-500 to-pink-500' },
  { id: 'videdit', name: 'Video Editing', icon: 'Video', count: 15, color: 'from-red-500 to-orange-500' },
  { id: 'excel', name: 'Microsoft Excel', icon: 'FileSpreadsheet', count: 22, color: 'from-emerald-500 to-teal-500' },
  { id: 'pubspeak', name: 'Public Speaking', icon: 'Mic', count: 12, color: 'from-amber-500 to-yellow-500' },
  { id: 'photo', name: 'Photography', icon: 'Camera', count: 14, color: 'from-sky-500 to-blue-500' },
  { id: 'lang', name: 'Language Learning', icon: 'Languages', count: 19, color: 'from-pink-500 to-rose-500' },
  { id: 'canva', name: 'Canva Design', icon: 'Palette', count: 31, color: 'from-indigo-500 to-purple-500' },
  { id: 'ppt', name: 'PowerPoint Presentation', icon: 'Presentation', count: 16, color: 'from-violet-500 to-fuchsia-500' },
  { id: 'gdesign', name: 'Graphic Design', icon: 'Brush', count: 20, color: 'from-cyan-500 to-blue-500' }
];

export const TUTORS_DATA: Tutor[] = [
  {
    id: 't1',
    name: 'Alara Tan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.Sc. Cyber Security',
    year: 3,
    rating: 4.9,
    reviewCount: 28,
    bio: 'Cyber security major passionate about writing elegant React code and creating secure web architectures. I also help peers master Python algorithms for core exams.',
    skillsTaught: [
      { skill: 'Programming', level: 'Advanced' },
      { skill: 'UI/UX Design', level: 'Intermediate' }
    ],
    skillsWanted: ['Video Editing', 'German Language'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
    },
    portfolio: [
      { title: 'AuthShield Node Core', description: 'Simplified JWT and OAuth middleware for express engines.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=250' },
      { title: 'Interactive Cryptography Visualizer', description: 'Educational canvas representing RSA padding concepts.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: true
  },
  {
    id: 't2',
    name: 'Ethan Mercer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.A. Digital Media',
    year: 2,
    rating: 4.8,
    reviewCount: 19,
    bio: 'Freelance content creator and film enthusiast. I specialize in cinematic color grading in Premiere Pro and compiling high-engagement video timelines.',
    skillsTaught: [
      { skill: 'Video Editing', level: 'Advanced' },
      { skill: 'Photography', level: 'Intermediate' }
    ],
    skillsWanted: ['Microsoft Excel', 'Web Design'],
    availability: {
      days: ['Tuesday', 'Thursday'],
      slots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM']
    },
    portfolio: [
      { title: 'QIU Orientation Film 2025', description: 'Official campus teaser film highlighting fresher initiatives.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: true
  },
  {
    id: 't3',
    name: 'Chloe Kim',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.Sc. Business Analytics',
    year: 4,
    rating: 5.0,
    reviewCount: 35,
    bio: 'Excel wizard and systems analyst. If you are struggling with VLOOKUP, INDEX-MATCH, complex pivot tables, or macros, I can solve those hurdles with you!',
    skillsTaught: [
      { skill: 'Microsoft Excel', level: 'Advanced' },
      { skill: 'PowerPoint Presentation', level: 'Intermediate' }
    ],
    skillsWanted: ['Programming', 'UI/UX Design'],
    availability: {
      days: ['Wednesday', 'Thursday', 'Saturday'],
      slots: ['11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM']
    },
    portfolio: [
      { title: 'Campus Financial Model Generator', description: 'Automated Excel sheet for budget tracking utilizing dynamic formulas.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: true
  },
  {
    id: 't4',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.Sc. Interaction Design',
    year: 3,
    rating: 4.7,
    reviewCount: 14,
    bio: 'Figma superfan. I help students structure interactive prototypes, craft neat typography frameworks, and build component grids on modern standards.',
    skillsTaught: [
      { skill: 'UI/UX Design', level: 'Advanced' },
      { skill: 'Canva Design', level: 'Advanced' }
    ],
    skillsWanted: ['Public Speaking', 'Photography'],
    availability: {
      days: ['Monday', 'Tuesday', 'Friday'],
      slots: ['10:00 AM', '02:00 PM', '04:00 PM']
    },
    portfolio: [
      { title: 'SkillSwap UI Blueprint', description: 'Comprehensive design system of variables and dark theme presets.', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: false
  },
  {
    id: 't5',
    name: 'Sofia Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.A. International Relations',
    year: 2,
    rating: 4.9,
    reviewCount: 22,
    bio: 'Native Spanish speaker and debate champion. Teaching public speaking tips to tackle stage fright, structure arguments, and build a powerful delivery.',
    skillsTaught: [
      { skill: 'Public Speaking', level: 'Advanced' },
      { skill: 'Language Learning', level: 'Advanced' } // Spanish & English
    ],
    skillsWanted: ['Video Editing', 'Microsoft Excel'],
    availability: {
      days: ['Tuesday', 'Wednesday', 'Saturday'],
      slots: ['09:00 AM', '10:00 AM', '03:00 PM', '05:00 PM']
    },
    portfolio: [
      { title: 'TedX QIU Youth Talk', description: 'Overcoming Stage Fear with Conversational Breathwork.', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: false
  },
  {
    id: 't6',
    name: 'Linus Chen',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.Sc. Software Engineering',
    year: 3,
    rating: 4.6,
    reviewCount: 9,
    bio: 'Full-stack enthusiast specializing in TypeScript, Next.js, and DB design. I love explaining complex OOP or functional coding styles in simple blocks.',
    skillsTaught: [
      { skill: 'Programming', level: 'Advanced' },
      { skill: 'UI/UX Design', level: 'Intermediate' }
    ],
    skillsWanted: ['Photography', 'Canva Design'],
    availability: {
      days: ['Thursday', 'Friday'],
      slots: ['01:00 PM', '03:00 PM', '05:30 PM', '07:00 PM']
    },
    portfolio: [
      { title: 'PeerStudy Web Engine', description: 'Lightweight websocket chat module for remote study rooms.', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: false
  },
  {
    id: 't7',
    name: 'Amara Okafor',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200',
    course: 'B.Sc. Mechanical Engineering',
    year: 4,
    rating: 4.9,
    reviewCount: 16,
    bio: 'Photographer and videographer with a keen eye for framing, product modeling, and lighting. I can teach you the basics of ISO, shutter speed, and edit panels.',
    skillsTaught: [
      { skill: 'Photography', level: 'Advanced' },
      { skill: 'Graphic Design', level: 'Intermediate' }
    ],
    skillsWanted: ['PowerPoint Presentation', 'Programming'],
    availability: {
      days: ['Monday', 'Thursday'],
      slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM']
    },
    portfolio: [
      { title: 'Shadows & Angles Exhibition', description: 'Photo essay focusing on Brutalist architecture on QIU campus.', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400&h=250' }
    ],
    isFeatured: false
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    tutorId: 't1',
    reviewerName: 'Ethan Mercer',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    rating: 5,
    comment: 'Alara is an incredible teacher! She broken down binary search trees with concrete examples using college cafeteria logistics. Honestly best 1 hour I spent on algorithms!',
    date: 'May 12, 2026',
    sessionType: 'Online',
    skillName: 'Programming'
  },
  {
    id: 'r2',
    tutorId: 't1',
    reviewerName: 'Marcus Vance',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
    rating: 4,
    comment: 'Really helped me understand how encryption certificates hand off sessions. Minor audio issue at the start but we extended 10 mins to compensate.',
    date: 'May 04, 2026',
    sessionType: 'Online',
    skillName: 'Programming'
  },
  {
    id: 'r3',
    tutorId: 't3',
    reviewerName: 'Sofia Rodriguez',
    reviewerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100',
    rating: 5,
    comment: 'Chloe is literally a savior. I went from crying over error codes on Excel macros to automating my whole global trends spreadsheet. Absolute 5 stars!',
    date: 'May 20, 2026',
    sessionType: 'Physical',
    skillName: 'Microsoft Excel'
  }
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: 'p1',
    authorName: 'Hooi Jin Theng',
    authorAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100&h=100',
    authorCourse: 'B.Sc. Computer Science',
    category: 'Request',
    title: 'Urgent: Looking for someone to review my Canva slide deck structure!',
    content: 'Hi dynamic QIU folks! I am giving an interactive pitch for our Innovation Pitch Challenge tomorrow at 2 PM. I have built the core content in Canva, but I need feedback on typography scale and contrast alignment. Willing to exchange Python automation tutorials or database scaling guides in return! Please let me know if anyone has 30 free minutes tonight!',
    tags: ['Canva Design', 'PowerPoint Presentation', 'PitchFest'],
    likes: 12,
    likedByUser: false,
    comments: [
      {
        id: 'c1',
        authorName: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
        content: 'I got you! I am free around 8 PM tonight. I specialize in UI layout and contrast ratios. Drop me a chat request and we can look over it on Discord or online huddle!',
        date: 'May 25, 2026'
      }
    ],
    date: 'May 25, 2026'
  },
  {
    id: 'p2',
    authorName: 'Katarina Meyer',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
    authorCourse: 'B.A. Creative Writing',
    category: 'Resource',
    title: 'Check out these custom Figma layouts for fast Portfolio building',
    content: 'Hey everyone, I assembled a set of 5 wireframe layouts designed for student designers/writers that are perfectly aligned with free fonts on Google Fonts. It completely bypassed my anxiety on layout design blocks. Feel free to copy and use them! If you want feedback on your portfolio copy or wording, I can also review it during a peer session.',
    tags: ['UI/UX Design', 'Graphic Design', 'Portfolio'],
    likes: 24,
    likedByUser: true,
    comments: [],
    date: 'May 22, 2026'
  },
  {
    id: 'p3',
    authorName: 'Amara Okafor',
    authorAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100',
    authorCourse: 'B.Sc. Mechanical Engineering',
    category: 'General',
    title: 'HCI Design Principle Cheat Sheet for QIU Finals',
    content: 'Just put together a high-signal guide summarizing the core Human-Computer Interaction principles (Visibility, Feedback, Mapping, Affordances, Consistency, Constraints) mapped to practical front-end components. Useful for both CSE 312 students and UX learners. Let me know if you would like me to host an open exam prep board!',
    tags: ['UI/UX Design', 'HCI', 'StudyGuide'],
    likes: 31,
    likedByUser: false,
    comments: [
      {
        id: 'c2',
        authorName: 'Ethan Mercer',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
        content: 'Please host this study board! Navigating UX heuristics is so critical for my video design assignments.',
        date: 'May 23, 2026'
      }
    ],
    date: 'May 23, 2026'
  }
];

export const INITIAL_CHATS: ChatSession[] = [
  {
    id: 'ch1',
    tutorId: 't1',
    tutorName: 'Alara Tan',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
    tutorCourse: 'B.Sc. Cyber Security',
    online: true,
    messages: [
      { id: 'm1', senderId: 't1', text: 'Hey there! Thanks for reaching out. I would love to help you with Python recursion rules next week.', timestamp: 'May 25, 2:30 PM' },
      { id: 'm2', senderId: 'current_user', text: 'Awesome! That sounds perfect. I am struggling with understanding recursive call stacks.', timestamp: 'May 25, 2:40 PM' },
      { id: 'm3', senderId: 't1', text: 'Totally normal. We will draw it out physically or on an interactive online board. Wednesday works best for me!', timestamp: 'May 25, 2:42 PM' }
    ],
    unread: true
  },
  {
    id: 'ch2',
    tutorId: 't3',
    tutorName: 'Chloe Kim',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100',
    tutorCourse: 'B.Sc. Business Analytics',
    online: false,
    messages: [
      { id: 'm4', senderId: 'current_user', text: 'Hi Chloe, are you free for a physical Excel bootcamp tomorrow in the quiet study zone?', timestamp: 'May 24, 11:15 AM' },
      { id: 'm5', senderId: 't3', text: 'Hi! Yes, I am free at 2:00 PM tomorrow. Let is meet at Level 2 Pod B. Bring your laptop and any spreadsheet you are working on!', timestamp: 'May 24, 12:00 PM' },
      { id: 'm6', senderId: 'current_user', text: 'Perfect! See you there.', timestamp: 'May 24, 12:05 PM' }
    ]
  }
];

export const LEARNING_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach1',
    title: 'Knowledge Builder',
    description: 'Booked and attended your first academic peer session.',
    icon: 'BookOpen',
    unlockedAt: 'May 10, 2026',
    progress: 100,
    category: 'Learning'
  },
  {
    id: 'ach2',
    title: 'Rising Mentor',
    description: 'List 3 skills you teach and receive a 4.5+ star review.',
    icon: 'Star',
    progress: 66,
    category: 'Teaching'
  },
  {
    id: 'ach3',
    title: 'Community Pioneer',
    description: 'Create 2 forum requests or feedback posts.',
    icon: 'MessageSquare',
    unlockedAt: 'May 18, 2026',
    progress: 100,
    category: 'Community'
  },
  {
    id: 'ach4',
    title: 'Master Connector',
    description: 'Book sessions across 3 different skill categories.',
    icon: 'Network',
    progress: 33,
    category: 'Learning'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'n1',
    title: 'Session Scheduled Successfully',
    description: 'Your physical meeting with Chloe Kim is confirmed for Wed, 2:00 PM in Level 2 Pod B.',
    time: '2 hours ago',
    read: false,
    type: 'booking'
  },
  {
    id: 'n2',
    title: 'New Chat from Alara Tan',
    description: '“Wednesday works best for me!...”',
    time: '1 day ago',
    read: false,
    type: 'chat'
  },
  {
    id: 'n3',
    title: 'Unlocked Badge: Community Pioneer',
    description: 'You unlocked a new badge for sparking discussion in the requests channel!',
    time: '2 days ago',
    read: true,
    type: 'badge'
  }
];
