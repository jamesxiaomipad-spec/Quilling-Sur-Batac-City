import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  PlusCircle,
  Search,
  Send,
  Sparkles,
  Share2,
  CheckCircle2,
  Tag,
  Clock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { ForumPost, ForumComment } from '../types';

interface ForumTabProps {
  posts: ForumPost[];
  onAddPost: () => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

export const ForumTab: React.FC<ForumTabProps> = ({
  posts,
  onAddPost,
  onLikePost,
  onAddComment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Discussions' },
    { id: 'pasalo', label: '🏠 Pasalo & Roommate' },
    { id: 'campus', label: '🎓 MMSU Life' },
    { id: 'lost_found', label: '🔍 Lost & Found' },
    { id: 'buy_sell', label: '🏷️ Buy & Sell' },
    { id: 'safety', label: '🚨 Safety & TODA' },
    { id: 'barangay', label: '🏛️ Barangay Notice' },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleShare = (post: ForumPost) => {
    navigator.clipboard.writeText(`${post.title}\n${post.content}`);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'MMSU Student':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Quiling Sur Local':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Freshman':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Faculty/Staff':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Community Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-900 border border-teal-500/30 rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">
              Quiling Sur & MMSU Community
            </span>
            <h2 className="text-base font-extrabold text-white mt-0.5">
              Student & Local Information Board
            </h2>
          </div>
          <button
            onClick={onAddPost}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>
        <p className="text-xs text-slate-300 mt-2">
          Ask questions, find boarding house roommates (pasalo), trade textbooks/uniforms, report lost items, or share tricycle tips.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions, pasalo rooms, lost items..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat.id
                  ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-3.5">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-300 font-semibold text-sm">No discussions found</p>
            <p className="text-slate-500 text-xs mt-1">Be the first to share something with Quiling Sur and MMSU!</p>
            <button
              onClick={onAddPost}
              className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Write First Post
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsOpen = expandedComments[post.id];
            return (
              <div
                key={post.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-750 transition space-y-3"
              >
                {/* Author row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl ${post.avatarColor} text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow`}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-white text-xs">{post.author}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getRoleBadge(
                            post.authorRole
                          )}`}
                        >
                          {post.authorRole}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {post.isPinned && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Pinned
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-extrabold text-white text-sm leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Contact Hint if provided */}
                {post.contactHint && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <span>{post.contactHint}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(post.contactHint || '');
                        alert('Contact copied to clipboard!');
                      }}
                      className="text-[11px] font-bold text-emerald-400 hover:underline"
                    >
                      Copy Contact
                    </button>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Upvote button */}
                    <button
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-rose-400 text-xs font-semibold transition active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comments toggle */}
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-teal-300 text-xs font-semibold transition active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                      <span>{post.comments.length} replies</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-white text-xs transition"
                  >
                    {copiedPostId === post.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Comment Section (Collapsible) */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-800 space-y-3 bg-slate-950/60 p-3 rounded-xl mt-2 animate-in fade-in duration-150">
                    {/* Comments list */}
                    {post.comments.length === 0 ? (
                      <p className="text-[11px] text-slate-500 text-center py-1">
                        No replies yet. Join the conversation!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {post.comments.map((comm) => (
                          <div
                            key={comm.id}
                            className="bg-slate-900 border border-slate-800/80 rounded-xl p-2.5 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-200 text-[11px]">
                                  {comm.author}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400 font-medium">
                                  {comm.authorRole}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500">{comm.timestamp}</span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              {comm.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add reply input */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCommentSubmit(post.id);
                        }}
                        placeholder="Write a reply..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
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
  );
};
