import React, { useState, useMemo } from 'react';
import { Search, Star, Bookmark, Filter, SlidersHorizontal, ArrowUpDown, Clock } from 'lucide-react';
import { Tutor, SkillLevel } from '../types';

interface ExploreViewProps {
  tutors: Tutor[];
  categories: { id: string; name: string; icon: string; count: number; color: string; }[];
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  onBookTutor: (tutorId: string) => void;
  onViewTutor: (tutorId: string) => void;
  initialSearchQuery?: string;
  initialCategoryFilter?: string;
}

export default function ExploreView({
  tutors,
  categories,
  bookmarkedIds,
  toggleBookmark,
  onBookTutor,
  onViewTutor,
  initialSearchQuery = '',
  initialCategoryFilter = ''
}: ExploreViewProps) {
  const [searchVal, setSearchVal] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFilter);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'names'>('rating');

  // Handle resetting initial filters if props change
  React.useEffect(() => {
    if (initialSearchQuery) setSearchVal(initialSearchQuery);
  }, [initialSearchQuery]);

  React.useEffect(() => {
    if (initialCategoryFilter) setSelectedCategory(initialCategoryFilter);
  }, [initialCategoryFilter]);

  // Dynamic filter lists
  const filteredTutors = useMemo(() => {
    return tutors.filter((t) => {
      // 1. Search Query Match
      const searchLower = searchVal.toLowerCase();
      const nameMatch = t.name.toLowerCase().includes(searchLower);
      const bioMatch = t.bio.toLowerCase().includes(searchLower);
      const courseMatch = t.course.toLowerCase().includes(searchLower);
      const teachesSkillMatch = t.skillsTaught.some(st => st.skill.toLowerCase().includes(searchLower));
      const wantsSkillMatch = t.skillsWanted.some(sw => sw.toLowerCase().includes(searchLower));
      const matchesSearch = nameMatch || bioMatch || courseMatch || teachesSkillMatch || wantsSkillMatch;

      // 2. Category Match
      const matchesCategory = selectedCategory === '' || 
        t.skillsTaught.some(st => st.skill.toLowerCase() === selectedCategory.toLowerCase());

      // 3. Level Match
      const matchesLevel = selectedLevel === 'All' || 
        t.skillsTaught.some(st => st.level === selectedLevel);

      return matchesSearch && matchesCategory && matchesLevel;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });
  }, [tutors, searchVal, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER HERO */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Explore Campus Tutors</h1>
        <p className="text-sm text-gray-500">
          Search and book 1-on-1 peer mentoring boards with trusted students across QIU
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDE BAR FILTERS */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" />
                Filter Options
              </span>
              <button
                onClick={() => {
                  setSearchVal('');
                  setSelectedCategory('');
                  setSelectedLevel('All');
                }}
                className="text-[10px] uppercase font-bold text-gray-400 hover:text-blue-600 transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* LEVEL SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Target Skill Level</label>
              <div className="space-y-2">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <label key={lvl} className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <input
                      type="radio"
                      name="level-filter"
                      checked={selectedLevel === lvl}
                      onChange={() => setSelectedLevel(lvl)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{lvl}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SORTING CONTROLS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500"
              >
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviewed</option>
                <option value="names">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100/50 dark:border-blue-900/30 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300">💡 Dynamic Matching Idea</h4>
            <p className="text-[11px] text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
              If you can’t find a slot, try posting a <strong>Request card</strong> in the Community board. Other peers regularly check requests to earn mentorship badges!
            </p>
          </div>
        </div>

        {/* GRIDS & SEARCH MAIN PANEL */}
        <div className="lg:col-span-3 space-y-6">
          {/* TOP SEARCH BAR ROW */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search teachers, skills, bios, or department codes..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full text-xs py-3.5 pl-9 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 outline-none shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span className="text-xs text-gray-400">
                Found <strong className="text-gray-700 dark:text-gray-200">{filteredTutors.length}</strong> peers
              </span>
            </div>
          </div>

          {/* ACTIVE CATEGORIES FILTERS PILLS SHORTCUTS */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('')}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                selectedCategory === ''
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
              }`}
            >
              All Subjects
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.name)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  selectedCategory.toLowerCase() === c.name.toLowerCase()
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* TUTOR CARDS LISTING OR EMPTY STATE */}
          {filteredTutors.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 p-12 text-center space-y-4 bg-white dark:bg-gray-900">
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mx-auto text-gray-400">
                <SlidersHorizontal className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-950 dark:text-white">No Peers Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We couldn't match any students teaching keywords fitting “{searchVal}”. Try easing your level filters or review categories!
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchVal('');
                  setSelectedCategory('');
                  setSelectedLevel('All');
                }}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTutors.map((t) => {
                const isBookmarked = bookmarkedIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group duration-200"
                  >
                    <div>
                      {/* Top profile line */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover border border-gray-150 shrink-0"
                          />
                          <div>
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {t.name}
                            </h3>
                            <p className="text-[11px] text-gray-400 font-medium">{t.course} • Yr {t.year}</p>
                            <div className="flex items-center gap-1.5 mt-0.5 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="text-xs font-bold text-gray-900 dark:text-white">{t.rating}</span>
                              <span className="text-gray-300 dark:text-gray-700 text-xs">•</span>
                              <span className="text-[10px] text-gray-400">{t.reviewCount} reviews</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Favoriting Bookmark */}
                        <button
                          onClick={() => toggleBookmark(t.id)}
                          className="p-1.5 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-red-50 hover:text-red-600 text-gray-400 hover:border-red-100 transition-all"
                          aria-label="Add tutor to saved list"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Tutor Bio */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                        {t.bio}
                      </p>

                      {/* Dynamic Skill Badge grid */}
                      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/50 space-y-2">
                        <div>
                          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Teaches</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {t.skillsTaught.map((st) => (
                              <span
                                key={st.skill}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
                              >
                                {st.skill} • <span className="font-normal">{st.level}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Wants to learn</p>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {t.skillsWanted.map((sw) => (
                              <span
                                key={sw}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400"
                              >
                                {sw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Booking Buttons */}
                    <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        <span>{t.availability.days.slice(0, 2).join('/')} available</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onViewTutor(t.id)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold"
                        >
                          View Bio
                        </button>
                        <button
                          onClick={() => onBookTutor(t.id)}
                          className="px-3.5 py-1.5 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs"
                        >
                          Book Session
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
