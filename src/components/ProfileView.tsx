import React from 'react';
import { 
  Star, Calendar, MessageSquare, Briefcase, Award, 
  MapPin, Clock, BookOpen, ExternalLink, ChevronLeft 
} from 'lucide-react';
import { Tutor, Review } from '../types';

interface ProfileViewProps {
  tutor: Tutor;
  reviews: Review[];
  onBack: () => void;
  onBook: () => void;
  onOpenChat: () => void;
}

export default function ProfileView({
  tutor,
  reviews,
  onBack,
  onBook,
  onOpenChat
}: ProfileViewProps) {
  // Filter reviews matching this specific tutor
  const tutorReviews = reviews.filter(r => r.tutorId === tutor.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Return Navigation button */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Grid Catalog</span>
        </button>
      </div>

      {/* CORE PROFILE HEADER BANNER */}
      <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-blue-500/10 shrink-0 bg-gray-50">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">{tutor.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-350 text-[10px] font-bold uppercase tracking-wider">
                  QIU Peer Tutor
                </span>
              </div>
              
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {tutor.course} • Year {tutor.year}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current animate-pulse" />
                  <span>{tutor.rating}</span>
                  <span className="text-gray-400 font-normal">({tutor.reviewCount} total reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>QIU Innovation Block</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0">
            <button
              onClick={onOpenChat}
              className="flex-1 md:flex-initial px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Peer</span>
            </button>
            <button
              id="booking-confirm-init"
              onClick={onBook}
              className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Session</span>
            </button>
          </div>
        </div>

        {/* PROFILE BIO SUMMARY & BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800/60">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">Biography</h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {tutor.bio}
            </p>
          </div>

          <div className="space-y-4 bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-900 dark:text-white">Skills Matrix</h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Teaches</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {tutor.skillsTaught.map(st => (
                    <span key={st.skill} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      🛠️ {st.skill} ({st.level})
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Trading Target</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {tutor.skillsWanted.map(sw => (
                    <span key={sw} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                      🎯 {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER GRID FOR SCHEDULE, PORTFOLIO & REVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AVAILABILITY SCHEDULE MODULE */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-150">
              <Clock className="w-4 h-4 text-emerald-500" />
              Weekly Slots
            </h3>
            <div className="space-y-3">
              {tutor.availability.days.map((day, dIdx) => (
                <div key={day} className="flex justify-between items-center bg-gray-50 dark:bg-gray-950 p-2.5 rounded-xl border border-gray-100 dark:border-gray-850">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{day}</span>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                      {tutor.availability.slots.length} available slots
                    </span>
                    <p className="text-[9px] text-gray-400 mt-1">{tutor.availability.slots[0]} - {tutor.availability.slots[tutor.availability.slots.length-1]}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={onBook}
              className="w-full text-center py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold transition-all"
            >
              View Detailed Timeslot Calendar
            </button>
          </div>

          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs">Honor Roll Student</h4>
            <p className="text-[11px] text-gray-500">
              This tutor is vetted by the QIU Center for Collaborative Learning with verified student credits.
            </p>
          </div>
        </div>

        {/* WORK PORTFOLIOS & PROJECT CASES */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              Project Showcase
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tutor.portfolio.map((port, pIdx) => (
                <div key={pIdx} className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-950 flex flex-col justify-between group">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={port.image}
                      alt={port.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{port.title}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{port.description}</p>
                    <div className="pt-2 text-[10px] text-blue-500 font-bold flex items-center gap-1 cursor-not-allowed">
                      <span>Interactive Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VERIFIED STUDENT REVIEWS SECTION */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500" />
                Verified Student Reviews
              </h3>
              <span className="text-xs text-gray-400">({tutorReviews.length} records)</span>
            </div>

            <div className="space-y-4">
              {tutorReviews.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">
                  This tutor hasn't recorded public reviews yet. Be the first to rate your learning huddle!
                </div>
              ) : (
                tutorReviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-850 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <img
                          src={r.reviewerAvatar}
                          alt={r.reviewerName}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{r.reviewerName}</h4>
                          <span className="text-[9px] text-gray-400">{r.date}</span>
                        </div>
                      </div>

                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
                        {r.skillName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        {r.sessionType} meeting
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
