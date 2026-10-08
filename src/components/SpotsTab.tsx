import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  Volume2,
  BookOpen,
  Tag,
  Share2,
  CheckCircle2,
  Search
} from 'lucide-react';
import { Spot, IlocanoPhrase } from '../types';

interface SpotsTabProps {
  spots: Spot[];
  phrases: IlocanoPhrase[];
}

export const SpotsTab: React.FC<SpotsTabProps> = ({ spots, phrases }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhraseTab, setActivePhraseTab] = useState<'all' | 'commute' | 'market' | 'greeting' | 'school'>('all');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'empanada_food', label: 'Empanada & Food' },
    { id: 'mmsu_landmark', label: 'MMSU Landmarks' },
    { id: 'heritage', label: 'Heritage & Culture' },
    { id: 'student_hub', label: 'Student Hubs' },
    { id: 'health_essential', label: 'Hospitals & Clinic' },
  ];

  const filteredSpots = spots.filter((spot) => {
    const matchesCat = selectedCategory === 'all' || spot.category === selectedCategory;
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredPhrases = phrases.filter((p) => {
    if (activePhraseTab === 'all') return true;
    return p.category === activePhraseTab;
  });

  const speakPhrase = (phrase: IlocanoPhrase) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.ilocano);
      utterance.lang = 'fil-PH'; // Filipino/Tagalog voice engine handles Ilocano phonetics well
      utterance.rate = 0.85; // slightly slower for learning
      utterance.onstart = () => setPlayingPhraseId(phrase.id);
      utterance.onend = () => setPlayingPhraseId(null);
      utterance.onerror = () => setPlayingPhraseId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Phonetic pronunciation: ${phrase.pronunciation}`);
    }
  };

  const copyPhrase = (phrase: IlocanoPhrase) => {
    navigator.clipboard.writeText(`${phrase.ilocano} (${phrase.english})`);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-orange-950 to-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <UtensilsCrossed className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
            Discover Batac & Quiling Sur
          </span>
        </div>
        <h2 className="text-base font-extrabold text-white">
          Culinary, Campus Heritage & Local Gems
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          From the legendary crispy Batac Empanada to MMSU Agritourism and student study spots along Quiling Sur.
        </p>
      </div>

      {/* Spots Category & Search */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search empanada, MMSU canopy, museum, hospital..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spot Cards List */}
      <div className="space-y-4">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition"
          >
            {/* Image */}
            <div className="relative h-44 w-full bg-slate-950">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Price level tag */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-xs font-bold text-amber-300">
                {spot.priceLevel}
              </div>

              {/* Distance from MMSU */}
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{spot.distanceFromMMSU}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-extrabold text-white text-base leading-snug">
                  {spot.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span>{spot.operatingHours}</span>
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {spot.description}
              </p>

              {/* Insider Tip Box */}
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200">
                <div className="flex items-center gap-1 font-bold text-amber-300 text-[11px] mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Local Insider Tip:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-100/90">{spot.mustTryOrTip}</p>
              </div>

              {/* Tags & Direct Google Maps CTA */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {spot.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    spot.googleMapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-300 text-xs font-semibold border border-slate-700 transition active:scale-95"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ilocano Student & Commuter Phrasebook */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-md">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">
                Ilocano Commuter & Freshman Phrasebook
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Essential everyday phrases with audio playback for students and visitors in Quiling Sur.
            </p>
          </div>
        </div>

        {/* Category Tabs for phrases */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'commute', label: 'Tricycle / Commute' },
            { id: 'market', label: 'Food & Market' },
            { id: 'greeting', label: 'Greetings' },
            { id: 'school', label: 'Campus & Dorm' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActivePhraseTab(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                activePhraseTab === cat.id
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Phrases List */}
        <div className="space-y-2.5">
          {filteredPhrases.map((phrase) => {
            const isPlaying = playingPhraseId === phrase.id;
            return (
              <div
                key={phrase.id}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1.5 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-emerald-300 block">
                      "{phrase.ilocano}"
                    </span>
                    <span className="text-[11px] text-slate-300 mt-0.5 block">
                      <strong className="text-slate-400">EN:</strong> {phrase.english}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      <strong className="text-slate-500">TL:</strong> {phrase.tagalog}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => speakPhrase(phrase)}
                      className={`p-2 rounded-lg transition active:scale-95 ${
                        isPlaying
                          ? 'bg-emerald-500 text-slate-950 font-bold animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-emerald-400'
                      }`}
                      title="Listen to Ilocano pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyPhrase(phrase)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                      title="Copy phrase"
                    >
                      {copiedId === phrase.id ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Phonetics */}
                <div className="text-[10px] text-amber-300/80 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 inline-block">
                  Pronounce: {phrase.pronunciation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
