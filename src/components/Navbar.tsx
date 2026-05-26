import React, { useState } from 'react';
import { 
  Menu, X, Bell, Moon, Sun, BookOpen, MessageSquare, 
  User, Compass, Award, Users, GraduationCap, Check
} from 'lucide-react';
import { SystemNotification } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  notifications: SystemNotification[];
  markNotificationsAsRead: () => void;
  onOpenOnboarding: () => void;
}

export default function Navbar({
  currentView,
  setView,
  darkMode,
  setDarkMode,
  notifications,
  markNotificationsAsRead,
  onOpenOnboarding
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore Skills', icon: GraduationCap },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badgeCount: 1 }, // mockup Badge
    { id: 'dashboard', label: 'Dashboard', icon: User }
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setMobileMenuOpen(false);
  };

  const toggleNotifDropdown = () => {
    setNotifDropdownOpen(!notifDropdownOpen);
    if (!notifDropdownOpen && unreadCount > 0) {
      // Mark as read after viewing
      markNotificationsAsRead();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                SkillSwap
              </span>
              <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                QIU
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  id={`nav-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : ''}`} />
                  {item.label}
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  ) : null}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Onboarding Tour Button */}
            <button
              onClick={onOpenOnboarding}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-900/30 transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Tour Guide</span>
            </button>

            {/* Dark Mode Icon */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Notifications Alert Icon */}
            <div className="relative">
              <button
                id="notification-panel-btn"
                onClick={toggleNotifDropdown}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors relative"
                aria-label="Toggle notifications panel"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900 animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 shadow-xl shadow-gray-200/30 dark:shadow-none z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">Recent Updates</span>
                    <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1 split-y divide-gray-100 dark:divide-gray-800">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-xs">
                        No notifications at this moment.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all flex gap-3 ${
                            !n.read ? 'bg-blue-50/20 dark:bg-blue-950/10' : ''
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            n.type === 'booking' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                            n.type === 'chat' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400' :
                            n.type === 'badge' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400' :
                            'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
                          }`}>
                            {n.type === 'booking' && <Check className="w-4 h-4" />}
                            {n.type === 'chat' && <MessageSquare className="w-4 h-4" />}
                            {n.type === 'badge' && <Award className="w-4 h-4" />}
                            {n.type === 'system' && <Bell className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className={`text-xs font-semibold text-gray-900 dark:text-white ${!n.read ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                {n.title}
                              </p>
                              <span className="text-[9px] text-gray-400 shrink-0 ml-1">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                              {n.description}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="pt-2 px-1 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => setNotifDropdownOpen(false)}
                      className="w-full text-center py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Trigger Dashboard */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 text-left shrink-0 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full ring-2 ring-blue-500/20 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Student Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pt-2 pb-4 space-y-1 animate-in fade-in slide-in-from-top-5 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/20 font-bold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                onOpenOnboarding();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/30"
            >
              <Award className="w-4 h-4" />
              Interactive Onboarding Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
