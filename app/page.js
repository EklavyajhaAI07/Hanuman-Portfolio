'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Bookmark, BookmarkCheck, Home as HomeIcon, Clock, Sparkles, Book, MapPin, Users, Image as ImageIcon, FileText, MessageCircle, Sun, Moon, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';

// Theme toggle component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setTheme('light')}
        className="gap-1"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setTheme('dark')}
        className="gap-1"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'bhagwa' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setTheme('bhagwa')}
        className="gap-1"
      >
        <Flame className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Navigation
function Navigation({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'leelas', label: 'Divine Leelas', icon: Sparkles },
    { id: 'powers', label: 'Powers & Siddhis', icon: Sparkles },
    { id: 'teachings', label: 'Teachings', icon: Book },
    { id: 'scriptures', label: 'Scriptures', icon: FileText },
    { id: 'places', label: 'Sacred Places', icon: MapPin },
    { id: 'relationships', label: 'Relationships', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'references', label: 'References', icon: FileText }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              श्री हनुमान
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 5).map(item => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage(item.id)}
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
            <div className="relative group">
              <Button variant="ghost" size="sm">
                More
              </Button>
              <div className="hidden group-hover:block absolute top-full right-0 mt-1 bg-background border rounded-md shadow-lg min-w-[200px]">
                {navItems.slice(5).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className="w-full text-left px-4 py-2 hover:bg-accent flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-accent flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Home Page
function HomePage({ setCurrentPage }) {
  return (
    <div className="space-y-12">
      {/* Hero Section with Background */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3519190/pexels-photo-3519190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Lord Hanuman"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-600/30 to-amber-600/40 backdrop-blur-sm" />
        </div>
        
        <div className="relative px-8 py-24 md:py-32 text-center">
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-20 h-20 border-2 border-orange-500/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-16 h-16 border-2 border-red-500/30 rounded-full"
          />
          
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg"
          >
            श्री हनुमान ज्ञान कोष
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl font-semibold mb-4 text-foreground drop-shadow"
          >
            A Complete Encyclopedia of Lord Hanuman
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto mb-8"
          >
            Explore the divine life, teachings, and scriptures of Pawanputra Hanuman with complete source citations from authentic texts
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button size="lg" onClick={() => setCurrentPage('leelas')} className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="h-5 w-5" />
              Explore Divine Leelas
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentPage('timeline')} className="gap-2 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
              <Clock className="h-5 w-5" />
              View Timeline
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border-2 hover:border-orange-500/50" onClick={() => setCurrentPage('leelas')}>
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/9691182/pexels-photo-9691182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Divine Leelas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                <Sparkles className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="group-hover:text-orange-500 transition-colors">Divine Leelas</CardTitle>
              <CardDescription>
                Explore the miraculous deeds and divine plays of Lord Hanuman from various scriptures
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border-2 hover:border-red-500/50" onClick={() => setCurrentPage('powers')}>
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85"
                alt="Powers & Siddhis"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                <Sparkles className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="group-hover:text-red-500 transition-colors">Powers & Siddhis</CardTitle>
              <CardDescription>
                Discover the eight supernatural powers and abilities blessed to Hanuman
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border-2 hover:border-amber-500/50" onClick={() => setCurrentPage('teachings')}>
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Sacred Teachings"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
                <Book className="h-6 w-6 text-amber-500" />
              </div>
              <CardTitle className="group-hover:text-amber-500 transition-colors">Sacred Teachings</CardTitle>
              <CardDescription>
                Learn the profound spiritual lessons from Hanuman's life and devotion
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '10+', label: 'Divine Leelas', color: 'orange', delay: 0.1 },
          { value: '5+', label: 'Sacred Powers', color: 'red', delay: 0.2 },
          { value: '3+', label: 'Core Teachings', color: 'amber', delay: 0.3 },
          { value: '5+', label: 'Sacred Temples', color: 'orange', delay: 0.4 }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: stat.delay, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-500/30">
              <CardContent className="pt-6">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`text-4xl font-bold text-${stat.color}-500 mb-2`}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

// Timeline Page
function TimelinePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(data => {
        setEvents(data.timeline || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading timeline:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Complete Timeline
        </h2>
        <p className="text-muted-foreground text-lg">Chronological journey through Lord Hanuman's divine life</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Timeline line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-red-600 to-amber-500"
        />

        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              className="relative pl-20"
            >
              {/* Animated dot */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                className="absolute left-5 w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-4 border-background shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="absolute inset-0 rounded-full bg-orange-500/50"
                />
              </motion.div>
              
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                      <CardDescription className="text-base">{event.summary}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="secondary" className="whitespace-nowrap">{event.era}</Badge>
                      <Badge className="whitespace-nowrap bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/50">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Leelas Page
function LeelasPage({ setSelectedEvent }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading events:', err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Specific images for each event based on content
  const eventSpecificImages = {
    '1': 'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Birth - divine origin
    '2': 'https://images.pexels.com/photos/1558916/pexels-photo-1558916.jpeg', // Swallowing Sun - fire/sun
    '3': 'https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', // Meeting Rama - devotion
    '4': 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Ocean crossing - water
    '5': 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Ashoka Vatika - garden/nature
    '6': 'https://images.pexels.com/photos/1558916/pexels-photo-1558916.jpeg', // Burning Lanka - fire
    '7': 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Sanjeevani mountain - mountain/strength
    '8': 'https://images.pexels.com/photos/3519190/pexels-photo-3519190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Rama's embrace - blessing
    '9': 'https://images.pexels.com/photos/6591438/pexels-photo-6591438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Meeting Bhima - encounter
    '10': 'https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' // Pearl necklace - teaching/wisdom
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Divine Leelas
        </h2>
        <p className="text-muted-foreground text-lg">Miraculous deeds and divine plays of Lord Hanuman</p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 flex-wrap justify-center"
      >
        {[
          { id: 'all', label: 'All', icon: '🙏' },
          { id: 'birth', label: 'Birth', icon: '✨' },
          { id: 'leela', label: 'Leelas', icon: '⚡' },
          { id: 'blessing', label: 'Blessings', icon: '🌟' }
        ].map(cat => (
          <Button
            key={cat.id}
            variant={filter === cat.id ? 'default' : 'outline'}
            onClick={() => setFilter(cat.id)}
            className="gap-2 transition-all"
          >
            <span>{cat.icon}</span>
            {cat.label}
          </Button>
        ))}
      </motion.div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group border-2 hover:border-orange-500/50"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Image Header - Specific to each event */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={eventSpecificImages[event.id] || eventSpecificImages['1']}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <Badge className="bg-background/90 backdrop-blur-sm">{event.category}</Badge>
                  <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">{event.era}</Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-base">
                  {event.summary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="font-semibold text-orange-500 flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    {event.scripture}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <FileText className="h-3 w-3" />
                    {event.section}, Ch. {event.chapter}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Powers Page
function PowersPage() {
  const [powers, setPowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/powers')
      .then(res => res.json())
      .then(data => {
        setPowers(data.powers || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading powers:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const powerIcons = ['⚡', '🌟', '💫', '✨', '🔥'];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          ⚡
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
          Powers & Siddhis
        </h2>
        <p className="text-muted-foreground text-lg">Supernatural abilities blessed to Lord Hanuman</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {powers.map((power, index) => (
          <motion.div
            key={power.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: index * 0.15, type: "spring" }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="h-full relative overflow-hidden group border-2 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">
                {powerIcons[index % powerIcons.length]}
              </div>
              
              <CardHeader>
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                  >
                    {powerIcons[index % powerIcons.length]}
                  </motion.div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-red-500 transition-colors">
                      {power.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {power.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{power.details}</p>
                {power.powers && (
                  <div className="flex flex-wrap gap-2">
                    {power.powers.map((p, i) => (
                      <motion.div
                        key={p}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 + i * 0.05 }}
                      >
                        <Badge variant="secondary" className="hover:bg-red-500/20 transition-colors">
                          {p}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-500">
                    <Book className="h-4 w-4" />
                    {power.scripture}
                  </div>
                  <div className="text-sm text-muted-foreground">{power.verse}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Teachings Page
function TeachingsPage() {
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teachings')
      .then(res => res.json())
      .then(data => {
        setTeachings(data.teachings || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading teachings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Specific images for each teaching based on content
  const teachingSpecificImages = {
    't1': 'https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', // Surrender to God - prayer/devotion
    't2': 'https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Humility - monk/wisdom
    't3': 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' // Self-control - zen/meditation
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          📿
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
          Sacred Teachings
        </h2>
        <p className="text-muted-foreground text-lg">Profound spiritual lessons from Hanuman's life</p>
      </motion.div>

      <div className="space-y-6">
        {teachings.map((teaching, index) => (
          <motion.div
            key={teaching.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, type: "spring" }}
            whileHover={{ x: 10 }}
          >
            <Card className="overflow-hidden border-2 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl">
              <div className="md:flex">
                {/* Image Section - Specific to each teaching */}
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative group">
                  <img
                    src={teachingSpecificImages[teaching.id] || teachingSpecificImages['t1']}
                    alt={teaching.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
                </div>
                
                {/* Content Section */}
                <div className="md:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Book className="h-6 w-6 text-white" />
                      </div>
                      {teaching.title}
                    </CardTitle>
                    <CardDescription className="text-base font-semibold mt-3 text-amber-600 dark:text-amber-400">
                      {teaching.teaching}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-base leading-relaxed">{teaching.description}</p>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 p-4 rounded-lg border-l-4 border-amber-500">
                      <p className="italic text-sm">&ldquo;{teaching.quote}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <FileText className="h-4 w-4" />
                      Source: <span className="font-semibold text-amber-600 dark:text-amber-400">{teaching.scripture}</span>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Scriptures Page
function ScripturesPage({ setSelectedEvent }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScripture, setSelectedScripture] = useState('all');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading events:', err);
        setLoading(false);
      });
  }, []);

  const scriptures = [...new Set(events.map(e => e.scripture))];
  const filteredEvents = selectedScripture === 'all'
    ? events
    : events.filter(e => e.scripture === selectedScripture);

  if (loading) {
    return <div className="text-center py-12">Loading scriptures...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Scriptures</h2>
        <p className="text-muted-foreground">Browse references by sacred text</p>
      </div>

      <Tabs value={selectedScripture} onValueChange={setSelectedScripture}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all">All Scriptures</TabsTrigger>
          {scriptures.map(scripture => (
            <TabsTrigger key={scripture} value={scripture}>
              {scripture}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedScripture} className="mt-6">
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <Card 
                key={event.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedEvent(event)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.summary}</CardDescription>
                    </div>
                    <Badge>{event.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-orange-500">{event.scripture}</span>
                      {' • '}
                      <span>{event.section}, Chapter {event.chapter}, Verse {event.verse}</span>
                    </div>
                    <div className="text-muted-foreground italic">
                      {event.sanskrit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Places Page with SVG Map
function PlacesPage() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemple, setSelectedTemple] = useState(null);

  useEffect(() => {
    fetch('/api/temples')
      .then(res => res.json())
      .then(data => {
        setTemples(data.temples || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading temples:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const templeImages = [
    'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/36526508/pexels-photo-36526508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.unsplash.com/photo-1662104249831-233d41ef4d33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHx0ZW1wbGUlMjBzcGlyaXR1YWx8ZW58MHx8fG9yYW5nZXwxNzg0ODIwOTAzfDA&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/36526508/pexels-photo-36526508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🛕
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Sacred Places
        </h2>
        <p className="text-muted-foreground text-lg">Temples and pilgrimage sites of Lord Hanuman</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" }}
        >
          <Card className="p-6 h-full border-2 hover:border-orange-500/50 transition-all">
            <h3 className="font-semibold mb-4 text-xl flex items-center gap-2">
              <MapPin className="h-6 w-6 text-orange-500" />
              Temple Locations Across India
            </h3>
            <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg p-8 min-h-[500px] flex items-center justify-center border-2 border-orange-500/20">
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl"
                >
                  🗺️
                </motion.div>
                <p className="text-muted-foreground font-medium">Interactive India map with temple markers</p>
                <div className="mt-6 space-y-2">
                  {temples.map((temple, index) => (
                    <motion.button
                      key={temple.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedTemple(temple)}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedTemple?.id === temple.id
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-background/70 hover:bg-orange-500/10 border border-orange-500/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{temple.name}</div>
                          <div className="text-sm opacity-90 truncate">{temple.location}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Temple Cards */}
        <div className="space-y-4">
          {temples.map((temple, index) => (
            <motion.div
              key={temple.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              whileHover={{ x: -5 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 overflow-hidden border-2 ${
                  selectedTemple?.id === temple.id 
                    ? 'ring-4 ring-orange-500/50 border-orange-500 shadow-2xl' 
                    : 'hover:border-orange-500/50 hover:shadow-xl'
                }`}
                onClick={() => setSelectedTemple(temple)}
              >
                {/* Temple Image */}
                <div className="h-48 overflow-hidden relative group">
                  <img
                    src={templeImages[index % templeImages.length]}
                    alt={temple.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-orange-500 text-white shadow-lg">
                      Sacred Temple
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                      🛕
                    </div>
                    {temple.name}
                  </CardTitle>
                  <CardDescription className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {temple.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-relaxed">{temple.description}</p>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 p-3 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm">
                      <strong className="text-orange-600 dark:text-orange-400">Significance:</strong>{' '}
                      {temple.significance}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Relationships Page
function RelationshipsPage() {
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/relationships')
      .then(res => res.json())
      .then(data => {
        setRelationships(data.relationships || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading relationships:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Specific images for each relationship based on content
  const relationshipSpecificImages = {
    'r1': 'https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', // Lord Rama - devotion/prayer
    'r2': 'https://images.pexels.com/photos/3519190/pexels-photo-3519190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Sita Mata - blessing/grace
    'r3': 'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Anjana (Mother) - divine birth
    'r4': 'https://images.pexels.com/photos/1558916/pexels-photo-1558916.jpeg', // Vayu (Father) - wind/power
    'r5': 'https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' // Lord Shiva - meditation/spiritual
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          👥
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Divine Relationships
        </h2>
        <p className="text-muted-foreground text-lg">Connections with gods, family, and devotees</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {relationships.map((rel, index) => (
          <motion.div
            key={rel.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.15, type: "spring" }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Card className="h-full overflow-hidden border-2 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl group">
              {/* Image Header - Specific to each relationship */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={relationshipSpecificImages[rel.id] || relationshipSpecificImages['r1']}
                  alt={rel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    {rel.relation}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 group-hover:text-orange-500 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  {rel.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{rel.description}</p>
                {rel.quote && (
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="italic text-sm">&ldquo;{rel.quote}&rdquo;</p>
                  </div>
                )}
                {rel.scripture && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Book className="h-4 w-4" />
                    Source: <span className="font-semibold text-orange-600 dark:text-orange-400">{rel.scripture}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Gallery Page
function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    { id: 1, url: 'https://images.pexels.com/photos/3519190/pexels-photo-3519190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Lord Hanuman', category: 'Divine' },
    { id: 2, url: 'https://images.pexels.com/photos/9691182/pexels-photo-9691182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Divine Form', category: 'Divine' },
    { id: 3, url: 'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Sacred Temple', category: 'Temples' },
    { id: 4, url: 'https://images.pexels.com/photos/36526508/pexels-photo-36526508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Temple Architecture', category: 'Temples' },
    { id: 5, url: 'https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', title: 'Devotion', category: 'Spiritual' },
    { id: 6, url: 'https://images.unsplash.com/photo-1649779241200-ef4de69147a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', title: 'Prayer', category: 'Spiritual' },
    { id: 7, url: 'https://images.unsplash.com/photo-1662104249831-233d41ef4d33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHx0ZW1wbGUlMjBzcGlyaXR1YWx8ZW58MHx8fG9yYW5nZXwxNzg0ODIwOTAzfDA&ixlib=rb-4.1.0&q=85', title: 'Spiritual', category: 'Spiritual' },
    { id: 8, url: 'https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Meditation', category: 'Spiritual' }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4 inline-block"
        >
          🖼️
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
          Sacred Gallery
        </h2>
        <p className="text-muted-foreground text-lg">Divine images and temple photographs</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08, type: "spring" }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
              <p className="text-white font-bold text-lg mb-1">{image.title}</p>
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                {image.category}
              </Badge>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedImage.title}</DialogTitle>
                <DialogDescription>
                  <Badge>{selectedImage.category}</Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// References Page
function ReferencesPage() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4 inline-block"
        >
          📚
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
          References & Sources
        </h2>
        <p className="text-muted-foreground text-lg">Primary scriptures and bibliography</p>
      </motion.div>

      <div className="space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden border-2 hover:border-orange-500/50 transition-all">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 border-b">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  📖
                </div>
                Primary Scriptures
              </CardTitle>
            </div>
            <CardContent className="p-6 space-y-5">
              {[
                {
                  title: 'Valmiki Ramayana',
                  description: 'The oldest Sanskrit epic, contains detailed accounts of Hanuman\'s role in Rama\'s quest to rescue Sita',
                  icon: '📜'
                },
                {
                  title: 'Hanuman Chalisa',
                  description: '40-verse hymn by Tulsidas in praise of Hanuman\'s virtues and powers',
                  icon: '🙏'
                },
                {
                  title: 'Mahabharata',
                  description: 'Contains episodes of Hanuman in Dvapara Yuga, including his meeting with Bhima',
                  icon: '⚔️'
                },
                {
                  title: 'Shiva Purana',
                  description: 'Describes Hanuman as an aspect of Lord Shiva with divine attributes',
                  icon: '🕉️'
                }
              ].map((scripture, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4 rounded-lg border-l-4 border-orange-500 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{scripture.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-orange-600 dark:text-orange-400 mb-1">
                        {scripture.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {scripture.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="overflow-hidden border-2 hover:border-amber-500/50 transition-all">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 border-b">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  🔍
                </div>
                Research Methodology
              </CardTitle>
            </div>
            <CardContent className="p-6 space-y-5">
              <p className="text-base leading-relaxed">
                All information presented on this platform is sourced from authentic Sanskrit scriptures with proper citations including:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '📚', text: 'Scripture name and section' },
                  { icon: '📖', text: 'Chapter and verse numbers' },
                  { icon: '🔤', text: 'Original Sanskrit text' },
                  { icon: '🌐', text: 'Hindi and English translations' },
                  { icon: '📜', text: 'Historical context' },
                  { icon: '🎓', text: 'Scholarly interpretations' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border border-orange-500/20"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="text-sm font-medium">{item.text}</div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 rounded-lg border-l-4 border-amber-500 mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-amber-600 dark:text-amber-400">Note:</strong> When multiple versions or interpretations exist, they are presented side by side for scholarly comparison, maintaining transparency and academic integrity.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <div className="inline-block bg-gradient-to-r from-orange-500/10 to-red-500/10 px-8 py-4 rounded-full border-2 border-orange-500/20">
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              🕉️ All content verified from authentic Hindu scriptures 🕉️
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// AI Chat Component
function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          sources: data.sources
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I could not connect to the service.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "Tell me about Hanuman's birth",
    "What are the eight siddhis?",
    "How did Hanuman cross the ocean?",
    "What are Hanuman's teachings?"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0 bg-gradient-to-br from-background to-orange-50/10 dark:to-orange-950/10">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xl"
            >
              🙏
            </motion.div>
            <div>
              <DialogTitle className="text-xl">Ask About Lord Hanuman</DialogTitle>
              <DialogDescription>
                Get answers from authentic scriptures with citations
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🕉️
                </motion.div>
                <p className="text-lg font-semibold mb-2">Ask me anything about Lord Hanuman</p>
                <p className="text-sm text-muted-foreground mb-6">I'll answer based on authentic scriptures</p>
                
                <div className="space-y-2 max-w-md mx-auto">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">SUGGESTED QUESTIONS:</p>
                  {suggestedQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setInput(q)}
                      className="w-full text-left px-4 py-2 text-sm bg-muted hover:bg-orange-500/10 rounded-lg transition-colors border border-transparent hover:border-orange-500/30"
                    >
                      💬 {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white'
                      : 'bg-card border-2 border-orange-500/20'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-border/50 space-y-2"
                    >
                      <p className="text-xs font-bold flex items-center gap-2">
                        <Book className="h-3 w-3" />
                        SCRIPTURE SOURCES:
                      </p>
                      {msg.sources.map((source, i) => (
                        <div key={i} className="text-xs bg-background/50 rounded p-2">
                          📖 <strong>{source.title}</strong> - {source.scripture}
                          {source.chapter && ` (Chapter ${source.chapter}, Verse ${source.verse})`}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-card border-2 border-orange-500/20 rounded-2xl p-4 shadow-lg">
                  <div className="flex gap-2">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 bg-orange-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-background/50 backdrop-blur-sm p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about scriptures, teachings, powers..."
              disabled={loading}
              className="border-2 focus:border-orange-500"
            />
            <Button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()}
              size="lg"
              className="px-6"
            >
              <span className="mr-2">Send</span>
              ➤
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Event Detail Dialog
function EventDetailDialog({ event, isOpen, onClose }) {
  if (!event) return null;

  // Specific images for each event based on content
  const eventSpecificImages = {
    '1': 'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Birth - divine origin
    '2': 'https://images.pexels.com/photos/1558916/pexels-photo-1558916.jpeg', // Swallowing Sun - fire/sun
    '3': 'https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', // Meeting Rama - devotion
    '4': 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Ocean crossing - water
    '5': 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Ashoka Vatika - garden/nature
    '6': 'https://images.pexels.com/photos/1558916/pexels-photo-1558916.jpeg', // Burning Lanka - fire
    '7': 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Sanjeevani mountain - mountain/strength
    '8': 'https://images.pexels.com/photos/3519190/pexels-photo-3519190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Rama's embrace - blessing
    '9': 'https://images.pexels.com/photos/6591438/pexels-photo-6591438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', // Meeting Bhima - encounter
    '10': 'https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' // Pearl necklace - teaching/wisdom
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Hero Image - Specific to each event */}
        <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
          <img
            src={eventSpecificImages[event.id] || eventSpecificImages['1']}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-2 mb-3">
              <Badge className="bg-orange-500 text-white shadow-lg">{event.category}</Badge>
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm shadow-lg">{event.era}</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {event.title}
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              Summary
            </h4>
            <p className="text-muted-foreground text-base">{event.summary}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              Description
            </h4>
            <p className="leading-relaxed text-base">{event.description}</p>
          </div>

          <Separator />

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-6 rounded-xl border-2 border-orange-500/20 space-y-4">
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Book className="h-5 w-5" />
                Scripture Reference
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">Scripture</div>
                  <div className="font-bold">{event.scripture}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">Section</div>
                  <div className="font-bold">{event.section}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">Chapter</div>
                  <div className="font-bold">{event.chapter}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">Verse</div>
                  <div className="font-bold">{event.verse}</div>
                </div>
              </div>
            </div>

            {event.sanskrit && (
              <div className="bg-background/70 p-4 rounded-lg">
                <h5 className="text-sm font-bold mb-2 text-orange-600 dark:text-orange-400">Sanskrit:</h5>
                <p className="text-sm italic leading-relaxed">{event.sanskrit}</p>
              </div>
            )}

            {event.hindi && (
              <div className="bg-background/70 p-4 rounded-lg">
                <h5 className="text-sm font-bold mb-2 text-orange-600 dark:text-orange-400">Hindi Translation:</h5>
                <p className="text-sm leading-relaxed">{event.hindi}</p>
              </div>
            )}

            {event.english && (
              <div className="bg-background/70 p-4 rounded-lg">
                <h5 className="text-sm font-bold mb-2 text-orange-600 dark:text-orange-400">English Translation:</h5>
                <p className="text-sm leading-relaxed">{event.english}</p>
              </div>
            )}
          </div>

          {event.relatedCharacters && event.relatedCharacters.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                Related Characters
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.relatedCharacters.map(char => (
                  <Badge key={char} variant="secondary" className="text-base py-1 px-3">
                    {char}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {event.relatedPlaces && event.relatedPlaces.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                Related Places
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.relatedPlaces.map(place => (
                  <Badge key={place} variant="outline" className="text-base py-1 px-3">
                    {place}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'timeline' && <TimelinePage />}
            {currentPage === 'leelas' && <LeelasPage setSelectedEvent={setSelectedEvent} />}
            {currentPage === 'powers' && <PowersPage />}
            {currentPage === 'teachings' && <TeachingsPage />}
            {currentPage === 'scriptures' && <ScripturesPage setSelectedEvent={setSelectedEvent} />}
            {currentPage === 'places' && <PlacesPage />}
            {currentPage === 'relationships' && <RelationshipsPage />}
            {currentPage === 'gallery' && <GalleryPage />}
            {currentPage === 'references' && <ReferencesPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* Pulse effect */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-orange-500"
          />
          <Button
            className="relative h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            size="icon"
            onClick={() => setIsChatOpen(true)}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-7 w-7" />
            </motion.div>
          </Button>
        </div>
      </motion.div>

      {/* AI Chat Dialog */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Event Detail Dialog */}
      <EventDetailDialog
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Footer */}
      <footer className="border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">जय श्री राम • जय हनुमान</p>
          <p className="text-sm">
            All content sourced from authentic scriptures with proper citations
          </p>
        </div>
      </footer>
    </div>
  );
}