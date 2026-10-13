import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Heart, Shield, Share2, Compass, Home, Bookmark, CheckCircle, 
  ExternalLink, Search, Filter, AlertTriangle, X, ChevronRight, MessageSquare, 
  Sparkles, Award, Globe, Users, Lock, Info, Send, Check, ArrowRight, Menu, Bell
} from 'lucide-react';

// Typed Data Structure Types (Represented via JS Object structure for runtime)
/**
 * @typedef {Object} Story
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} content
 * @property {'Education' | 'Work' | 'Everyday Life' | 'Freedom' | 'Future Dreams'} category
 * @property {string} image
 * @property {boolean} fictional
 * @property {string} date
 * @property {string} age
 * @property {string} region
 */

/**
 * @typedef {Object} ActionItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'Advocate' | 'Educate' | 'Support' | 'Amplify'} category
 * @property {string} impact
 * @property {string} link
 * @property {boolean} completed
 */

const INITIAL_STORIES = [
  {
    id: '1',
    title: 'The Classroom in the Shadows',
    summary: 'When formal secondary education was banned, a former literature teacher turned her living room into a clandestine library for neighborhood girls.',
    content: 'Books are quiet, but they speak louder than any decree. Every morning at 7:00 AM, before the streets grow busy, seven young women arrive one by one holding grocery bags. Hidden inside are algebra notebooks and copies of classic literature. We read whisper-soft, but our minds soar. Education isn\'t just a diploma—it is the light by which we recognize our own humanity.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800',
    fictional: true,
    date: '2026-01-15',
    age: '24 (Representative)',
    region: 'Kabul'
  },
  {
    id: '2',
    title: 'Echoes from a Silent Codebase',
    summary: 'A computer science student continues her software development studies in secret through downloaded offline documentation.',
    content: 'They took away our physical campuses, but they could not erase the logic algorithms stored in my laptop. Operating strictly offline to preserve security, I teach myself React and Python. Code is universal; it recognizes no boundaries or restrictions. My dream is to build software that bridges marginalized creators with international open-source communities.',
    category: 'Work',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    fictional: true,
    date: '2026-02-02',
    age: '21 (Representative)',
    region: 'Herat'
  },
  {
    id: '3',
    title: 'Canvas of Resistance',
    summary: 'An artist paints miniature portraits on river stones, documenting the changing faces of her hometown.',
    content: 'Galleries are closed, and public art is forbidden. So I paint on small stones gathered from the dry riverbed. Each stone bears the eyes of a woman who refused to be erased. I leave these stones scattered discreetly along park paths and old alleyways for passersby to discover. A reminder that art endures even in darkness.',
    category: 'Freedom',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800',
    fictional: true,
    date: '2026-02-18',
    age: '27 (Representative)',
    region: 'Mazar-i-Sharif'
  },
  {
    id: '4',
    title: 'The Stethoscope on the Shelf',
    summary: 'A fifth-year medical student barred from completing her residency continues studying clinical guides at home.',
    content: 'My white lab coat hangs on my bedroom door. Every morning, I put it on for two hours while studying cardiology textbooks. Patients in my community still need medical assistance, and women doctors will always be essential. I practice diagnostic skills on my sisters and stay ready for the day hospitals open their doors to us again.',
    category: 'Future Dreams',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    fictional: true,
    date: '2026-03-01',
    age: '23 (Representative)',
    region: 'Kandahar'
  },
  {
    id: '5',
    title: 'Woven Resilience',
    summary: 'An artisan collective transforms traditional rug weaving into a economic support network for families.',
    content: 'When formal office employment ended, five former colleagues gathered to master traditional textile craft. Working from home, we create carpets featuring intricate geometric designs. Through a craft guild cooperative, these textiles reach international markets, allowing us to maintain economic self-reliance for our households.',
    category: 'Everyday Life',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=800',
    fictional: true,
    date: '2026-03-10',
    age: '30 (Representative)',
    region: 'Bamyan'
  }
];

const INITIAL_ACTIONS = [
  {
    id: 'a1',
    title: 'Amplify Verified Educational Initiatives',
    description: 'Share reports from UN Women and UNESCO to increase international public awareness regarding education access.',
    category: 'Amplify',
    impact: '+1 Action Recorded',
    link: 'https://www.unwomen.org/en/news-stories/feature-story/2023/08/women-in-afghanistan-rights-and-access-restrictions',
    completed: false
  },
  {
    id: 'a2',
    title: 'Support Global Scholarship Programs',
    description: 'Learn how international universities offer remote scholarships, digital libraries, and online certificates.',
    category: 'Educate',
    impact: '+1 Action Recorded',
    link: 'https://www.unesco.org/en/education/afghanistan',
    completed: false
  },
  {
    id: 'a3',
    title: 'Host an Educational Awareness Circle',
    description: 'Download human-rights advocacy toolkits to host informed discussions in your community or university.',
    category: 'Advocate',
    impact: '+1 Action Recorded',
    link: 'https://www.un.org/en/observances/womens-day',
    completed: false
  },
  {
    id: 'a4',
    title: 'Advocate for Digital Access Rights',
    description: 'Sign petition initiatives promoting open digital learning infrastructure and satellite connectivity for remote regions.',
    category: 'Support',
    impact: '+1 Action Recorded',
    link: 'https://www.unesco.org/en',
    completed: false
  }
];

const RESTRICTIONS_TIMELINE = [
  {
    year: 'August 2021',
    title: 'Secondary Education Suspended',
    description: 'Secondary schools were closed for girls above grade 6, affecting over 1.1 million students.',
    source: 'UNESCO Institute for Statistics'
  },
  {
    year: 'December 2022',
    title: 'University Access Suspended',
    description: 'Public and private higher education institutions were closed to female university students.',
    source: 'UN Women Situation Report'
  },
  {
    year: 'April 2023',
    title: 'Workplace Restrictions Expanded',
    description: 'Restrictions were extended to non-governmental organizations and UN agency female staff.',
    source: 'United Nations Afghanistan Special Mission'
  },
  {
    year: 'August 2024 - Present',
    title: 'Public Space Restrictions Enforced',
    description: 'Further limitations on public presence, travel without guardians, and recreational venue access.',
    source: 'UN Human Rights Office (OHCHR)'
  }
];


// Toast Notification Container Component
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B1020]/95 border border-[#8B5CF6] text-[#F8FAFC] px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md animate-bounce-short">
      <Sparkles className="w-5 h-5 text-[#E8C878] shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Consent Disclaimer Banner Component
const SafetyConsentNotice = () => (
  <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-2xl p-5 mb-8 text-[#94A3B8] text-sm leading-relaxed relative overflow-hidden">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#8B5CF6]/10 rounded-full blur-xl pointer-events-none"></div>
    <div className="flex items-start gap-4">
      <Shield className="w-6 h-6 text-[#E8C878] shrink-0 mt-0.5" />
      <div>
        <h4 className="text-[#F8FAFC] font-semibold text-base mb-1">Privacy & Safety Architectural Protocol</h4>
        <p>
          This platform is an educational human-rights advocacy prototype. All personal submissions are processed strictly on a local demonstration mode. <strong className="text-[#F8FAFC]">No real personal identifying details, addresses, or photos are ever transmitted or published to an active server.</strong>
        </p>
      </div>
    </div>
  </div>
);

// Accessible Story Modal Component
const StoryModal = ({ story, isOpen, onClose, isBookmarked, onToggleBookmark }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#0B1020] border border-[#8B5CF6]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
          <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-black/40"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0B1020]/70 text-[#F8FAFC] hover:bg-[#8B5CF6] transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="absolute bottom-4 left-6 bg-[#8B5CF6]/80 backdrop-blur-md text-[#F8FAFC] text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            {story.category}
          </span>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {story.fictional && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8C878]/10 text-[#E8C878] text-xs font-medium border border-[#E8C878]/30">
              <Info className="w-3.5 h-3.5" /> Fictional Narrative for Demo / Inspired by General Accounts
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#F8FAFC] leading-tight">
            {story.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-[#94A3B8] border-y border-[#8B5CF6]/20 py-3">
            <span>Region: <strong className="text-[#F8FAFC]">{story.region}</strong></span>
            <span>•</span>
            <span>Age: <strong className="text-[#F8FAFC]">{story.age}</strong></span>
            <span>•</span>
            <span>Published: <strong className="text-[#F8FAFC]">{story.date}</strong></span>
          </div>

          <div className="text-[#94A3B8] text-base leading-relaxed space-y-4">
            <p className="italic text-[#F8FAFC]/90 text-lg border-l-2 border-[#E8C878] pl-4">
              "{story.summary}"
            </p>
            <p>{story.content}</p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#8B5CF6]/20">
            <button
              onClick={() => onToggleBookmark(story.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isBookmarked 
                  ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30' 
                  : 'bg-[#8B5CF6]/10 text-[#F8FAFC] hover:bg-[#8B5CF6]/20'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
              {isBookmarked ? 'Saved in Archive' : 'Save Story'}
            </button>

            <button 
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('EN');
  
  // App Data States
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const [bookmarks, setBookmarks] = useState([]);
  const [actionCounter, setActionCounter] = useState(14820);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal State
  const [selectedStory, setSelectedStory] = useState(null);
  
  // Submission Form State
  const [storySubmission, setStorySubmission] = useState({
    title: '',
    category: 'Education',
    summary: '',
    content: '',
    region: 'Kabul',
    consent: false
  });
  
  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Toggle Bookmark logic
  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
      showToast('Story removed from your saved archive.');
    } else {
      setBookmarks([...bookmarks, id]);
      showToast('Story saved to your personal bookmark collection.');
    }
  };

  // Toggle Action Completion
  const toggleAction = (id) => {
    setActions(actions.map(act => {
      if (act.id === id) {
        const updated = !act.completed;
        if (updated) {
          setActionCounter(prev => prev + 1);
          showToast('Action logged! Thank you for standing in solidarity.');
        } else {
          setActionCounter(prev => prev - 1);
        }
        return { ...act, completed: updated };
      }
      return act;
    }));
  };

  // Handle Form Submission
  const handleSubmission = (e) => {
    e.preventDefault();
    if (!storySubmission.consent) {
      showToast('Please confirm the safety and consent verification checkbox.');
      return;
    }
    
    const newStory = {
      id: Date.now().toString(),
      title: storySubmission.title,
      summary: storySubmission.summary,
      content: storySubmission.content,
      category: storySubmission.category,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
      fictional: true,
      date: new Date().toISOString().split('T')[0],
      age: 'Anonymous',
      region: storySubmission.region
    };

    setStories([newStory, ...stories]);
    setStorySubmission({
      title: '',
      category: 'Education',
      summary: '',
      content: '',
      region: 'Kabul',
      consent: false
    });
    
    showToast('Demo Story submitted successfully! Added to local archive.');
    setActiveTab('voices');
  };

  // Filtered stories logic
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            story.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [stories, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] font-sans selection:bg-[#8B5CF6] selection:text-white flex flex-col">
      {}
      <nav className="sticky top-0 z-40 bg-[#0B1020]/90 backdrop-blur-md border-b border-[#8B5CF6]/20 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#E8C878] p-0.5 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#E8C878]" />
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-[#F8FAFC] block leading-none">
                INVISIBLE VOICES
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E8C878] block mt-1 font-semibold">
                Their voices deserve a future
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'voices', label: 'Voices Archive', icon: BookOpen },
              { id: 'context', label: 'Beyond Silence', icon: Globe },
              { id: 'action', label: 'Take Action', icon: Heart },
              { id: 'submit', label: 'Share Story', icon: MessageSquare },
              { id: 'about', label: 'About & Safety', icon: Shield },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/40' 
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Language Toggle & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
              {['EN', 'FA', 'PS'].map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    showToast(`Language switched to ${lang} (Demo mode)`);
                  }}
                  className={`px-2 py-1 rounded-lg font-medium transition-all ${
                    language === lang 
                      ? 'bg-[#8B5CF6] text-white' 
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile Menu Trigger Placeholder */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => {
                  const tabs = ['home', 'voices', 'context', 'action', 'submit', 'about'];
                  const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
                  setActiveTab(tabs[nextIdx]);
                }}
                className="p-2 rounded-xl bg-white/5 text-[#94A3B8] hover:text-white border border-white/10"
                title="Quick Switch View"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {/* ==================== HOME SECTION ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Hero Banner */}
            <section className="relative rounded-3xl overflow-hidden border border-[#8B5CF6]/30 bg-gradient-to-br from-[#0B1020] via-[#8B5CF6]/10 to-[#0B1020] p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-6 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8C878]/10 border border-[#E8C878]/30 text-[#E8C878] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Social-Impact Educational Platform
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold font-serif tracking-tight text-[#F8FAFC] leading-tight">
                  Amplifying voices when silence is enforced.
                </h1>

                <p className="text-lg text-[#94A3B8] leading-relaxed">
                  INVISIBLE VOICES builds a digital archivity space documenting female access restrictions, aspirations, and educational courage in Afghanistan.
                </p>

                {/* LISTEN -> UNDERSTAND -> ACT Flow Cards */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[#8B5CF6] text-xs font-bold block mb-1">1. LISTEN</span>
                    <span className="text-xs text-[#94A3B8]">Personal Narratives</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[#E8C878] text-xs font-bold block mb-1">2. UNDERSTAND</span>
                    <span className="text-xs text-[#94A3B8]">UN & UNESCO Facts</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[#8B5CF6] text-xs font-bold block mb-1">3. ACT</span>
                    <span className="text-xs text-[#94A3B8]">Global Support</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('voices')}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold text-sm shadow-xl shadow-[#8B5CF6]/25 hover:opacity-95 transition-all flex items-center gap-2"
                  >
                    Explore Voices Archive <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('action')}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#F8FAFC] font-semibold text-sm transition-all"
                  >
                    Take Action Now
                  </button>
                </div>
              </div>

              {/* Quick Stat Counter Showcase */}
              <div className="w-full md:w-80 bg-[#0B1020]/80 border border-[#8B5CF6]/30 p-6 rounded-2xl space-y-6 shadow-2xl backdrop-blur-md relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E8C878]">Platform Global Counter</h3>
                
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-[#F8FAFC] font-mono">
                    {actionCounter.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#94A3B8]">Actions and solidarity commitments logged worldwide</p>
                </div>

                <div className="border-t border-[#8B5CF6]/20 pt-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8]">Archive Stories</span>
                    <span className="text-[#F8FAFC] font-bold">{stories.length} Narratives</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8]">Data Status</span>
                    <span className="text-[#E8C878] font-bold">UN Verified Sourced</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('action')}
                  className="w-full py-2.5 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-semibold border border-[#8B5CF6]/40 transition-colors"
                >
                  Join Action Network
                </button>
              </div>
            </section>

            {/* Sourced Statistics Section */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-[#F8FAFC]">Key Educational Metrics</h2>
                  <p className="text-sm text-[#94A3B8] mt-1">Verified data published by UNESCO and UN Women reports</p>
                </div>
                <button 
                  onClick={() => setActiveTab('context')} 
                  className="text-xs text-[#E8C878] hover:underline flex items-center gap-1 font-semibold"
                >
                  View Full Educational Context <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#8B5CF6]/50 transition-all">
                  <div className="p-3 w-fit rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-[#F8FAFC] font-mono">1.1 Million+</div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">Young Women Affected</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Out of formal school access following secondary school bans since late 2021.
                  </p>
                  <span className="text-[10px] text-[#E8C878] font-medium block pt-2">Source: UNESCO Institute for Statistics</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#8B5CF6]/50 transition-all">
                  <div className="p-3 w-fit rounded-xl bg-[#E8C878]/10 text-[#E8C878]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-[#F8FAFC] font-mono">80%</div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">School-Age Females</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Currently currently out of formal education institutions nationwide.
                  </p>
                  <span className="text-[10px] text-[#E8C878] font-medium block pt-2">Source: UN Women Reports</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#8B5CF6]/50 transition-all">
                  <div className="p-3 w-fit rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-[#F8FAFC] font-mono">100,000+</div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">University Students</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Prevented from completing university degrees or technical coursework.
                  </p>
                  <span className="text-[10px] text-[#E8C878] font-medium block pt-2">Source: UNESCO Higher Education Data</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== VOICES ARCHIVE SECTION ==================== */}
        {activeTab === 'voices' && (
          <div className="space-y-8 animate-fadeIn">
            <SafetyConsentNotice />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h1 className="text-3xl font-bold font-serif text-[#F8FAFC]">Voices Archive</h1>
                <p className="text-sm text-[#94A3B8] mt-1">
                  Representative stories documenting aspirations, educational resilience, and everyday experiences.
                </p>
              </div>

              <button 
                onClick={() => setActiveTab('submit')}
                className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#7C3AED] transition-colors w-fit"
              >
                <MessageSquare className="w-4 h-4" /> Submit Demo Narrative
              </button>
            </div>

            {/* Search and Category Filter Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input 
                  type="text"
                  placeholder="Search stories by keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="flex items-center gap-2 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <Filter className="w-4 h-4 text-[#94A3B8] shrink-0 ml-1 hidden sm:block" />
                {['All', 'Education', 'Work', 'Everyday Life', 'Freedom', 'Future Dreams'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#8B5CF6] text-white' 
                        : 'bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories Grid */}
            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map(story => {
                  const isBookmarked = bookmarks.includes(story.id);
                  return (
                    <div 
                      key={story.id}
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={story.image} 
                            alt={story.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent"></div>
                          
                          <button 
                            onClick={() => toggleBookmark(story.id)}
                            className="absolute top-3 right-3 p-2 rounded-xl bg-[#0B1020]/70 text-[#F8FAFC] hover:bg-[#8B5CF6] transition-all backdrop-blur-md"
                          >
                            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                          </button>

                          <span className="absolute bottom-3 left-3 bg-[#8B5CF6]/80 text-[#F8FAFC] text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-md">
                            {story.category}
                          </span>
                        </div>

                        <div className="p-5 space-y-3">
                          {story.fictional && (
                            <span className="text-[10px] text-[#E8C878] font-medium block">
                              ★ Demo Narrative / Representative Profile
                            </span>
                          )}

                          <h3 className="text-xl font-bold font-serif text-[#F8FAFC] leading-snug group-hover:text-[#8B5CF6] transition-colors">
                            {story.title}
                          </h3>

                          <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                            {story.summary}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                        <span className="text-[11px] text-[#94A3B8]">{story.region}</span>
                        <button 
                          onClick={() => setSelectedStory(story)}
                          className="text-xs font-semibold text-[#8B5CF6] hover:text-[#E8C878] flex items-center gap-1 transition-colors"
                        >
                          Read Full Narrative <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
                <BookOpen className="w-12 h-12 text-[#94A3B8] mx-auto opacity-50" />
                <h3 className="text-lg font-bold text-[#F8FAFC]">No Stories Match Your Filters</h3>
                <p className="text-sm text-[#94A3B8]">Try adjusting your search query or selecting a different category filter.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-4 py-2 bg-[#8B5CF6] text-white text-xs font-semibold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== BEYOND SILENCE (EDUCATIONAL CONTEXT) ==================== */}
        {activeTab === 'context' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-3xl font-bold font-serif text-[#F8FAFC]">Beyond the Silence</h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                Educational Context, Rights Timeline, and Official Sourced International Documentation
              </p>
            </div>

            {/* Rights Restriction Timeline */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#8B5CF6]" /> Historical Timeline of Restrictions
              </h2>

              <div className="relative border-l-2 border-[#8B5CF6]/30 ml-4 space-y-8 pl-6">
                {RESTRICTIONS_TIMELINE.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0B1020] border-2 border-[#8B5CF6] group-hover:bg-[#E8C878] transition-colors"></div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-[#8B5CF6]/40 transition-all">
                      <span className="text-xs font-bold text-[#E8C878] uppercase tracking-wider">{item.year}</span>
                      <h3 className="text-lg font-bold text-[#F8FAFC]">{item.title}</h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{item.description}</p>
                      <span className="text-[10px] text-[#8B5CF6] block font-semibold pt-1">Source: {item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Source Resources Section */}
            <div className="space-y-6 pt-6">
              <h2 className="text-xl font-bold text-[#F8FAFC]">Official UN & UNESCO External Publications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="https://www.unesco.org/en/education/afghanistan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#8B5CF6] transition-all flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <span className="text-xs text-[#E8C878] font-bold">UNESCO Portal</span>
                    <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors">
                      UNESCO Education Access Directives
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Explore official statements, global education statistics, and international advocacy programs.
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#94A3B8] group-hover:text-[#F8FAFC] shrink-0" />
                </a>

                <a 
                  href="https://www.unwomen.org/en/news-stories/feature-story/2023/08/women-in-afghanistan-rights-and-access-restrictions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#8B5CF6] transition-all flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <span className="text-xs text-[#E8C878] font-bold">UN Women Briefings</span>
                    <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors">
                      UN Women Country Situation Reports
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Detailed documentation on employment, civic participation, and social protection metrics.
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#94A3B8] group-hover:text-[#F8FAFC] shrink-0" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAKE ACTION SECTION ==================== */}
        {activeTab === 'action' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-serif text-[#F8FAFC]">Take Action</h1>
                <p className="text-sm text-[#94A3B8] mt-1">
                  Connect awareness with concrete personal commitments and educational support initiatives.
                </p>
              </div>

              <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl px-4 py-3 flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#E8C878] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#94A3B8] block uppercase font-bold">Logged Commitments</span>
                  <span className="text-lg font-bold font-mono text-[#F8FAFC]">{actionCounter.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {actions.map(act => (
                <div 
                  key={act.id}
                  className={`bg-white/5 border rounded-2xl p-6 flex flex-col justify-between transition-all ${
                    act.completed 
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E8C878] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#E8C878]/10">
                        {act.category}
                      </span>
                      <span className="text-xs text-[#8B5CF6] font-semibold">{act.impact}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#F8FAFC]">{act.title}</h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{act.description}</p>
                  </div>

                  <div className="pt-6 flex items-center justify-between border-t border-white/5 mt-4">
                    <a 
                      href={act.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#F8FAFC] hover:text-[#8B5CF6] flex items-center gap-1"
                    >
                      Learn More Link <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => toggleAction(act.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        act.completed 
                          ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30' 
                          : 'bg-white/10 text-[#F8FAFC] hover:bg-white/20'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {act.completed ? 'Action Completed' : 'Mark as Complete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SHARE A STORY SECTION ==================== */}
        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
            <div className="border-b border-white/10 pb-6 text-center">
              <h1 className="text-3xl font-bold font-serif text-[#F8FAFC]">Share a Story</h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                Interactive Story Submission Form Demonstration
              </p>
            </div>

            <SafetyConsentNotice />

            <form onSubmit={handleSubmission} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider block">
                  Story Title
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. My Remote Mathematics Journey"
                  value={storySubmission.title}
                  onChange={(e) => setStorySubmission({...storySubmission, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider block">
                    Category
                  </label>
                  <select
                    value={storySubmission.category}
                    onChange={(e) => setStorySubmission({...storySubmission, category: e.target.value})}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="Education">Education</option>
                    <option value="Work">Work</option>
                    <option value="Everyday Life">Everyday Life</option>
                    <option value="Freedom">Freedom</option>
                    <option value="Future Dreams">Future Dreams</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider block">
                    General Region (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Kabul / Herat"
                    value={storySubmission.region}
                    onChange={(e) => setStorySubmission({...storySubmission, region: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider block">
                  Summary / Highlight Statement
                </label>
                <input 
                  type="text"
                  required
                  placeholder="One sentence describing the core message..."
                  value={storySubmission.summary}
                  onChange={(e) => setStorySubmission({...storySubmission, summary: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider block">
                  Full Story Content
                </label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Write narrative content here..."
                  value={storySubmission.content}
                  onChange={(e) => setStorySubmission({...storySubmission, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#8B5CF6]"
                ></textarea>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input 
                  type="checkbox"
                  id="consent"
                  checked={storySubmission.consent}
                  onChange={(e) => setStorySubmission({...storySubmission, consent: e.target.checked})}
                  className="mt-1 accent-[#8B5CF6] rounded"
                />
                <label htmlFor="consent" className="text-xs text-[#94A3B8] leading-relaxed cursor-pointer">
                  I understand this submission is part of a local interactive demonstration platform. I acknowledge no sensitive personally identifiable data should be entered.
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm shadow-xl shadow-[#8B5CF6]/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Demo Story
              </button>
            </form>
          </div>
        )}

        {/* ==================== ABOUT & SAFETY SECTION ==================== */}
        {activeTab === 'about' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-3xl font-bold font-serif text-[#F8FAFC]">About & Technical Safety</h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                Project Principles, Ethical Framework, and Technical Architecture Guidelines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC]">Core Mission & Vision</h3>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  INVISIBLE VOICES exists to provide an international digital space that documents, elevates, and preserves female education aspirations and rights advocacy. Following the guiding tri-fold framework:
                </p>
                <ul className="space-y-2 text-xs text-[#F8FAFC]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#E8C878]" /> <strong>LISTEN:</strong> Elevate representative personal narratives.</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#E8C878]" /> <strong>UNDERSTAND:</strong> Sourced metrics from UNESCO & UN Women.</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#E8C878]" /> <strong>ACT:</strong> Direct users to actionable support channels.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#E8C878]/20 text-[#E8C878]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC]">Privacy & Safety Architecture</h3>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Protecting human dignity and safety is the central pillar of our tech stack design choices:
                </p>
                <ul className="space-y-2 text-xs text-[#94A3B8]">
                  <li>• No tracking cookies or sensitive location data collection.</li>
                  <li>• Client-side local execution with zero unauthorized server transmission.</li>
                  <li>• Fictional representative narrative labels for prototype demonstrations.</li>
                  <li>• Independent modular backend integration design for future encrypted reviews.</li>
                </ul>
              </div>
            </div>

            {/* Hackathon Implementation Summary */}
            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-2xl p-6 md:p-8 space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#F8FAFC]">Hackathon Prototype Technical Overview</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                This single-file application is engineered using standard React hooks, Tailwind CSS layout systems, and Lucide vector iconography. All data models (Stories, Actions, Timeline Events) are typed and structured to seamlessly support future REST API or GraphQL backend connections.
              </p>
            </div>
          </div>
        )}
      </main>

      {}
      <StoryModal 
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        isBookmarked={selectedStory ? bookmarks.includes(selectedStory.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <Toast 
        message={toastMessage} 
        type="info" 
        onClose={() => setToastMessage(null)} 
      />

      {}
      <footer className="mt-auto border-t border-[#8B5CF6]/20 bg-[#0B1020] text-[#94A3B8] py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#E8C878]" />
            <span className="font-semibold text-[#F8FAFC]">INVISIBLE VOICES</span>
            <span>— Educational & Human Rights Advocacy Project</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('about')} className="hover:text-[#F8FAFC] transition-colors">
              Safety Architecture
            </button>
            <a href="https://www.unesco.org" target="_blank" rel="noreferrer" className="hover:text-[#F8FAFC] transition-colors">
              UNESCO
            </a>
            <a href="https://www.unwomen.org" target="_blank" rel="noreferrer" className="hover:text-[#F8FAFC] transition-colors">
              UN Women
            </a>
          </div>

          <p className="text-[10px] text-[#94A3B8]/70">
            Their voices. Their rights. Our responsibility.
          </p>
        </div>
      </footer>
    </div>
  );
}