"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Video,
  Calendar,
  Users,
  Search,
  Filter,
  Grid3x3,
  LayoutGrid,
  Image as ImageIcon,
  PlayCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Download,
  Share2,
  Heart,
  Clock,
  MapPin,
  Tag,
  User,
  Eye,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Gift,
  Trophy,
  GraduationCap,
  BookOpen,
  School,
  Star,
  Award,
  Music,
  PenTool,
  Globe,
  Heart as HeartIcon
} from 'lucide-react';

// Types
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'events' | 'academics' | 'sports' | 'arts' | 'achievements' | 'campus';
  type: 'image' | 'video';
  thumbnail: string;
  imageUrl?: string;
  videoUrl?: string;
  date: string;
  location?: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  featured?: boolean;
  width?: number;
  height?: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

// Local image imports - Replace these with your actual image paths
// Place your images in: public/images/coaching/
const localImages = {
  // Classroom images
  classroom: [
    '/images/coaching/classroom-1.jpg',
    '/images/coaching/classroom-2.jpg',
    '/images/coaching/classroom-3.jpg',
    '/images/coaching/classroom-4.jpg',
    '/images/coaching/classroom-5.jpg',
    '/images/coaching/classroom-6.jpg',
  ],
  // Student images
  students: [
    '/images/coaching/students-1.jpg',
    '/images/coaching/students-2.jpg',
    '/images/coaching/students-3.jpg',
    '/images/coaching/students-4.jpg',
    '/images/coaching/students-5.jpg',
    '/images/coaching/students-6.jpg',
  ],
  // Library images
  library: [
    '/images/coaching/library-1.jpg',
    '/images/coaching/library-2.jpg',
    '/images/coaching/library-3.jpg',
    '/images/coaching/library-4.jpg',
    '/images/coaching/library-5.jpg',
    '/images/coaching/library-6.jpg',
  ],
  // Lab images
  lab: [
    '/images/coaching/lab-1.jpg',
    '/images/coaching/lab-2.jpg',
    '/images/coaching/lab-3.jpg',
    '/images/coaching/lab-4.jpg',
    '/images/coaching/lab-5.jpg',
    '/images/coaching/lab-6.jpg',
  ],
  // Events images
  events: [
    '/images/coaching/events-1.jpg',
    '/images/coaching/events-2.jpg',
    '/images/coaching/events-3.jpg',
    '/images/coaching/events-4.jpg',
    '/images/coaching/events-5.jpg',
    '/images/coaching/events-6.jpg',
  ],
  // Sports images
  sports: [
    '/images/coaching/sports-1.jpg',
    '/images/coaching/sports-2.jpg',
    '/images/coaching/sports-3.jpg',
    '/images/coaching/sports-4.jpg',
    '/images/coaching/sports-5.jpg',
    '/images/coaching/sports-6.jpg',
  ],
  // Campus images
  campus: [
    '/images/coaching/campus-1.jpg',
    '/images/coaching/campus-2.jpg',
    '/images/coaching/campus-3.jpg',
    '/images/coaching/campus-4.jpg',
    '/images/coaching/campus-5.jpg',
    '/images/coaching/campus-6.jpg',
  ],
  // Achievement images
  achievement: [
    '/images/coaching/achievement-1.jpg',
    '/images/coaching/achievement-2.jpg',
    '/images/coaching/achievement-3.jpg',
    '/images/coaching/achievement-4.jpg',
    '/images/coaching/achievement-5.jpg',
    '/images/coaching/achievement-6.jpg',
  ]
};

// Fallback images in case local images don't exist
const fallbackImages = {
  classroom: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
  ],
  students: [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop',
  ],
  library: [
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
  ],
  lab: [
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop',
  ],
  events: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
  ],
  sports: [
    'https://images.unsplash.com/photo-1461896836934-bd81fb1b1b26?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
  ],
  campus: [
    'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=600&fit=crop',
  ],
  achievement: [
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&h=600&fit=crop',
  ]
};

// Get image from local or fallback
const getImage = (category: string, index: number): string => {
  const categoryKey = category as keyof typeof localImages;
  const localCategoryImages = localImages[categoryKey] || localImages.classroom;
  const fallbackCategoryImages = fallbackImages[categoryKey as keyof typeof fallbackImages] || fallbackImages.classroom;
  
  // Try local images first, if they exist
  const imageIndex = index % localCategoryImages.length;
  const localImage = localCategoryImages[imageIndex];
  
  // Return local image path, fallback to unsplash if needed
  // You can change this to always use local or always use fallback
  return localImage;
};

// Get random image from category
const getRandomImage = (category: string): string => {
  const categoryKey = category as keyof typeof localImages;
  const images = localImages[categoryKey] || localImages.classroom;
  return images[Math.floor(Math.random() * images.length)];
};

// Sample Gallery Data
const generateGalleryItems = (): GalleryItem[] => {
  const items: GalleryItem[] = [];
  
  const categories = ['events', 'academics', 'sports', 'arts', 'achievements', 'campus'];
  const titles = {
    events: ['Annual Day Celebration', 'Science Fair 2024', 'Cultural Fest', 'Graduation Ceremony', 'Parent-Teacher Meet', 'Workshop on AI'],
    academics: ['Classroom Session', 'Lab Experiment', 'Group Study', 'Library Hours', 'Online Class', 'Exam Preparation'],
    sports: ['Sports Day', 'Cricket Match', 'Basketball Tournament', 'Yoga Session', 'Athletics Meet', 'Swimming Competition'],
    arts: ['Art Exhibition', 'Dance Performance', 'Music Concert', 'Drama Club', 'Painting Competition', 'Photography Show'],
    achievements: ['Award Ceremony', 'Success Stories', 'Rank Holders', 'Competition Winners', 'Scholarship Recipients', 'International Recognition'],
    campus: ['Campus Tour', 'Green Campus', 'Library Interior', 'Auditorium', 'Playground', 'Science Lab']
  };
  
  const descriptions = {
    events: ['A memorable evening of celebration and performances', 'Innovative projects by our young scientists', 'Showcasing talent and culture', 'Celebrating achievements of our graduates', 'Engaging with parents for student success', 'Exploring the future of education'],
    academics: ['Interactive learning in modern classrooms', 'Hands-on experiments in state-of-the-art labs', 'Collaborative learning environment', 'Quiet study spaces for focused learning', 'Digital learning made engaging', 'Preparing for academic excellence'],
    sports: ['Promoting fitness and teamwork', 'Spirit of sportsmanship', 'Developing athletic skills', 'Health and wellness focus', 'Competitive sports training', 'Building confidence through sports'],
    arts: ['Creative expression through art', 'Cultural performances', 'Musical talent showcase', 'Theatrical excellence', 'Artistic competition', 'Creative photography'],
    achievements: ['Recognizing excellence', 'Inspiring success stories', 'Academic brilliance', 'Celebrating winners', 'Scholarship opportunities', 'Global recognition'],
    campus: ['Beautiful learning environment', 'Sustainable campus', 'Modern library facilities', 'World-class auditorium', 'Sports infrastructure', 'Well-equipped labs']
  };
  
  const locations = {
    events: ['Main Auditorium', 'Science Block', 'Cultural Hall', 'Convocation Hall', 'Conference Room', 'Seminar Hall'],
    academics: ['Classroom 101', 'Physics Lab', 'Study Room', 'Central Library', 'Virtual Classroom', 'Examination Hall'],
    sports: ['Sports Complex', 'Cricket Ground', 'Basketball Court', 'Yoga Studio', 'Athletics Track', 'Swimming Pool'],
    arts: ['Art Gallery', 'Dance Studio', 'Music Room', 'Drama Theatre', 'Art Workshop', 'Photo Studio'],
    achievements: ['Award Ceremony Hall', 'Success Gallery', 'Academic Block', 'Competition Arena', 'Scholarship Hall', 'International Center'],
    campus: ['Main Building', 'Garden Area', 'Library Building', 'Auditorium Complex', 'Sports Ground', 'Science Block']
  };

  categories.forEach((category, catIndex) => {
    const count = 6;
    for (let i = 0; i < count; i++) {
      const isVideo = category === 'events' && i % 3 === 0;
      const index = (catIndex * count) + i;
      const imageUrl = getImage(category, i);
      
      items.push({
        id: `item-${index}`,
        title: titles[category as keyof typeof titles][i % titles[category as keyof typeof titles].length],
        description: descriptions[category as keyof typeof descriptions][i % descriptions[category as keyof typeof descriptions].length],
        category: category as any,
        type: isVideo ? 'video' : 'image',
        thumbnail: imageUrl,
        imageUrl: imageUrl,
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        location: locations[category as keyof typeof locations][i % locations[category as keyof typeof locations].length],
        tags: ['Educational', 'Inspiring', 'Creative', 'Innovative', 'Excellence', 'Community'].slice(0, Math.floor(Math.random() * 3) + 2),
        likes: Math.floor(Math.random() * 500) + 50,
        views: Math.floor(Math.random() * 2000) + 100,
        comments: Math.floor(Math.random() * 100) + 5,
        featured: index < 3,
      });
    }
  });
  
  return items;
};

const allItems = generateGalleryItems();

const categories: Category[] = [
  { id: 'all', name: 'All', icon: <Grid3x3 className="w-4 h-4" />, color: 'bg-blue-500', count: allItems.length },
  { id: 'events', name: 'Events', icon: <Calendar className="w-4 h-4" />, color: 'bg-purple-500', count: allItems.filter(i => i.category === 'events').length },
  { id: 'academics', name: 'Academics', icon: <BookOpen className="w-4 h-4" />, color: 'bg-green-500', count: allItems.filter(i => i.category === 'academics').length },
  { id: 'sports', name: 'Sports', icon: <Trophy className="w-4 h-4" />, color: 'bg-orange-500', count: allItems.filter(i => i.category === 'sports').length },
  { id: 'arts', name: 'Arts', icon: <Music className="w-4 h-4" />, color: 'bg-pink-500', count: allItems.filter(i => i.category === 'arts').length },
  { id: 'achievements', name: 'Achievements', icon: <Award className="w-4 h-4" />, color: 'bg-yellow-500', count: allItems.filter(i => i.category === 'achievements').length },
  { id: 'campus', name: 'Campus', icon: <School className="w-4 h-4" />, color: 'bg-indigo-500', count: allItems.filter(i => i.category === 'campus').length },
];

// Lightbox Component
function Lightbox({ 
  item, 
  onClose, 
  onNext, 
  onPrev,
  hasNext,
  hasPrev
}: { 
  item: GalleryItem | null; 
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg z-10"
      >
        <X className="w-8 h-8" />
      </button>
      
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10 ${
          !hasPrev ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10 ${
          !hasNext ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="relative flex-1 min-h-0">
          <img
            src={item.imageUrl || item.thumbnail}
            alt={item.title}
            className="w-full h-full object-contain rounded-2xl"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop';
            }}
          />
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-b-2xl p-6 mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-white/70 text-sm mt-1">{item.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-lg transition-colors ${
                  liked ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
              </button>
              <button
                onClick={() => setShowShare(!showShare)}
                className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Get featured items
  const featuredItems = filteredItems.filter(item => item.featured);

  // Handle lightbox navigation
  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem) {
        if (e.key === 'Escape') setSelectedItem(null);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#28355E] via-[#28355E] to-[#28355E] dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Our Gallery
              </h1>
              <p className="text-lg text-blue-100 max-w-2xl">
                Explore moments that define our coaching journey — from classroom learning to campus life.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm font-medium">{allItems.length} Memories</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">250k+ Views</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg shadow-white/30">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Category Filter - Desktop */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2 flex-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                  <span className={`text-xs ${
                    selectedCategory === cat.id ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'masonry'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Category Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowFilters(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white`
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 md:py-12" ref={galleryRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Section */}
          {featuredItems.length > 0 && selectedCategory === 'all' && !searchQuery && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Featured Moments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredItems.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${
                      index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                    onClick={() => handleItemClick(item, filteredItems.indexOf(item))}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        index === 0 ? 'aspect-[4/3] md:aspect-auto md:h-[400px]' : 'aspect-[4/3]'
                      }`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-white/60 text-xs">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                      </div>
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Video
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredItems.length}</span> items
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">Sort by:</span>
              <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Newest</option>
                <option>Popular</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* Gallery Items */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
              : 'columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6'
          }>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  viewMode === 'masonry' ? 'break-inside-avoid' : ''
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white/70 text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.type === 'video' && (
                          <span className="text-white/70 text-xs bg-red-500/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            Video
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-semibold text-sm line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-xs line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-white/50 text-xs">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {item.comments}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute top-2 right-2 flex flex-col gap-1 transition-opacity duration-300 ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-white">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-white">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Video Badge */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-white dark:bg-slate-800">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.date}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-0.5">
                        <Heart className="w-3 h-3" />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                <ImageIcon className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No items found
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredItems.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Load More
                <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={currentIndex < filteredItems.length - 1}
          hasPrev={currentIndex > 0}
        />
      )}
    </div>
  );
}