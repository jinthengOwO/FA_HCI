import React, { useState, useEffect } from 'react';
import { 
  X, Info, ArrowRight, Award, Compass, 
  Sparkles, Code, Users, MessageSquare 
} from 'lucide-react';

import { Tutor, Booking, ForumPost, ChatSession, AchievementBadge, SystemNotification, Message, Review } from './types';
import { 
  TUTORS_DATA, SKILL_CATEGORIES, FORUM_POSTS, 
  INITIAL_CHATS, LEARNING_ACHIEVEMENTS, INITIAL_NOTIFICATIONS, REVIEWS_DATA 
} from './data';

import Navbar from './components/Navbar';
import LandingView from './components/LandingView';
import ExploreView from './components/ExploreView';
import ProfileView from './components/ProfileView';
import BookingView from './components/BookingView';
import CommunityView from './components/CommunityView';
import ChatView from './components/ChatView';
import ReviewsView from './components/ReviewsView';
import DashboardView from './components/DashboardView';
import BecomeTutorView from './components/BecomeTutorView';

export default function App() {
  // Global States
  const [currentView, setView] = useState<string>('home');
  const [selectedTutorId, setSelectedTutorId] = useState<string>('t1');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  const [tutors, setTutors] = useState<Tutor[]>(TUTORS_DATA);
  const [reviews, setReviews] = useState(REVIEWS_DATA);
  const [bookmarks, setBookmarks] = useState<string[]>(['t1', 't3']); // initial favorited tutors
  
  // Bookings: Load 1 preloaded upcoming booking with Chloe to make dashboard look realistic
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'b_init',
      tutorId: 't3',
      tutorName: 'Chloe Kim',
      tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
      skillName: 'Microsoft Excel',
      date: 'Wednesday, June 3, 2026',
      timeSlot: '02:00 PM',
      sessionType: 'Physical',
      notes: "Review my dynamic modeling assignment budgets before Friday huddle submissions.",
      status: 'Upcoming',
      location: 'Level 2 Quiet Study zone - Study Pod B'
    }
  ]);

  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [chats, setChats] = useState<ChatSession[]>(INITIAL_CHATS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [achievements, setAchievements] = useState<AchievementBadge[]>(LEARNING_ACHIEVEMENTS);
  const [activeChatSessionId, setActiveChatSessionId] = useState<string>('');

  // Interactive Onboarding tour control states
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  // Initialize view sync triggers
  const handleExploreSkillReset = (searchKey: string = '', categoryId: string = '') => {
    setView('explore');
    // We pass these via state/props to query filter in ExploreView
    setSearchQueryState(searchKey);
    setCategoryFilterState(categoryId);
  };

  const [searchQueryState, setSearchQueryState] = useState('');
  const [categoryFilterState, setCategoryFilterState] = useState('');

  // Implement Dark mode body classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Bookmarks actions
  const toggleBookmark = (tutorId: string) => {
    if (bookmarks.includes(tutorId)) {
      setBookmarks(bookmarks.filter(id => id !== tutorId));
      addTempNotification(
        'Bookmark Removed',
        'Peer profile removed from your favorited dashboard.',
        'system'
      );
    } else {
      setBookmarks([...bookmarks, tutorId]);
      addTempNotification(
        'Bookmark Saved',
        'Peer profile bookmarked to your favorited tab.',
        'system'
      );
    }
  };

  const removeBookmarkFromDashboard = (tutorId: string) => {
    setBookmarks(bookmarks.filter(id => id !== tutorId));
  };

  // Scheduled sessions booking triggers
  const handleNewBookingSubmission = (bookingInfo: {
    skillName: string;
    date: string;
    timeSlot: string;
    sessionType: 'Online' | 'Physical';
    notes: string;
  }) => {
    const activeTutor = tutors.find(t => t.id === selectedTutorId)!;
    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      tutorId: activeTutor.id,
      tutorName: activeTutor.name,
      tutorAvatar: activeTutor.avatar,
      skillName: bookingInfo.skillName,
      date: bookingInfo.date,
      timeSlot: bookingInfo.timeSlot,
      sessionType: bookingInfo.sessionType,
      notes: bookingInfo.notes,
      status: 'Upcoming',
      meetingLink: bookingInfo.sessionType === 'Online' ? `https://meet.google.com/qiu-${Math.floor(Math.random() * 900)}-${Math.floor(Math.random() * 900)}` : undefined,
      location: bookingInfo.sessionType === 'Physical' ? 'Library Level 2 study huddle area' : undefined
    };

    setBookings([newBooking, ...bookings]);

    // Send visual notification
    const bookingNotif: SystemNotification = {
      id: `n_${Date.now()}`,
      title: 'Session booked with ' + activeTutor.name,
      description: `Confirmed for ${bookingInfo.date} (${bookingInfo.timeSlot})`,
      time: 'Just now',
      read: false,
      type: 'booking'
    };
    setNotifications([bookingNotif, ...notifications]);

    // Go back to the dashboard immediately
    setView('dashboard');
  };

  const cancelBooking = (bookingId: string) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    setBookings(bookings.filter(b => b.id !== bookingId));
    if (targetBooking) {
      addTempNotification(
        'Booking Cancelled',
        `Your swap huddle with ${targetBooking.tutorName} has been cancelled.`,
        'booking'
      );
    }
  };

  // Mark Bookings as complete and route user to review pane
  const completeBooking = (booking: Booking) => {
    // Navigate straight to review tab so they can rate that exact session!
    setView('reviews');
    addTempNotification(
      'Session Completed!',
      `Please summarize your learning swap experience with ${booking.tutorName}.`,
      'system'
    );
  };

  // Comment on forum posts
  const handleAddNewComment = (postId: string, contentText: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newCom = {
          id: `c_${Date.now()}`,
          authorName: 'Hooi Jin Theng',
          authorAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100&h=100',
          content: contentText,
          date: 'Just now'
        };
        return {
          ...post,
          comments: [...post.comments, newCom]
        };
      }
      return post;
    }));
  };

  // Forum like toggler
  const handleForumLike = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const liked = !p.likedByUser;
        return {
          ...p,
          likes: liked ? p.likes + 1 : p.likes - 1,
          likedByUser: liked
        };
      }
      return p;
    }));
  };

  // Create new Forum Post board
  const handleCreateForumPost = (postData: {
    title: string;
    content: string;
    category: 'Request' | 'Guidance' | 'General' | 'Resource';
    tags: string[];
  }) => {
    const newPost: ForumPost = {
      id: `p_${Date.now()}`,
      authorName: 'Hooi Jin Theng',
      authorAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100&h=100',
      authorCourse: 'B.Sc. Computer Science',
      category: postData.category,
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      likes: 1,
      likedByUser: true,
      comments: [],
      date: 'Just now'
    };

    setPosts([newPost, ...posts]);
    addTempNotification(
      'Forum Post Broadcasted',
      `Your peer request list has been broadcasted to the ${postData.category} board.`,
      'community'
    );
  };

  // Delete published forum post
  const handleDeleteForumPost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
    addTempNotification(
      'Board Post Deleted 🗑️',
      'Your student discussion card has been removed successfully.',
      'system'
    );
  };

  // Deregister user's peer tutor card
  const handleDeleteRegisteredTutorProfile = (tutorId: string) => {
    setTutors(tutors.filter(t => t.id !== tutorId));
    addTempNotification(
      'Tutor Card Deregistered 🗑️',
      'Your scholar card has been removed from the skills directory.',
      'badge'
    );
  };

  // Message chat logs sender
  const handleSendMessage = (sessionId: string, text: string, file?: Message['file']) => {
    const updatedChats = chats.map(s => {
      if (s.id === sessionId) {
        const newMsg: Message = {
          id: `msg_${Date.now()}`,
          senderId: 'current_user',
          text,
          timestamp: 'Just now',
          file
        };
        return {
          ...s,
          messages: [...s.messages, newMsg]
        };
      }
      return s;
    });
    setChats(updatedChats);
  };

  // Direct tutor communication chat starter
  const startDirectChatWithTutor = (tObj: Tutor) => {
    // Check if chat session with this tutor exists
    let activeSession = chats.find(s => s.tutorId === tObj.id);
    
    if (!activeSession) {
      const newSession: ChatSession = {
        id: `ch_${Date.now()}`,
        tutorId: tObj.id,
        tutorName: tObj.name,
        tutorAvatar: tObj.avatar,
        tutorCourse: tObj.course,
        online: true,
        messages: [
          { id: 'mi_01', senderId: tObj.id, text: `Hi! I received your swap request for ${tObj.skillsTaught[0]?.skill || 'study collaboration'}. Let's chat!`, timestamp: 'Just now' }
        ]
      };
      
      setChats([newSession, ...chats]);
      setActiveChatSessionId(newSession.id);
    } else {
      setActiveChatSessionId(activeSession.id);
    }
    setView('messages');
  };

  // Reviews submission rating logs
  const handleNewReviewSubmission = (reviewData: {
    tutorId: string;
    rating: number;
    comment: string;
    sessionType: 'Online' | 'Physical';
    skillName: string;
  }) => {
    const newRev: Review = {
      id: `r_${Date.now()}`,
      tutorId: reviewData.tutorId,
      reviewerName: 'Hooi Jin Theng',
      reviewerAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100&h=100',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: 'Just now',
      sessionType: reviewData.sessionType,
      skillName: reviewData.skillName
    };

    setReviews([newRev, ...reviews]);

    addTempNotification(
      'Reviewed uploaded',
      'Trust score update submitted.',
      'system'
    );
  };

  // Mark all notifications as read
  const markNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Helper alert populator
  const addTempNotification = (
    title: string,
    description: string,
    type: SystemNotification['type']
  ) => {
    const newN: SystemNotification = {
      id: `n_${Date.now()}`,
      title,
      description,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications([newN, ...notifications]);
  };

  // Complete Onboarding tour awards
  const handleCompleteOnboardingTour = () => {
    setShowOnboarding(false);
    
    // Unlock Knowledge Builder badge directly!
    setAchievements(achievements.map(ach => {
      if (ach.id === 'ach1') {
        return {
          ...ach,
          progress: 100,
          unlockedAt: 'Just Now!'
        };
      }
      return ach;
    }));

    addTempNotification(
      'Achievement unlocked! 🏆',
      'Knowledge Builder milestone unlocked for completing instructions tour!',
      'badge'
    );
  };

  // Profile inspect clicks redirection
  const handleNewTutorRegistration = (newTutor: Tutor) => {
    setTutors([newTutor, ...tutors]);
    addTempNotification(
      'Scholar Card Active! 🎓',
      `${newTutor.name} has registered successfully in the skills directory index.`,
      'badge'
    );
    setView('explore');
  };

  const handleInspectTutorProfile = (tId: string) => {
    setSelectedTutorId(tId);
    setView('profile');
  };

  const handleBookingTutorProfile = (tId: string) => {
    setSelectedTutorId(tId);
    setView('booking');
  };

  const bookmarkedTutorsList = tutors.filter(t => bookmarks.includes(t.id));

  // Render correct nested dashboard view huddles
  const renderCoreViewContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <LandingView
            tutors={tutors}
            categories={SKILL_CATEGORIES}
            onExploreSkill={handleExploreSkillReset}
            onViewTutor={handleInspectTutorProfile}
            onBeTutor={() => {
              setView('become-tutor');
            }}
          />
        );
      case 'explore':
        return (
          <ExploreView
            tutors={tutors}
            categories={SKILL_CATEGORIES}
            bookmarkedIds={bookmarks}
            toggleBookmark={toggleBookmark}
            onBookTutor={handleBookingTutorProfile}
            onViewTutor={handleInspectTutorProfile}
            initialSearchQuery={searchQueryState}
            initialCategoryFilter={categoryFilterState}
          />
        );
      case 'community':
        return (
          <CommunityView
            posts={posts}
            onCreatePost={handleCreateForumPost}
            onLikePost={handleForumLike}
            onAddComment={handleAddNewComment}
            onDeletePost={handleDeleteForumPost}
          />
        );
      case 'messages':
        return (
          <ChatView
            chatSessions={chats}
            activeSessionId={activeChatSessionId}
            setActiveSessionId={setActiveChatSessionId}
            onSendMessage={handleSendMessage}
          />
        );
      case 'dashboard':
        return (
          <DashboardView
            tutors={tutors}
            bookings={bookings}
            achievements={achievements}
            notifications={notifications}
            bookmarkedTutors={bookmarkedTutorsList}
            onRemoveBookmark={removeBookmarkFromDashboard}
            onCancelBooking={cancelBooking}
            onCompleteBooking={completeBooking}
            onViewTutorProfile={handleInspectTutorProfile}
            onJoinMeeting={(link) => {
              addTempNotification(
                'Launching online meeting huddle',
                'Virtual room huddle linked. Link: ' + link,
                'system'
              );
            }}
            onDeleteTutorProfile={handleDeleteRegisteredTutorProfile}
          />
        );
      case 'profile':
        const selectedTutorObj = tutors.find(t => t.id === selectedTutorId) || tutors[0];
        return (
          <ProfileView
            tutor={selectedTutorObj}
            reviews={reviews}
            onBack={() => setView('explore')}
            onBook={() => setView('booking')}
            onOpenChat={() => startDirectChatWithTutor(selectedTutorObj)}
          />
        );
      case 'booking':
        const bookingTutorObj = tutors.find(t => t.id === selectedTutorId) || tutors[0];
        return (
          <BookingView
            tutor={bookingTutorObj}
            onBack={() => setView('explore')}
            onSubmitBooking={handleNewBookingSubmission}
          />
        );
      case 'become-tutor':
        return (
          <BecomeTutorView
            categories={SKILL_CATEGORIES}
            onSubmitTutor={handleNewTutorRegistration}
            onBack={() => setView('home')}
          />
        );
      case 'reviews':
        return (
          <ReviewsView
            reviews={reviews}
            tutors={tutors}
            onSubmitReview={handleNewReviewSubmission}
          />
        );
      default:
        return <div className="text-center py-10">404 View Not Found</div>;
    }
  };

  // Tour Steps content
  const tourGuideSteps = [
    {
      title: "Welcome to UniShare QIU!",
      desc: "UniShare QIU is a peer huddle system for students. Swap skills, teach topics, schedule meetings, and earn achievements.",
      icon: <Award className="w-8 h-8 text-indigo-500" />
    },
    {
      title: "Explore peer Scholars",
      desc: "Search tutors in programming, Canva, photography, Excel Pivot blocks, or Spanish! Book online Zoom channels or Physical Library study pods in seconds.",
      icon: <Compass className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Broadcast learning requests",
      desc: "Stuck on slide layout or code compilation before exams? Write a discussion card describing what you need in exchange for algorithms or guidance.",
      icon: <Users className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Become a Peer Tutor",
      desc: "Register your own scholar card in our QIU index! Fill out your course major, teaching levels, wanted trades, and dynamic calendars.",
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />
    },
    {
      title: "Start learning & unlocking badges!",
      desc: "Wrapping up completes the catalog onboarding. We already unlocked 'Knowledge Builder' directly to mark your starter completion!",
      icon: <Code className="w-8 h-8 text-black dark:text-white" />
    }
  ];

  const activeTourStep = tourGuideSteps[onboardingStep];

  return (
    <div className={`min-h-screen transition-colors duration-200 text-gray-850 bg-slate-50/50 dark:bg-gray-950 dark:text-gray-250 flex flex-col`}>
      
      {/* Dynamic top banner notify */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-2 px-4 text-center text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5 relative shrink-0">
        <Sparkles className="w-3.5 h-3.5 animate-bounce" />
        <span>University Peer Week is LIVE • Meet peers at QIU level 3 and earn triple trust medals!</span>
      </div>

      {/* CORE TOP STICKY HEADER HERO */}
      <Navbar
        currentView={currentView}
        setView={setView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        markNotificationsAsRead={markNotificationsAsRead}
        onOpenOnboarding={() => {
          setOnboardingStep(0);
          setShowOnboarding(true);
        }}
      />

      {/* MAIN LAYOUT CANVAS CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCoreViewContent()}
      </main>

      {/* INTERACTIVE COMPLIANT ONBOARDING TOUR MODAL */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-gray-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-6 text-center animate-in zoom-in-95 duration-200">
            
            {/* Upper X cancel */}
            <button
              onClick={() => setShowOnboarding(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              aria-label="Skip TourGuide"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step icons visualizer */}
            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-950 flex items-center justify-center mx-auto shadow-inner border border-gray-100/30">
              {activeTourStep.icon}
            </div>

            {/* Copy lines */}
            <div className="space-y-2">
              <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                HCI Onboarding • Step {onboardingStep + 1} of 5
              </span>
              <h3 className="text-lg font-black text-gray-950 dark:text-white tracking-tight mt-2">{activeTourStep.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed dark:text-gray-400">
                {activeTourStep.desc}
              </p>
            </div>

            {/* Stepper Dots bar */}
            <div className="flex justify-center gap-1.5 pt-2">
              {[0, 1, 2, 3, 4].map((dotId) => (
                <span
                  key={dotId}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    onboardingStep === dotId ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-200 dark:bg-gray-800'
                  }`}
                />
              ))}
            </div>

            {/* Lower routing button triggers */}
            <div className="flex gap-2 items-center pt-2">
              {onboardingStep > 0 && (
                <button
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-xs font-bold text-gray-750 dark:text-white transition"
                >
                  Previous
                </button>
              )}
              
              {onboardingStep < 4 ? (
                <button
                  onClick={() => {
                    setOnboardingStep(onboardingStep + 1);
                    // Proactively flip tabs corresponding to tour highlights!
                    if (onboardingStep === 0) setView('explore');
                    if (onboardingStep === 1) setView('community');
                    if (onboardingStep === 2) setView('dashboard');
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
                >
                  <span>Learn Next Feature</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCompleteOnboardingTour}
                  className="flex-1 py-3 bg-gray-950 hover:bg-opacity-90 dark:bg-white dark:text-gray-950 text-white text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <span>Unlock My Gift Badge!</span>
                  <Award className="w-4 h-4 text-amber-500" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
