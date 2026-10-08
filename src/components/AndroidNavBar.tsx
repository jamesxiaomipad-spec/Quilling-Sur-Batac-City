import React from 'react';
import { Newspaper, Home, MapPin, Navigation, UtensilsCrossed, MessageSquareText } from 'lucide-react';
import { AppTab } from '../types';

interface AndroidNavBarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  forumBadgeCount?: number;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  activeTab,
  onTabChange,
  forumBadgeCount = 0,
}) => {
  const tabs: { id: AppTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'updates',
      label: 'Updates',
      icon: <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'dorms',
      label: 'Dorms',
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'map',
      label: 'Map',
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'transport',
      label: 'Transit',
      icon: <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'spots',
      label: 'Explore',
      icon: <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'forum',
      label: 'Forum',
      icon: <MessageSquareText className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: forumBadgeCount,
    },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 sticky bottom-0 z-30 pb-safe select-none shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-xl mx-auto grid grid-cols-6 px-1 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group flex flex-col items-center justify-center py-1 transition-all relative focus:outline-none"
            >
              <div
                className={`flex items-center justify-center px-2.5 sm:px-3 py-1 rounded-full transition-all duration-300 relative ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 scale-105 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center shadow">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors truncate max-w-full ${
                  isActive ? 'text-emerald-300 font-bold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
