import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Paperclip, Smile, Image, Phone, Video,
  Info, Circle, CheckCheck, Loader2, ArrowLeft 
} from 'lucide-react';
import { ChatSession, Message } from '../types';

interface ChatViewProps {
  chatSessions: ChatSession[];
  activeSessionId: string;
  setActiveSessionId: (id: string | '') => void;
  onSendMessage: (sessionId: string, text: string, file?: Message['file']) => void;
}

export default function ChatView({
  chatSessions,
  activeSessionId,
  setActiveSessionId,
  onSendMessage
}: ChatViewProps) {
  const [typedText, setTypedText] = useState('');
  const [mockTyping, setMockTyping] = useState<string | null>(null);
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const [mockAttachment, setMockAttachment] = useState<{name: string, size: string} | null>(null);

  const activeSession = chatSessions.find(s => s.id === activeSessionId);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, mockTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedText.trim() && !mockAttachment) return;

    const filePayload = mockAttachment ? {
      name: mockAttachment.name,
      size: mockAttachment.size,
      type: 'document/pdf'
    } : undefined;

    onSendMessage(activeSessionId, typedText, filePayload);
    
    setTypedText('');
    setMockAttachment(null);
    setShowEmojiBox(false);
  };

  const appendEmoji = (emoji: string) => {
    setTypedText(prev => prev + emoji);
    setShowEmojiBox(false);
  };

  const handleMockAttachFile = () => {
    // Toggle a mockup attachment
    if (mockAttachment) {
      setMockAttachment(null);
    } else {
      setMockAttachment({
        name: 'Syllabus_HCI_Review.pdf',
        size: '1.4 MB'
      });
    }
  };

  const defaultEmojis = ['👍', '🙌', '🔥', '💡', '💯', '🎓', '😄', '💻', '🤔'];

  return (
    <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden h-[600px] flex animate-in fade-in duration-300">
      
      {/* 1. PEER CHAT TIMELINE LIST (Lefthand List on Large pane, toggle list on mobile) */}
      <div className={`w-full md:w-80 border-r border-gray-100 dark:border-gray-850 flex flex-col shrink-0 ${activeSessionId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100 dark:border-gray-850">
          <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Student Messages</span>
          <p className="text-[10px] text-gray-500 mt-0.5">Active huddle conversations</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-850/30 p-2 space-y-1">
          {chatSessions.map((session) => {
            const lastMsg = session.messages[session.messages.length - 1];
            return (
              <div
                key={session.id}
                onClick={() => {
                  setActiveSessionId(session.id);
                  session.unread = false;
                }}
                className={`flex gap-3 p-3.5 rounded-2xl cursor-pointer transition-colors relative ${
                  activeSessionId === session.id
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 border border-blue-100/30 dark:border-blue-900/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }`}
              >
                {/* Active indicators */}
                {session.unread && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                )}

                <div className="relative shrink-0">
                  <img
                    src={session.tutorAvatar}
                    alt={session.tutorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-950 ${
                    session.online ? 'bg-emerald-500' : 'bg-gray-300'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">{session.tutorName}</h3>
                  </div>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{session.tutorCourse}</p>
                  {lastMsg && (
                    <p className="text-[10.5px] text-gray-500 dark:text-gray-400 truncate mt-2">
                      {lastMsg.senderId === 'current_user' ? 'Me: ' : ''}{lastMsg.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CHAT FEED & MESSAGE CHIPS (Hidden if no active chat selection on mobile) */}
      <div className={`flex-1 flex flex-col justify-between bg-gray-50/30 dark:bg-gray-950/20 ${activeSessionId ? 'flex' : 'hidden md:flex'}`}>
        {activeSession ? (
          <>
            {/* Top Toolbar */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveSessionId('')}
                  className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  aria-label="Back to messages list"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative shrink-0">
                  <img
                    src={activeSession.tutorAvatar}
                    alt={activeSession.tutorName}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white dark:border-gray-900 ${
                    activeSession.online ? 'bg-emerald-500' : 'bg-gray-300'
                  }`} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-none">{activeSession.tutorName}</h3>
                  <span className="text-[10px] text-gray-400 mt-1 block">{activeSession.tutorCourse}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-not-allowed" aria-label="Audio call mockup"><Phone className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-not-allowed" aria-label="Video call mockup"><Video className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-not-allowed" aria-label="Tutor info huddle"><Info className="w-4 h-4" /></button>
              </div>
            </div>

            {/* MESSAGE CONTAINER BUBBLES */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {activeSession.messages.map((m) => {
                const isMe = m.senderId === 'current_user';
                return (
                  <div
                    key={m.id}
                    className={`flex items-end gap-2.5 max-w-lg ${
                      isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={activeSession.tutorAvatar}
                        alt="Tutor avatar"
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}
                    
                    <div className="space-y-1">
                      <div className={`p-3.5 rounded-2xl text-xs space-y-1 border ${
                        isMe 
                          ? 'bg-blue-600 text-white border-blue-500 rounded-br-none' 
                          : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-250 border-gray-100 dark:border-gray-850 rounded-bl-none'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        
                        {/* Render attachment block if exists */}
                        {m.file && (
                          <div className={`p-2 rounded-xl mt-2 flex items-center gap-2 border text-[10px] ${
                            isMe 
                              ? 'bg-blue-700/80 border-blue-800 text-white' 
                              : 'bg-gray-50 dark:bg-gray-950 border-gray-150 text-gray-700 dark:text-gray-300'
                          }`}>
                            <Paperclip className="w-3.5 h-3.5 text-blue-300" />
                            <div className="min-w-0 flex-1">
                              <p className="font-bold truncate">{m.file.name}</p>
                              <p className="text-[8px] opacity-70">{m.file.size}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center gap-1 text-[9px] text-gray-400 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span>{m.timestamp}</span>
                        {isMe && <CheckCheck className="w-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dynamic Colleague typing huddle */}
              {mockTyping && (
                <div className="flex items-center gap-2 text-gray-400 text-[11px] animate-pulse py-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  <span>{mockTyping} is typing a response...</span>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>

            {/* INPUT PANEL WITH ATTACHMENT BOX & EMOJIS */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900 space-y-3 relative">
              {/* Draft file attachment feedback */}
              {mockAttachment && (
                <div className="px-3.5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-150 text-xs flex justify-between items-center animate-in slide-in-from-bottom-2 duration-150">
                  <span className="font-semibold text-blue-800 dark:text-blue-300 text-[11px]">📎 Ready to send: {mockAttachment.name}</span>
                  <button onClick={() => setMockAttachment(null)} className="text-[10px] text-gray-400 hover:text-gray-600">Remove</button>
                </div>
              )}

              {/* Collapsible emoji picker panel */}
              {showEmojiBox && (
                <div className="absolute bottom-16 left-4 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 rounded-2xl p-2.5 shadow-xl flex gap-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                  {defaultEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => appendEmoji(emoji)}
                      className="text-lg p-1.5 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-lg active:scale-90 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={handleMockAttachFile}
                  className={`p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors ${mockAttachment ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}
                  title="Attach Syllabus Doc"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowEmojiBox(!showEmojiBox)}
                  className={`p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 text-gray-400 transition-colors ${showEmojiBox ? 'text-blue-600 bg-blue-50' : ''}`}
                >
                  <Smile className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  placeholder="Reviewing recursion stack? Send a text message here..."
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  className="flex-1 text-xs py-3 px-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white outline-none focus:border-blue-500"
                />

                <button
                  type="submit"
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Smile className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Start a Campus Huddle Chat</h3>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Connect with peer tutors directly. Coordinate syllabus folders, clarify exam dates, or trade help.
              </p>
            </div>
            <p className="text-[10px] text-gray-400 italic">Select a student on the left panel to begin.</p>
          </div>
        )}
      </div>

    </div>
  );
}
