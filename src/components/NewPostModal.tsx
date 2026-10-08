import React, { useState } from 'react';
import { X, Send, Sparkles, Tag, UserCheck, MessageSquare } from 'lucide-react';
import { ForumPost } from '../types';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<ForumPost, 'id' | 'timestamp' | 'likes' | 'comments'>) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState<'MMSU Student' | 'Quiling Sur Local' | 'Freshman' | 'Faculty/Staff'>('MMSU Student');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'campus' | 'pasalo' | 'buy_sell' | 'lost_found' | 'safety' | 'general'>('campus');
  const [tagInput, setTagInput] = useState('');
  const [contactHint, setContactHint] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const colors = [
      'bg-emerald-600',
      'bg-teal-600',
      'bg-amber-600',
      'bg-blue-600',
      'bg-purple-600',
      'bg-rose-600',
    ];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    onSubmit({
      author: author.trim() || 'Anonymous Stallion',
      authorRole,
      avatarColor,
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tags.length > 0 ? tags : ['QuilingSur', 'MMSU'],
      contactHint: contactHint.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <h3 className="font-extrabold text-white text-base">
              New Community Post
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto flex-1 text-xs">
          {/* Author & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Your Name or Handle:
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Maria (or leave blank)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Community Role:
              </label>
              <select
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="MMSU Student">MMSU Student</option>
                <option value="Quiling Sur Local">Quiling Sur Local</option>
                <option value="Freshman">Freshman</option>
                <option value="Faculty/Staff">Faculty / Staff</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Topic Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="campus">🎓 MMSU Campus Life</option>
              <option value="pasalo">🏠 Pasalo / Roommate Search</option>
              <option value="lost_found">🔍 Lost & Found</option>
              <option value="buy_sell">🏷️ Buy & Sell (Books, Uniforms)</option>
              <option value="safety">🚨 Safety, Tricycle & TODA</option>
              <option value="general">💬 General Tambayan</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Post Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pasalo solo room across CAS Gate 2 / Lost green ID lanyard"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Details & Information:
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide exact details, room inclusions, location, or item description..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Contact details for pasalo/lost items */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Contact Info (Optional):
            </label>
            <input
              type="text"
              value={contactHint}
              onChange={(e) => setContactHint(e.target.value)}
              placeholder="e.g. Call 0917-xxx-xxxx or FB: Juan Batac"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Tags (comma-separated):
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. Gate2, SoloRoom, Converge, CAS"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
