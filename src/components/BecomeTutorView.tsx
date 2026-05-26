import React, { useState } from 'react';
import { 
  Plus, Trash2, GraduationCap, Calendar, 
  Clock, Briefcase, CheckCircle2, User, 
  ArrowRight, Heart, FileText, Globe
} from 'lucide-react';
import { Tutor, SkillLevel } from '../types';

interface BecomeTutorViewProps {
  categories: { id: string; name: string; icon: string; count: number; color: string; }[];
  onSubmitTutor: (newTutor: Tutor) => void;
  onBack: () => void;
}

export default function BecomeTutorView({
  categories,
  onSubmitTutor,
  onBack
}: BecomeTutorViewProps) {
  // Input states
  const [name, setName] = useState('Hooi Jin Theng');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200&h=200');
  const [course, setCourse] = useState('B.Sc. Computer Science');
  const [year, setYear] = useState(2);
  const [bio, setBio] = useState('');
  
  // Teaching Skills
  const [skillsTaught, setSkillsTaught] = useState<{ skill: string; level: SkillLevel }[]>([
    { skill: 'Programming', level: 'Intermediate' }
  ]);
  const [tempSkill, setTempSkill] = useState(categories[0]?.name || 'Programming');
  const [tempLevel, setTempLevel] = useState<SkillLevel>('Intermediate');

  // Wanted Skills
  const [skillsWanted, setSkillsWanted] = useState<string[]>(['Video Editing']);
  const [tempWantedSkill, setTempWantedSkill] = useState('');

  // Availability
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday']);
  const [selectedSlots, setSelectedSlots] = useState<string[]>(['10:00 AM', '02:00 PM']);

  // Portfolio
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioDesc, setPortfolioDesc] = useState('');
  const [portfolioImage, setPortfolioImage] = useState('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400&h=250');
  const [addedPortfolios, setAddedPortfolios] = useState<{ title: string; description: string; image: string }[]>([]);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeslotsList = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  // Add teaching skill
  const handleAddSkill = () => {
    if (skillsTaught.some(s => s.skill === tempSkill)) return;
    setSkillsTaught([...skillsTaught, { skill: tempSkill, level: tempLevel }]);
  };

  // Remove teaching skill
  const handleRemoveSkill = (skillName: string) => {
    setSkillsTaught(skillsTaught.filter(s => s.skill !== skillName));
  };

  // Add wanted skill
  const handleAddWantedSkill = () => {
    if (!tempWantedSkill.trim()) return;
    if (skillsWanted.includes(tempWantedSkill.trim())) return;
    setSkillsWanted([...skillsWanted, tempWantedSkill.trim()]);
    setTempWantedSkill('');
  };

  // Remove wanted skill
  const handleRemoveWantedSkill = (skillName: string) => {
    setSkillsWanted(skillsWanted.filter(s => s !== skillName));
  };

  // Add portfolio
  const handleAddPortfolio = () => {
    if (!portfolioTitle.trim() || !portfolioDesc.trim()) return;
    setAddedPortfolios([...addedPortfolios, {
      title: portfolioTitle,
      description: portfolioDesc,
      image: portfolioImage
    }]);
    setPortfolioTitle('');
    setPortfolioDesc('');
  };

  // Toggle Days
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Toggle Slots
  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const [formDone, setFormDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillsTaught.length === 0) {
      alert("Please declare at least one skill you can teach to help the study swaps catalog!");
      return;
    }

    const newTutor: Tutor = {
      id: `t_user_${Date.now()}`,
      name,
      avatar,
      course,
      year: Number(year),
      rating: 5.0,
      reviewCount: 0,
      bio: bio.trim() || `Year ${year} student of ${course} ready to help peer scholars swap values in the university library corridors. Let's study!`,
      skillsTaught,
      skillsWanted,
      availability: {
        days: selectedDays.length > 0 ? selectedDays : ['Monday', 'Wednesday'],
        slots: selectedSlots.length > 0 ? selectedSlots : ['10:00 AM', '02:00 PM']
      },
      portfolio: addedPortfolios.length > 0 ? addedPortfolios : [
        {
          title: "General Study Notes",
          description: `Comprehensive study summaries for ${course} students.`,
          image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&h=250"
        }
      ]
    };

    setFormDone(true);
    setTimeout(() => {
      onSubmitTutor(newTutor);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Upper header navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 px-3 py-1.5 rounded-lg shadow-sm"
        >
          ← Back to Catalog
        </button>
        <span className="text-xs text-gray-400">QIU Registration Dashboard</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Register as a Peer Tutor</h1>
        <p className="text-sm text-gray-500">
          Share your skillset, list subjects you wish to trade, and let peers browse your availability calendars.
        </p>
      </div>

      {formDone ? (
        <div className="bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-950 p-8 rounded-3xl shadow-xl text-center space-y-4 py-16 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Registered Successfully!</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Your scholar stats have been compiled. {name} is now listed on the <strong>Explore Skills</strong> directory page.
          </p>
          <div className="h-1 w-24 bg-emerald-100 dark:bg-emerald-950 mx-auto rounded-full overflow-hidden mt-6">
            <div className="h-full bg-emerald-500 rounded-full animate-pulse w-full" />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROFILE BASIC BLOCK */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                1. Basic Student Profile Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Avatar Portrait URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-500 outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Course major</label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-950 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Academics Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500"
                  >
                    {[1, 2, 3, 4].map(y => (
                      <option key={y} value={y}>Year {y} Undergraduate</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Profile Biography (About Me)</label>
                <textarea
                  placeholder="Tell campus peers what topics you specialize in, how you explain complex concepts, and your academic hobbies..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-850 bg-transparent text-gray-900 dark:text-white outline-none focus:border-blue-500 min-h-[100px]"
                />
              </div>
            </div>

            {/* DECLARED SKILLS TO TEACH & LEARN */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                2. Subject Trades (Skills Shared & Needed)
              </h3>

              {/* Teaching skills picker */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-950/20 border border-gray-100 dark:border-gray-850 space-y-3">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Add a Skill you can teach to others:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[9px] uppercase font-bold text-gray-400">Select Topic Area</label>
                      <select
                        value={tempSkill}
                        onChange={(e) => setTempSkill(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400">Skill Level</label>
                      <select
                        value={tempLevel}
                        onChange={(e) => setTempLevel(e.target.value as SkillLevel)}
                        className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Include Teaching Topic</span>
                  </button>
                </div>

                {/* List of active skills taught */}
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase">Listed Skills I Teach ({skillsTaught.length})</span>
                  {skillsTaught.length === 0 ? (
                    <p className="text-xs text-red-500 italic">Please include at least one teaching topic.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skillsTaught.map((s) => (
                        <div key={s.skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 border border-blue-100 text-xs font-semibold">
                          <span>{s.skill} ({s.level})</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(s.skill)}
                            className="text-red-500 hover:text-red-700 font-bold ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-950/20 border border-gray-100 dark:border-gray-850 space-y-3">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Add a Skill you want to learn:</span>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="e.g. Adobe Premiere, Finance Modeling, German"
                      value={tempWantedSkill}
                      onChange={(e) => setTempWantedSkill(e.target.value)}
                      className="flex-1 text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddWantedSkill}
                      className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase">My Learning Demands ({skillsWanted.length})</span>
                  {skillsWanted.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No specific learning demands added yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skillsWanted.map((s) => (
                        <div key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300 border border-indigo-150/40 text-xs font-semibold">
                          <span>{s}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveWantedSkill(s)}
                            className="text-red-500 hover:text-red-700 font-bold ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* PORTFOLIO DEMO BLOCK */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                3. Portfolio Project (Optional)
              </h3>

              <div className="p-4 bg-gray-50/50 dark:bg-gray-950/25 border border-gray-100 dark:border-gray-850 rounded-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 block">Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Photoshop Branding Sheets"
                      value={portfolioTitle}
                      onChange={(e) => setPortfolioTitle(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 block">Cover Media Image URL</label>
                    <input
                      type="text"
                      value={portfolioImage}
                      onChange={(e) => setPortfolioImage(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 block">Brief Project Description</label>
                  <input
                    type="text"
                    placeholder="Short summary describing what tools you mastered or constructed."
                    value={portfolioDesc}
                    onChange={(e) => setPortfolioDesc(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddPortfolio}
                  className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition"
                >
                  Append Project Card
                </button>
              </div>

              {addedPortfolios.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {addedPortfolios.map((proj, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-gray-50/50 space-y-1 text-left">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{proj.title}</h4>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHTHAND: AVAILABILITY DAYS & REGISTER ACTION BUTTON */}
          <div className="space-y-6">
            
            {/* WEEKDAY AVAILABILITY */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Select Availability Days
              </h3>

              <div className="grid grid-cols-2 gap-1.5">
                {weekdays.map((day) => {
                  const selected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`text-left text-xs py-2 px-3 rounded-lg border transition-all truncate font-semibold ${
                        selected
                          ? 'bg-blue-600 text-white border-blue-650 shadow-sm'
                          : 'border-gray-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {selected ? '✓ ' : ''}{day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TIMESLOTS AVAILABILITY */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                Select Hourly Slots
              </h3>

              <div className="grid grid-cols-2 gap-1.5 max-h-[180px] overflow-y-auto pr-1">
                {timeslotsList.map((slot) => {
                  const selected = selectedSlots.includes(slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleSlot(slot)}
                      className={`text-left text-[11px] py-1.5 px-2.5 rounded-lg border transition-all truncate font-semibold ${
                        selected
                          ? 'bg-emerald-600 text-white border-emerald-650 shadow-sm'
                          : 'border-gray-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {selected ? '✓ ' : ''}{slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION FOOTER */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-blue-650 hover:bg-blue-700 text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Register In Peer Catalog</span>
            </button>

            <p className="text-[10px] text-gray-400 text-center leading-normal">
              By listing your profile, you agree to fulfill student peer swap sessions in public areas or scheduled virtual rooms under university guidelines.
            </p>

          </div>

        </form>
      )}

    </div>
  );
}
