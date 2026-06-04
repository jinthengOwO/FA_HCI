import React, { useState } from 'react';
import { 
  Search, ArrowRight, Star, Users, BookOpen, Clock, 
  CheckCircle, Sparkles, MessageSquare, ChevronRight,
  TrendingUp, Award, Code, Layers, Video,
  FileSpreadsheet, Mic, Camera, Languages, Palette, Presentation, Brush
} from 'lucide-react';
import { Tutor } from '../types';

interface LandingViewProps {
  tutors: Tutor[];
  categories: { id: string; name: string; icon: string; count: number; color: string; }[];
  onExploreSkill: (searchKey: string, categoryId?: string) => void;
  onViewTutor: (tutorId: string) => void;
  onBeTutor: () => void;
}

export default function LandingView({
  tutors,
  categories,
  onExploreSkill,
  onViewTutor,
  onBeTutor
}: LandingViewProps) {
  const [searchVal, setSearchVal] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('prog');

  // Map icon names to Lucide icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Video': return <Video className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Languages': return <Languages className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Presentation': return <Presentation className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'Brush': return <Brush className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      default: return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreSkill(searchVal);
  };

  const featuredTutors = tutors.slice(0, 3);

  const testimonials = [
    {
      quote: "UniShare completely solved my exam panic. Hooi Jin Theng spent an hour drawing out database index hierarchies, and I secured an A on my DBA finals! Best platform ever.",
      author: "Mia Alvarez",
      year: "Year 2 Psychology Student",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
      rating: 5
    },
    {
      quote: "Teaching others Python algorithms on Wednesday huddles helped clarify my own fundamentals. This peer learning network makes sharing second-nature.",
      author: "Alara Tan",
      year: "Year 3 Cyber Security Student",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      rating: 5
    },
    {
      quote: "The interface is so clean and easy to navigate. I booked a PowerPoint visual critique session with Chloe, and it was straightforward, friendly, and hugely helpful.",
      author: "Tariq Mahmood",
      year: "Year 1 Business Student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION WITH HCI VISIBILITY IN MIND */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50/50 via-white to-transparent dark:from-slate-900/40 dark:via-gray-900">
        {/* Subtle decorative background circles */}
        <div className="absolute top-10 left-1/2 -translate-x-12 w-72 h-72 rounded-full bg-blue-300/20 dark:bg-blue-900/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-300/10 dark:bg-indigo-900/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Connection Hub • Active QIU Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
              Learn Skills From <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Your Peers
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              Don’t master tough curriculum or tech tools alone. Swap your skills, coordinate peer-to-peer study sessions, and build trust on QIU's dedicated learning community.
            </p>

            {/* Interactive Search bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl group">
              <div className="relative flex items-center bg-white dark:bg-gray-950 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-100/40 dark:shadow-none focus-within:border-blue-500 transition-all duration-300">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="What do you want to learn today? Try 'React', 'Figma'..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-transparent border-none outline-none py-2.5 px-3 text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/10"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExploreSkill('')}
                className="px-6 py-3 rounded-xl bg-gray-950 text-white dark:bg-white dark:text-gray-950 hover:bg-opacity-90 active:scale-95 text-xs font-extrabold transition-all shadow-sm flex items-center gap-2"
              >
                <span>Explore Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBeTutor}
                className="px-6 py-3 rounded-xl bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 text-xs font-bold transition-all border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                Become a Tutor
              </button>
            </div>

            {/* Quick popular tags */}
            <div className="pt-2">
              <span className="text-xs text-gray-400 font-medium">Popular requests:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Python', 'UI/UX Design', 'Canva Layouts', 'Public Speaking', 'Excel Macros'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onExploreSkill(tag)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/20 dark:hover:text-blue-400 transition-all font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT GRAPHIC HERO INSPIRED BY THEMED EDUCATIONAL COMMUNITY DESIGN */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-blue-600/5 to-indigo-600/5 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-center p-8 shadow-sm">
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 flex items-center gap-3 shadow-md animate-bounce [animation-duration:5s] z-10">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  A+
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">Exam Success</h4>
                  <p className="text-[10px] text-gray-400">Database optimization session</p>
                </div>
              </div>

              <div className="absolute bottom-6 right-4 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl p-3.5 flex items-center gap-3 shadow-md animate-bounce [animation-duration:4s] z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">Ethan Mercer</h4>
                  <p className="text-[10px] text-gray-400">Grading final videos online</p>
                </div>
              </div>

              {/* Main Avatar Graphic card */}
              <div className="relative w-72 bg-white dark:bg-gray-950 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100"
                      alt="Student"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white">Sofia Rodriguez</h3>
                      <p className="text-[9px] text-gray-400">International Relations • Year 2</p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                    Tutor
                  </div>
                </div>

                <div className="py-2.5 border-y border-gray-100 dark:border-gray-800 space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Teaches</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-semibold">Public Speaking</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400 font-semibold">Spanish</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-gray-900 dark:text-white">4.9</span>
                    <span className="text-gray-400 text-[10px]">(22 sessions)</span>
                  </div>
                  <button
                    onClick={() => onViewTutor('t5')}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5 hover:underline"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS METRIC SUB-GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-950 dark:to-indigo-950 rounded-2xl py-8 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 font-mono text-[140px] font-extrabold translate-y-6 translate-x-6 select-none leading-none">
            QIU
          </div>
          
          <div className="text-center sm:text-left space-y-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">1,420+</h3>
            <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Active QIU Students</p>
            <p className="text-[11px] text-blue-200/80">Connecting across study modules weekly</p>
          </div>

          <div className="text-center sm:text-left space-y-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">85+</h3>
            <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Skills Available</p>
            <p className="text-[11px] text-blue-200/80">From hard development to designer tools</p>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">3,840+</h3>
            <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Sessions Completed</p>
            <p className="text-[11px] text-blue-200/80">Collaborative timeslots recorded successfully</p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Popular Skill Categories
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Filter peer tutors by selecting one of our high-volume learning subjects
            </p>
          </div>
          <button
            onClick={() => onExploreSkill('')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:gap-2.5 transition-all self-start sm:self-center bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30"
          >
            <span>See All Subjects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onExploreSkill('', cat.name)}
              className="group cursor-pointer rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-5 hover:border-blue-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getCategoryIcon(cat.icon)}
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mt-4 group-hover:text-blue-600 dark:group-hover:text-indigo-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {cat.count} tutors online
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED STUDENT TUTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Featured Scholars</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Highly Rated Peer Tutors
          </h2>
          <p className="text-sm text-gray-500">
            Highly recommended peers with trusted student reviews and complete availability schedules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTutors.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 relative group"
            >
              {/* Featured Ribbon Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Superpeer</span>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 border-blue-500/10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-gray-400">{t.course} • Year {t.year}</p>
                    
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold ml-1 text-gray-900 dark:text-white">{t.rating}</span>
                      </div>
                      <span className="text-gray-300 dark:text-gray-700 text-xs">•</span>
                      <span className="text-gray-400 text-[11px]">{t.reviewCount} session reviews</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 line-clamp-3 leading-relaxed">
                  {t.bio}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/60 space-y-2">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wide">Teaches</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {t.skillsTaught.map((st) => (
                        <span
                          key={st.skill}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                        >
                          {st.skill} ({st.level})
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wide">Wants to learn</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {t.skillsWanted.map((sw) => (
                        <span
                          key={sw}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                <div className="text-[11px] text-gray-400">
                  Slots: <span className="font-bold text-gray-600 dark:text-gray-300">{t.availability.days.join(', ')}</span>
                </div>
                <button
                  onClick={() => onViewTutor(t.id)}
                  className="px-4 py-2 text-xs font-bold rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 transition-all"
                >
                  Inspect Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-gray-50 dark:bg-gray-950 py-12 border-y border-gray-100 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">True Peer Stories</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Testimonials From Campus
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Read how fellow QIU students are maximizing study hours via dynamic sharing lessons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{t.author}</h4>
                    <p className="text-[10px] text-gray-400">{t.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-gray-900 dark:text-white">
                UniShare QIU
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              QIU’s student-first peer skill platform. Cultivating modern community integration under HCI user principles.
            </p>
            <div className="text-[11px] text-gray-400">
              Host: <span className="font-bold">QIU Academic Center</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onExploreSkill('')} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Browse All Skills</button></li>
              <li><button onClick={onBeTutor} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Register as Peer Tutor</button></li>
              <li><button onClick={() => onExploreSkill('Python')} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Python Coding Tutors</button></li>
              <li><button onClick={() => onExploreSkill('Excel')} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Excel Spreadsheets</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-widest mb-4">Support & Trust</h4>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li>Academic Honor Code</li>
              <li>Campus Safety Guidelines</li>
              <li>How Peer Bookings Work</li>
              <li>Review Panel Verification</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-widest">Connect with Hub</h4>
            <p className="text-xs text-gray-400">
              Visit Level 3, QIU Innovation Commons for physical helpdesks and study rooms.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] text-gray-500 dark:text-gray-400">
              💡 <span className="font-bold text-gray-800 dark:text-gray-200">Tip:</span> Master 2 skills to unlock the 'Rising Mentor' achievement badge!
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
          © 2026 UniShare QIU Peer Network. Built in accordance with Student Union HCI heuristics. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
