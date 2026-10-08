import React, { useState, useEffect } from 'react';
import { AppTab, LocalUpdate, Dormitory, ForumPost } from './types';
import {
  INITIAL_UPDATES,
  INITIAL_DORMS,
  TRANSPORT_ROUTES,
  DRIVER_CONTACTS,
  TOURISM_SPOTS,
  INITIAL_FORUM_POSTS,
  EMERGENCY_CONTACTS,
  ILOCANO_PHRASES
} from './data/mockData';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidTopBar } from './components/AndroidTopBar';
import { AndroidNavBar } from './components/AndroidNavBar';
import { UpdatesTab } from './components/UpdatesTab';
import { DormsTab } from './components/DormsTab';
import { TransportTab } from './components/TransportTab';
import { SpotsTab } from './components/SpotsTab';
import { ForumTab } from './components/ForumTab';
import { QuilingSurGoogleMap } from './components/QuilingSurGoogleMap';
import { EmergencyModal } from './components/EmergencyModal';
import { DormDetailModal } from './components/DormDetailModal';
import { MapViewModal } from './components/MapViewModal';
import { NewPostModal } from './components/NewPostModal';
import { UpdateDetailModal } from './components/UpdateDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('updates');
  const [isFramed, setIsFramed] = useState<boolean>(false);

  // Data states with LocalStorage persistence
  const [updates, setUpdates] = useState<LocalUpdate[]>(() => {
    const saved = localStorage.getItem('quiling_updates');
    return saved ? JSON.parse(saved) : INITIAL_UPDATES;
  });

  const [dorms] = useState<Dormitory[]>(INITIAL_DORMS);
  const [routes] = useState(TRANSPORT_ROUTES);
  const [drivers] = useState(DRIVER_CONTACTS);
  const [spots] = useState(TOURISM_SPOTS);

  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('quiling_forum_posts');
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  });

  // Modal states
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [selectedDorm, setSelectedDorm] = useState<Dormitory | null>(null);
  const [selectedUpdate, setSelectedUpdate] = useState<LocalUpdate | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('quiling_updates', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem('quiling_forum_posts', JSON.stringify(posts));
  }, [posts]);

  // Handlers for updates
  const handleLikeUpdate = (id: string) => {
    setUpdates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  // Handlers for forum
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author: 'You (MMSU Stallion)',
      authorRole: 'MMSU Student' as const,
      avatarColor: 'bg-emerald-600',
      content: text,
      timestamp: 'Just now',
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, newComment],
            }
          : p
      )
    );
  };

  const handleCreatePost = (newPostData: Omit<ForumPost, 'id' | 'timestamp' | 'likes' | 'comments'>) => {
    const post: ForumPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      likes: 1,
      comments: [],
    };
    setPosts((prev) => [post, ...prev]);
    setActiveTab('forum');
  };

  // Direct phone call handler
  const handleDirectCall = (phone: string, title: string) => {
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    window.location.href = `tel:${cleanPhone}`;
  };

  const handleSelectDormById = (id: string) => {
    const match = dorms.find((d) => d.id === id);
    if (match) setSelectedDorm(match);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start antialiased selection:bg-emerald-500 selection:text-white">
      {/* Container wrapper: full screen on mobile, optional Android bezel frame on desktop */}
      <div
        className={`w-full transition-all duration-300 flex flex-col min-h-screen ${
          isFramed
            ? 'max-w-md my-0 md:my-6 rounded-none md:rounded-[42px] border-0 md:border-[10px] md:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden bg-slate-950'
            : 'max-w-xl mx-auto border-x border-slate-900 bg-slate-950 shadow-2xl'
        }`}
      >
        {/* Android Simulated Status Bar */}
        <AndroidStatusBar />

        {/* Android Top App Bar */}
        <AndroidTopBar
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenMap={() => setActiveTab('map')}
          isFramed={isFramed}
          onToggleFrame={() => setIsFramed(!isFramed)}
        />

        {/* Main Content Area */}
        <main className={`flex-1 ${activeTab === 'map' ? 'p-2 sm:p-3' : 'px-3.5 sm:px-4 pt-3.5'}`}>
          {activeTab === 'updates' && (
            <UpdatesTab
              updates={updates}
              onAddUpdate={() => setIsNewPostOpen(true)}
              onLikeUpdate={handleLikeUpdate}
              onSelectUpdate={(u) => setSelectedUpdate(u)}
            />
          )}

          {activeTab === 'dorms' && (
            <DormsTab
              dorms={dorms}
              onSelectDorm={(d) => setSelectedDorm(d)}
              onDirectCall={handleDirectCall}
              onSwitchToMap={() => setActiveTab('map')}
            />
          )}

          {activeTab === 'map' && (
            <QuilingSurGoogleMap
              dorms={dorms}
              spots={spots}
              onSelectDorm={(d) => setSelectedDorm(d)}
              onCallLandlord={handleDirectCall}
            />
          )}

          {activeTab === 'transport' && (
            <TransportTab
              routes={routes}
              drivers={drivers}
              onDirectCallDriver={handleDirectCall}
            />
          )}

          {activeTab === 'spots' && (
            <SpotsTab
              spots={spots}
              phrases={ILOCANO_PHRASES}
            />
          )}

          {activeTab === 'forum' && (
            <ForumTab
              posts={posts}
              onAddPost={() => setIsNewPostOpen(true)}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
            />
          )}
        </main>

        {/* Android Bottom Navigation Bar */}
        <AndroidNavBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          forumBadgeCount={posts.length}
        />
      </div>

      {/* Modals & Dialog Sheets */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        contacts={EMERGENCY_CONTACTS}
      />

      <DormDetailModal
        dorm={selectedDorm}
        onClose={() => setSelectedDorm(null)}
        onCall={handleDirectCall}
      />

      <MapViewModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelectDormById={handleSelectDormById}
      />

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSubmit={handleCreatePost}
      />

      <UpdateDetailModal
        update={selectedUpdate}
        onClose={() => setSelectedUpdate(null)}
        onLike={handleLikeUpdate}
      />
    </div>
  );
}
