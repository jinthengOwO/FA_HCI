import React, { useState } from 'react';
import { 
  ThumbsUp, MessageSquare, Plus, Search, Tag, 
  Send, Users, HelpCircle, Award, Sparkles, Compass,
  Trash2
} from 'lucide-react';
import { ForumPost } from '../types';

interface CommunityViewProps {
  posts: ForumPost[];
  onCreatePost: (postData: {
    title: string;
    content: string;
    category: 'Request' | 'Guidance' | 'General' | 'Resource';
    tags: string[];
  }) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onDeletePost?: (postId: string) => void;
}

export default function CommunityView({
  posts,
  onCreatePost,
  onLikePost,
  onAddComment,
  onDeletePost
}: CommunityViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchVal, setSearchVal] = useState<string>('');
  
  // Post Creator State
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Request' | 'Guidance' | 'General' | 'Resource'>('Request');
  const [newTagsStr, setNewTagsStr] = useState('');

  // Comment overlay drawers for exact postId
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentVal, setNewCommentVal] = useState('');

  const trendingTopics = [
    { name: 'PitchFest', count: 42 },
    { name: 'Python', count: 35 },
    { name: 'ExcelMacros', count: 28 },
    { name: 'Portfolio', count: 21 },
    { name: 'HCI', count: 19 }
  ];

  // Dynamic filter
  const filteredPosts = posts.filter(post => {
    const categoryMatches = activeCategory === 'All' || post.category === activeCategory;
    const searchMatches = searchVal === '' || 
      post.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      post.content.toLowerCase().includes(searchVal.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchVal.toLowerCase())) ||
      post.authorName.toLowerCase().includes(searchVal.toLowerCase());
    return categoryMatches && searchMatches;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    // split tags
    const tagsArray = newTagsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onCreatePost({
      title: newTitle,
      content: newContent,
      category: newCategory,
      tags: tagsArray.length > 0 ? tagsArray : ['General']
    });

    // Reset UI
    setNewTitle('');
    setNewContent('');
    setNewTagsStr('');
    setNewCategory('Request');
    setShowCreateCard(false);
  };

  const handleCommentSubmit = (postId: string) => {
    if (!newCommentVal.trim()) return;
    onAddComment(postId, newCommentVal);
    setNewCommentVal('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">QIU Student Boards</h1>
          <p className="text-sm text-gray-500">
            Post requests for assistance, review slide decks, or huddle before midterms
          </p>
        </div>
        <button
          onClick={() => setShowCreateCard(!showCreateCard)}
          className="sm:self-center px-4.5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFTHAND NAVIGATION & TRENDING TAGS */}
        <div className="space-y-6 lg:col-span-1">
          {/* Categories Nav */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-1 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider px-3 block mb-2">Boards Channels</span>
            {[
              { id: 'All', name: 'All Discussions', icon: Compass },
              { id: 'Request', name: '🤝 Swap Requests', icon: HelpCircle },
              { id: 'Resource', name: '📚 Share Resources', icon: Award },
              { id: 'Guidance', name: '🎓 Course Advice', icon: Sparkles },
              { id: 'General', name: '💬 General Lounge', icon: Users }
            ].map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveCategory(ch.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold select-none transition-all ${
                  activeCategory === ch.id
                    ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }`}
              >
                <ch.icon className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{ch.name}</span>
              </button>
            ))}
          </div>

          {/* Trending Panel */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              Trending tags
            </h3>
            <div className="space-y-2.5">
              {trendingTopics.map(tag => (
                <button
                  key={tag.name}
                  onClick={() => setSearchVal(tag.name)}
                  className="w-full flex justify-between text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>#{tag.name}</span>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-950 px-1.5 py-0.5 rounded">
                    {tag.count} posts
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FORUM CONTAINER AREA */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* SEARCH INPUT BAR */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search request tags, keywords, titles or specific courses..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full text-xs p-3.5 pl-9 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* DYNAMIC COLLAPSIBLE POST GENERATOR */}
          {showCreateCard && (
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/20 to-white dark:from-gray-900 dark:to-gray-950 p-6 shadow-md animate-in slide-in-from-top-4 duration-300 space-y-4 relative">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Compose Peer Announcement</span>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Title: e.g. Stuck on React state variables or looking for German huddle"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-400 outline-none focus:border-blue-500"
                    >
                      <option value="Request">🤝 Swap Request</option>
                      <option value="Resource">📚 Share Resources</option>
                      <option value="Guidance">🎓 Course Advice</option>
                      <option value="General">💬 General Lounge</option>
                    </select>
                  </div>
                </div>

                <textarea
                  placeholder="Provide brief details on what you can discuss, what you would swap in exchange, and your available slot huddles this week..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white outline-none focus:border-blue-500 min-h-[90px]"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tags: comma separated (e.g. Canva, Adobe, Python)"
                    value={newTagsStr}
                    onChange={(e) => setNewTagsStr(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateCard(false)}
                      className="px-4 py-2.5 text-xs text-gray-400 hover:text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                    >
                      Broadcast Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* CHANNELS POST GRID */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900 text-center py-16 space-y-4">
                <p className="text-gray-400 text-xs">No posts matched your active channel or keyword filters.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchVal('');
                  }}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-950/20 text-blue-650 rounded-xl text-xs font-bold"
                >
                  Reset Board Search
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isCommenting = activeCommentPostId === post.id;
                return (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-5 md:p-6 space-y-4 shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-xs text-gray-900 dark:text-white">{post.authorName}</h3>
                            <span className="text-[10px] text-gray-400">• {post.date}</span>
                          </div>
                          <p className="text-[10px] text-gray-450">{post.authorCourse}</p>
                        </div>
                      </div>

                      {/* Pill & Trash */}
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          post.category === 'Request' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300' :
                          post.category === 'Resource' ? 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300' :
                          post.category === 'Guidance' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {post.category}
                        </span>
                        {post.authorName === 'Hooi Jin Theng' && onDeletePost && (
                          <button
                            id={`delete-post-${post.id}`}
                            onClick={() => onDeletePost(post.id)}
                            className="p-1 px-1.5 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-350 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                            title="Delete your post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-sm text-gray-950 dark:text-white leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-650 dark:text-gray-300 leading-normal">
                        {post.content}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10.5px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Controls row */}
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => onLikePost(post.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                            post.likedByUser 
                              ? 'text-blue-600' 
                              : 'text-gray-450 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${post.likedByUser ? 'fill-current scale-110' : ''}`} />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          onClick={() => setActiveCommentPostId(isCommenting ? null : post.id)}
                          className="flex items-center gap-1.5 text-xs text-gray-450 hover:text-gray-900 dark:hover:text-white font-semibold"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments.length} comments</span>
                        </button>
                      </div>
                    </div>

                    {/* COLLAPSIBLE COMMENTS LISTING AND ADD COMMENT */}
                    {isCommenting && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-850 space-y-4 animate-in slide-in-from-bottom-2 duration-200">
                        
                        {/* Comments loop */}
                        <div className="space-y-3">
                          {post.comments.length > 0 ? (
                            post.comments.map(c => (
                              <div key={c.id} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-850 block space-y-1 text-xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={c.authorAvatar}
                                      alt={c.authorName}
                                      referrerPolicy="no-referrer"
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="font-extrabold text-[11px] text-gray-950 dark:text-white">{c.authorName}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400">{c.date}</span>
                                </div>
                                <p className="text-xs text-gray-650 dark:text-gray-300 pl-8 leading-normal mt-1">{c.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[11px] text-gray-400 italic text-center py-2">No comments posted yet. Spark the discussion!</p>
                          )}
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add your reply or helpful resource link..."
                            value={newCommentVal}
                            onChange={(e) => setNewCommentVal(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCommentSubmit(post.id);
                            }}
                            className="flex-1 text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white outline-none focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleCommentSubmit(post.id)}
                            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl active:scale-95 transition-all"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
