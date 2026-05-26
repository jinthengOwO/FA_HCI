import React, { useState } from 'react';
import { 
  Calendar, Clock, Laptop, MapPin, ChevronLeft, 
  CheckCircle, ArrowRight, AlertCircle, FileText 
} from 'lucide-react';
import { Tutor } from '../types';

interface BookingViewProps {
  tutor: Tutor;
  onBack: () => void;
  onSubmitBooking: (bookingData: {
    skillName: string;
    date: string;
    timeSlot: string;
    sessionType: 'Online' | 'Physical';
    notes: string;
  }) => void;
}

export default function BookingView({
  tutor,
  onBack,
  onSubmitBooking
}: BookingViewProps) {
  // Generate next 5 school days
  const bookingDates = [
    { day: 'Mon', date: 'June 1', full: 'Monday, June 1, 2026' },
    { day: 'Tue', date: 'June 2', full: 'Tuesday, June 2, 2026' },
    { day: 'Wed', date: 'June 3', full: 'Wednesday, June 3, 2026' },
    { day: 'Thu', date: 'June 4', full: 'Thursday, June 4, 2026' },
    { day: 'Fri', date: 'June 5', full: 'Friday, June 5, 2026' }
  ];

  const eligibleSkills = tutor.skillsTaught.map(s => s.skill);
  
  const [selectedSkill, setSelectedSkill] = useState(eligibleSkills[0] || '');
  const [selectedDateObj, setSelectedDateObj] = useState(bookingDates[0]);
  const [selectedSlot, setSelectedSlot] = useState(tutor.availability.slots[0] || '10:00 AM');
  const [sessionType, setSessionType] = useState<'Online' | 'Physical'>('Online');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkill) {
      setErrorMsg('Please select which skill you wish to learn.');
      return;
    }
    if (!selectedDateObj) {
      setErrorMsg('Please select a date.');
      return;
    }
    if (!selectedSlot) {
      setErrorMsg('Please select an available timeslot.');
      return;
    }

    // Success state
    setShowSuccessModal(true);
  };

  const handleConfirmModalAction = () => {
    onSubmitBooking({
      skillName: selectedSkill,
      date: selectedDateObj.full,
      timeSlot: selectedSlot,
      sessionType,
      notes
    });
    setShowSuccessModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Upper return navigation row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Tutors list</span>
        </button>
      </div>

      {/* CORE SCHEDULING FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* TUTOR QUICK SUMMARY BOX */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm h-fit">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-blue-500/20">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">{tutor.name}</h3>
              <p className="text-[10px] text-gray-400">{tutor.course} • Yr {tutor.year}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800/60 pt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Teaches:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{eligibleSkills.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Rating:</span>
              <span className="font-bold text-amber-500">★ {tutor.rating}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Weekly schedule:</span>
              <span className="font-bold text-gray-700 dark:text-gray-300 text-[11px]">{tutor.availability.days.join(', ')}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 text-[11px] text-orange-850 dark:text-orange-350 leading-normal flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-orange-500" />
            <span><strong>Academic Policy:</strong> Peer swapping is volunteer-focused. Under Honor code principles, do not ask peers to do your homework assignments directly.</span>
          </div>
        </div>

        {/* BOOK FORM SECTION */}
        <div className="md:col-span-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Select Your Learning Preferences
          </h2>

          <form onSubmit={handleFormSubmit} className="mt-6 space-y-6">
            
            {/* 1. SKILL SELECTION */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider">What skill do you want to learn?</label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                {tutor.skillsTaught.map((st) => (
                  <button
                    type="button"
                    key={st.skill}
                    onClick={() => {
                      setSelectedSkill(st.skill);
                      setErrorMsg('');
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-colors flex flex-col justify-between ${
                      selectedSkill === st.skill
                        ? 'border-blue-600 bg-blue-50/30 text-blue-900 dark:bg-blue-950/20 dark:text-blue-300 ring-2 ring-blue-500/10'
                        : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-bold text-sm">{st.skill}</span>
                    <span className="text-[10px] text-gray-400 mt-1">Level: {st.level}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. DATE SELECTION CARDS */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Select a Date</label>
              <div className="grid grid-cols-5 gap-2 mt-1.5">
                {bookingDates.map((dateObj) => (
                  <button
                    type="button"
                    key={dateObj.date}
                    onClick={() => setSelectedDateObj(dateObj)}
                    className={`py-3.5 px-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-colors ${
                      selectedDateObj.date === dateObj.date
                        ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-lg'
                        : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-700 dark:text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest">{dateObj.day}</span>
                    <span className="text-sm font-black">{dateObj.date.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SLOT TIMES SELECTION LIST */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Select an Available Time Slot</label>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {tutor.availability.slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2 text-xs rounded-lg border font-semibold transition-all ${
                      selectedSlot === slot
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 ring-2 ring-blue-500/10'
                        : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. MEETING VENUE MODE TYPES */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Session Venue Type</label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => setSessionType('Online')}
                  className={`p-3.5 rounded-xl border text-xs text-left flex items-start gap-3 transition-colors ${
                    sessionType === 'Online'
                      ? 'border-blue-600 bg-blue-50/20 text-blue-900 dark:bg-blue-950/20 dark:text-blue-300 ring-2 ring-blue-500/10'
                      : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-700 dark:text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Laptop className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm">Online Huddle</span>
                    <span className="text-[10px] text-gray-400">Virtual study link auto-generated here.</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionType('Physical')}
                  className={`p-3.5 rounded-xl border text-xs text-left flex items-start gap-3 transition-colors ${
                    sessionType === 'Physical'
                      ? 'border-blue-600 bg-blue-50/20 text-blue-900 dark:bg-blue-950/20 dark:text-blue-300 ring-2 ring-blue-500/10'
                      : 'border-gray-200 dark:border-gray-800 bg-transparent text-gray-700 dark:text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm">Physical Meeting</span>
                    <span className="text-[10px] text-gray-400">Meet at QIU Library Study Pods.</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 5. USER SESSION NOTES AREA */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                Collaborative notes (What goals on {selectedSkill} should we resolve?)
              </label>
              <textarea
                placeholder="Example: I want to review my code syntax, fix a bug in database relations, or test responsive grids before homework submissions on Friday..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={300}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 min-h-[90px]"
              />
            </div>

            {errorMsg && (
              <div className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/10 p-3 rounded-lg border border-red-150">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* SUBMIT TRIGGERS */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition-transform active:scale-98"
              >
                Book Session with {tutor.name}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* OVERLAY SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 max-w-md w-full rounded-3xl p-6 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-950 dark:text-white">Session Requested Successfully!</h3>
              <p className="text-xs text-gray-500">
                Your swap booking log with <strong>{tutor.name}</strong> has been registered.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Subject:</span>
                <span className="font-bold">{selectedSkill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date/Time:</span>
                <span className="font-bold">{selectedDateObj.day}, {selectedDateObj.date} ({selectedSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Meeting Location:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {sessionType === 'Online' ? 'Zoom Link Auto-Provisioned' : 'QIU Library Pod B'}
                </span>
              </div>
              {notes && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400 block font-medium">Session Focus:</span>
                  <p className="text-[11px] text-gray-650 italic mt-1 line-clamp-2">"{notes}"</p>
                </div>
              )}
            </div>

            <button
              onClick={handleConfirmModalAction}
              className="w-full py-3 bg-gray-950 text-white dark:bg-white dark:text-gray-950 text-xs font-black rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Commit & Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
