import React, { useState } from 'react';
import { Star, FileText, CheckCircle2, User, Smile, ShieldAlert } from 'lucide-react';
import { Review, Tutor } from '../types';

interface ReviewsViewProps {
  reviews: Review[];
  tutors: Tutor[];
  onSubmitReview: (reviewData: {
    tutorId: string;
    rating: number;
    comment: string;
    sessionType: 'Online' | 'Physical';
    skillName: string;
  }) => void;
}

export default function ReviewsView({
  reviews,
  tutors,
  onSubmitReview
}: ReviewsViewProps) {
  const [selectedTutorId, setSelectedTutorId] = useState(tutors[0]?.id || 't1');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [sessionType, setSessionType] = useState<'Online' | 'Physical'>('Online');
  const [skillName, setSkillName] = useState('Programming');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTutorChange = (tId: string) => {
    setSelectedTutorId(tId);
    const selectedTutorObj = tutors.find(t => t.id === tId);
    if (selectedTutorObj && selectedTutorObj.skillsTaught.length > 0) {
      setSkillName(selectedTutorObj.skillsTaught[0].skill);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    onSubmitReview({
      tutorId: selectedTutorId,
      rating: userRating,
      comment: userComment,
      sessionType,
      skillName
    });

    setFormSubmitted(true);
    setUserComment('');
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Post Session Feedback</h1>
        <p className="text-sm text-gray-500">
          Build community trust across QIU by rating study swaps and leaving constructive summaries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFTHAND FORM */}
        <div className="md:col-span-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-3 border-b border-gray-100">
            <FileText className="w-5 h-5 text-indigo-600" />
            File Peer Review Card
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Choose Peer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Peer Tutor</label>
                <select
                  value={selectedTutorId}
                  onChange={(e) => handleTutorChange(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500"
                >
                  {tutors.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.course})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Subject Taught</label>
                <select
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500"
                >
                  {tutors.find(t => t.id === selectedTutorId)?.skillsTaught.map((st) => (
                    <option key={st.skill} value={st.skill}>{st.skill}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Session details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Venue Format</label>
                <div className="flex gap-2">
                  {['Online', 'Physical'].map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setSessionType(format as any)}
                      className={`flex-1 text-xs py-2.5 rounded-lg border font-semibold ${
                        sessionType === format
                          ? 'border-blue-600 bg-blue-50/20 text-blue-700 dark:text-blue-400'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Rating Star Scale</label>
                <div className="flex gap-1 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 hover:scale-110 active:scale-95 transition-transform"
                      aria-label={`Give ${star} stars`}
                    >
                      <Star className={`w-6 h-6 ${
                        userRating >= star ? 'text-amber-400 fill-current' : 'text-gray-200'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Written Feedback Content</label>
              <textarea
                placeholder="Detail what was solved. Did your peer tutor explain algorithms simply? Were slides contrast improved? constructive comments encourage high-signal learning exchange QIU."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                required
                maxLength={400}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-900 dark:text-white outline-none focus:border-blue-500 min-h-[110px]"
              />
            </div>

            {formSubmitted && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 rounded-xl text-xs text-emerald-800 dark:text-emerald-400 flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Feedback uploaded successfully! QIU trust indicators recalculated. See cards on the right.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md"
            >
              Submit Peer Feedback
            </button>
          </form>
        </div>

        {/* RIGHTHAND: RECENT REVIEWS CARD LIST */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold text-indigo-950 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150">
              Verified Swap Log Reviews
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {reviews.map((rev) => {
                const associatedTutor = tutors.find(t => t.id === rev.tutorId);
                return (
                  <div key={rev.id} className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50/50 space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.reviewerAvatar}
                          alt={rev.reviewerName}
                          referrerPolicy="no-referrer"
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold text-gray-900 truncate">{rev.reviewerName}</h4>
                          <span className="text-[9px] text-gray-400">to {associatedTutor?.name || 'Tutor'}</span>
                        </div>
                      </div>

                      <div className="flex text-amber-400 shrink-0">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-normal italic line-clamp-3">
                      "{rev.comment}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
