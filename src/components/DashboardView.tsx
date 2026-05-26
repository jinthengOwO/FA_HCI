import React, { useState } from 'react';
import { 
  Calendar, Star, Trash2, Video, MapPin, Award, 
  Sparkles, GraduationCap, ChevronRight, CheckCircle, 
  TrendingUp, ArrowRight, MessageSquare, Bell, Compass, 
  X, HelpCircle, Flame, ShieldAlert, Cpu, Loader2
} from 'lucide-react';
import { Tutor, Booking, AchievementBadge, SystemNotification } from '../types';

interface DashboardViewProps {
  tutors: Tutor[];
  bookings: Booking[];
  achievements: AchievementBadge[];
  notifications: SystemNotification[];
  bookmarkedTutors: Tutor[];
  onRemoveBookmark: (tutorId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onCompleteBooking: (booking: Booking) => void; // triggers reviews tab
  onViewTutorProfile: (tutorId: string) => void;
  onJoinMeeting: (meetingLink: string) => void;
  onDeleteTutorProfile?: (tutorId: string) => void;
}

export default function DashboardView({
  tutors,
  bookings,
  achievements,
  notifications,
  bookmarkedTutors,
  onRemoveBookmark,
  onCancelBooking,
  onCompleteBooking,
  onViewTutorProfile,
  onJoinMeeting,
  onDeleteTutorProfile
}: DashboardViewProps) {
  
  // Find logged-in user's custom tutor card
  const myTutorProfile = tutors.find(t => t.name === 'Hooi Jin Theng');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. STUDENT PROFILE WELCOME ROW */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-tr from-blue-600/5 via-indigo-600/5 to-transparent dark:from-blue-950/20 dark:to-indigo-50/5 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-blue-500/10 shrink-0 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Logged User Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white">Welcome back, Hooi Jin Theng!</h1>
            <p className="text-xs text-gray-500">B.Sc. Computer Science • Year 2 • Student Center ID #QIU-0549</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
                <span>3 Peer Swaps Completed</span>
              </span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="text-gray-500 font-medium">Weekly streak: <span className="font-bold text-gray-950 dark:text-gray-250">4 days huddling</span></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center border-t md:border-t-0 md:border-l border-gray-250 dark:border-gray-800 pt-4 md:pt-0 pl-0 md:pl-6">
          <div>
            <h4 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">12</h4>
            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Hrs Swapped</span>
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-purple-600 dark:text-purple-400">4.9</h4>
            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">My Rating</span>
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-amber-600 dark:text-amber-400">2</h4>
            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Badges</span>
          </div>
        </div>
      </div>

      {myTutorProfile && (
        <div className="bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-950 dark:text-white">Active Peer Tutor Card published</h3>
              <p className="text-[11px] text-gray-500">Your custom scholar profile is visible under the Explore Skills directory for trades.</p>
            </div>
          </div>
          <button
            id={`remove-tutor-${myTutorProfile.id}`}
            onClick={() => onDeleteTutorProfile && onDeleteTutorProfile(myTutorProfile.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-650 dark:text-red-400 text-xs font-bold rounded-xl transition"
            title="Deregister and delete tutor card"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Tutor Profile Card</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFTHAND: DEALS WITH UPCOMING SESSIONS AND NOTIFICATION TABS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* UPCOMING SESSIONS */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                Upcoming Swap Sessions
              </span>
              <span className="text-xs text-gray-400 font-medium">({bookings.length} active)</span>
            </h3>

            {bookings.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-gray-400">You do not have any upcoming bookings scheduled.</p>
                <p className="text-[10px] text-gray-400 italic">Explore the tutors directory or try the AI Matcher below to lock a slot!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-950/40 space-y-3">
                    <div className="flex justify-between items-start flex-col sm:flex-row gap-3">
                      <div className="flex gap-3">
                        <img
                          src={b.tutorAvatar}
                          alt={b.tutorName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{b.tutorName}</h4>
                          <span className="text-[11px] text-gray-400 mt-0.5 block font-semibold">{b.skillName} Session</span>
                          <span className="text-[10.5px] text-gray-500 font-medium mt-1 block">{b.date} • {b.timeSlot}</span>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold self-start sm:self-center ${
                        b.sessionType === 'Online' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400'
                      }`}>
                        {b.sessionType === 'Online' ? '💻 Virtual link' : '📍 Library Pod'}
                      </span>
                    </div>

                    {b.notes && (
                      <p className="text-[11px] text-gray-500 leading-normal italic pl-4 border-l-2 border-gray-300 dark:border-gray-700">
                        "{b.notes}"
                      </p>
                    )}

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between gap-2 flex-wrap">
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="text-[11px] text-gray-400 hover:text-red-600 transition-colors"
                      >
                        Cancel Booking
                      </button>

                      <div className="flex items-center gap-2">
                        {b.sessionType === 'Online' ? (
                          <button
                            onClick={() => onJoinMeeting(b.meetingLink || 'https://zoom.us')}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join Online Room</span>
                          </button>
                        ) : (
                          <span className="text-[10.5px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold px-2 py-1 rounded">
                            📍 Meet at Level 2, Pod B
                          </span>
                        )}

                        {/* Interactive complete handler */}
                        <button
                          onClick={() => onCompleteBooking(b)}
                          className="px-3.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TELEMETRY LEARNING PATH & PROGRESS LIST */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Syllabus Progress Tracker
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold">Python Algorithms Recursion</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">80% Mastered</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold">Microsoft Excel Complex Pivots</span>
                  <span className="font-extrabold text-purple-600 dark:text-purple-400">45% Learn Path</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold">PowerPoint Slide Hierarchy Structure</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">30% Complete</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHTHAND: SAVED TUTORS BOOKMARKS, ACHIEVEMENTS, RECENT NOTIFICATIONS LIST */}
        <div className="space-y-6">
          
          {/* BOOKMARKED SAVED PEERS */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150">
              Saved Peers ({bookmarkedTutors.length})
            </h3>
            
            {bookmarkedTutors.length === 0 ? (
              <p className="text-[11px] text-gray-400 text-center py-4">No peers favorited yet. Browse the skills catalog to bookmark tutors!</p>
            ) : (
              <div className="space-y-3">
                {bookmarkedTutors.map(t => (
                  <div key={t.id} className="flex justify-between items-center gap-3 p-2 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-850 rounded-xl">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewTutorProfile(t.id)}>
                      <img src={t.avatar} alt={t.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{t.name}</h4>
                        <span className="text-[9px] text-gray-400 truncate block">{t.course}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(t.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIVE ACHIEVEMENTS BADGES */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              SyllSwap achievements
            </h3>
            
            <div className="space-y-3">
              {achievements.map(ach => (
                <div key={ach.id} className="space-y-2 p-2.5 border border-gray-100 dark:border-gray-850 rounded-xl bg-gray-50/30">
                  <div className="flex gap-2 items-start">
                    <span className="text-base">🏆</span>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">
                        {ach.title}
                        {ach.progress === 100 && (
                          <span className="ml-1.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1 py-0.2 rounded-full border border-emerald-100">UNLOCKED</span>
                        )}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">{ach.description}</p>
                    </div>
                  </div>
                  
                  {ach.progress < 100 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>Progress</span>
                        <span>{ach.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-1.5 bg-purple-500 rounded-full" style={{ width: `${ach.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
