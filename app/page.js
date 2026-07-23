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
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20" />
        <div className="relative px-8 py-24 md:py-32 text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            श्री हनुमान ज्ञान कोष
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            A Complete Encyclopedia of Lord Hanuman
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore the divine life, teachings, and scriptures of Pawanputra Hanuman with complete source citations
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => setCurrentPage('leelas')} className="gap-2">
              <Sparkles className="h-5 w-5" />
              Explore Divine Leelas
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentPage('timeline')} className="gap-2">
              <Clock className="h-5 w-5" />
              View Timeline
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Featured Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('leelas')}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle>Divine Leelas</CardTitle>
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
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('powers')}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle>Powers & Siddhis</CardTitle>
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
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('teachings')}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-amber-500" />
              </div>
              <CardTitle>Sacred Teachings</CardTitle>
              <CardDescription>
                Learn the profound spiritual lessons from Hanuman's life and devotion
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-orange-500">10+</div>
            <div className="text-sm text-muted-foreground">Divine Leelas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-500">5+</div>
            <div className="text-sm text-muted-foreground">Sacred Powers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-amber-500">3+</div>
            <div className="text-sm text-muted-foreground">Core Teachings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-orange-600">5+</div>
            <div className="text-sm text-muted-foreground">Sacred Temples</div>
          </CardContent>
        </Card>
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
    return <div className="text-center py-12">Loading timeline...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Complete Timeline</h2>
        <p className="text-muted-foreground">Chronological journey through Lord Hanuman's divine life</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-red-600" />

        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              <div className="absolute left-6 w-5 h-5 rounded-full bg-orange-500 border-4 border-background" />
              
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.summary}</CardDescription>
                    </div>
                    <Badge variant="secondary">{event.era}</Badge>
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
    return <div className="text-center py-12">Loading divine leelas...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Divine Leelas</h2>
        <p className="text-muted-foreground">Miraculous deeds and divine plays of Lord Hanuman</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'birth' ? 'default' : 'outline'}
          onClick={() => setFilter('birth')}
        >
          Birth
        </Button>
        <Button
          variant={filter === 'leela' ? 'default' : 'outline'}
          onClick={() => setFilter('leela')}
        >
          Leelas
        </Button>
        <Button
          variant={filter === 'blessing' ? 'default' : 'outline'}
          onClick={() => setFilter('blessing')}
        >
          Blessings
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow h-full"
              onClick={() => setSelectedEvent(event)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge>{event.category}</Badge>
                  <Badge variant="outline">{event.era}</Badge>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="line-clamp-3">{event.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold text-orange-500">{event.scripture}</div>
                  <div>{event.section}, Chapter {event.chapter}</div>
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
    return <div className="text-center py-12">Loading powers...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Powers & Siddhis</h2>
        <p className="text-muted-foreground">Supernatural abilities blessed to Lord Hanuman</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {powers.map((power, index) => (
          <motion.div
            key={power.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  {power.title}
                </CardTitle>
                <CardDescription>{power.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{power.details}</p>
                {power.powers && (
                  <div className="flex flex-wrap gap-2">
                    {power.powers.map(p => (
                      <Badge key={p} variant="secondary">{p}</Badge>
                    ))}
                  </div>
                )}
                <div className="pt-4 border-t">
                  <div className="text-sm font-semibold text-orange-500">{power.scripture}</div>
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
    return <div className="text-center py-12">Loading teachings...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Sacred Teachings</h2>
        <p className="text-muted-foreground">Profound spiritual lessons from Hanuman's life</p>
      </div>

      <div className="space-y-6">
        {teachings.map((teaching, index) => (
          <motion.div
            key={teaching.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-amber-500" />
                  {teaching.title}
                </CardTitle>
                <CardDescription className="text-base font-semibold">
                  {teaching.teaching}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{teaching.description}</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="italic text-sm">&ldquo;{teaching.quote}&rdquo;</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Source: {teaching.scripture}
                </div>
              </CardContent>
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
    return <div className="text-center py-12">Loading sacred places...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Sacred Places</h2>
        <p className="text-muted-foreground">Temples and pilgrimage sites of Lord Hanuman</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Simple Map Placeholder */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Temple Locations</h3>
          <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive India map with temple markers</p>
              <div className="mt-4 space-y-2">
                {temples.map(temple => (
                  <button
                    key={temple.id}
                    onClick={() => setSelectedTemple(temple)}
                    className="block w-full text-left px-4 py-2 hover:bg-background/50 rounded"
                  >
                    <div className="font-semibold">{temple.name}</div>
                    <div className="text-sm text-muted-foreground">{temple.location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Temple List */}
        <div className="space-y-4">
          {temples.map((temple, index) => (
            <motion.div
              key={temple.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${selectedTemple?.id === temple.id ? 'ring-2 ring-orange-500' : ''}`}
                onClick={() => setSelectedTemple(temple)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    {temple.name}
                  </CardTitle>
                  <CardDescription>{temple.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{temple.description}</p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Significance:</strong> {temple.significance}
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
    return <div className="text-center py-12">Loading relationships...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Divine Relationships</h2>
        <p className="text-muted-foreground">Connections with gods, family, and devotees</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {relationships.map((rel, index) => (
          <motion.div
            key={rel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  {rel.name}
                </CardTitle>
                <CardDescription className="font-semibold">{rel.relation}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{rel.description}</p>
                {rel.quote && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="italic text-sm">&ldquo;{rel.quote}&rdquo;</p>
                  </div>
                )}
                {rel.scripture && (
                  <div className="text-sm text-muted-foreground">
                    Source: {rel.scripture}
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
  const images = [
    { id: 1, url: 'https://images.pexels.com/photos/3519190/pexels-photo-3519190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Lord Hanuman' },
    { id: 2, url: 'https://images.pexels.com/photos/9691182/pexels-photo-9691182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Divine Form' },
    { id: 3, url: 'https://images.pexels.com/photos/14367176/pexels-photo-14367176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Sacred Temple' },
    { id: 4, url: 'https://images.pexels.com/photos/36526508/pexels-photo-36526508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Temple Architecture' },
    { id: 5, url: 'https://images.unsplash.com/photo-1596550933678-4e760b4bf87b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', title: 'Devotion' },
    { id: 6, url: 'https://images.unsplash.com/photo-1649779241200-ef4de69147a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxkZXZvdGlvbiUyMHByYXllcnxlbnwwfHx8b3JhbmdlfDE3ODQ4MjA5MTB8MA&ixlib=rb-4.1.0&q=85', title: 'Prayer' },
    { id: 7, url: 'https://images.unsplash.com/photo-1662104249831-233d41ef4d33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHx0ZW1wbGUlMjBzcGlyaXR1YWx8ZW58MHx8fG9yYW5nZXwxNzg0ODIwOTAzfDA&ixlib=rb-4.1.0&q=85', title: 'Spiritual' },
    { id: 8, url: 'https://images.pexels.com/photos/37655777/pexels-photo-37655777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Meditation' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        <p className="text-muted-foreground">Divine images and temple photographs</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-semibold">{image.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// References Page
function ReferencesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">References</h2>
        <p className="text-muted-foreground">Primary sources and bibliography</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Primary Scriptures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-orange-500">Valmiki Ramayana</h4>
              <p className="text-sm text-muted-foreground">
                The oldest Sanskrit epic, contains detailed accounts of Hanuman's role in Rama's quest
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-orange-500">Hanuman Chalisa</h4>
              <p className="text-sm text-muted-foreground">
                40-verse hymn by Tulsidas in praise of Hanuman's virtues and powers
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-orange-500">Mahabharata</h4>
              <p className="text-sm text-muted-foreground">
                Contains episodes of Hanuman in Dvapara Yuga, including his meeting with Bhima
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-orange-500">Shiva Purana</h4>
              <p className="text-sm text-muted-foreground">
                Describes Hanuman as an aspect of Lord Shiva
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              All information presented on this platform is sourced from authentic Sanskrit scriptures with proper citations including:
            </p>
            <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
              <li>Scripture name and section</li>
              <li>Chapter and verse numbers</li>
              <li>Original Sanskrit text where available</li>
              <li>Hindi and English translations</li>
              <li>Historical and cultural context</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              When multiple versions or interpretations exist, they are presented side by side for scholarly comparison.
            </p>
          </CardContent>
        </Card>
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Ask About Lord Hanuman</DialogTitle>
          <DialogDescription>
            Ask questions about scriptures, teachings, and divine leelas
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ask me anything about Lord Hanuman</p>
                <p className="text-sm mt-2">I'll answer based on authentic scriptures</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-xs font-semibold mb-2">Sources:</p>
                      {msg.sources.map((source, i) => (
                        <div key={i} className="text-xs mb-1">
                          • {source.title} - {source.scripture}
                          {source.chapter && ` (Ch. ${source.chapter}, V. ${source.verse})`}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about scriptures, teachings, powers..."
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Event Detail Dialog
function EventDetailDialog({ event, isOpen, onClose }) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <div className="flex gap-2 mt-2">
            <Badge>{event.category}</Badge>
            <Badge variant="outline">{event.era}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Summary</h4>
            <p className="text-muted-foreground">{event.summary}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p>{event.description}</p>
          </div>

          <Separator />

          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-semibold text-orange-500 mb-2">Scripture Reference</h4>
              <p className="text-sm">
                <strong>{event.scripture}</strong> • {event.section} • Chapter {event.chapter} • Verse {event.verse}
              </p>
            </div>

            {event.sanskrit && (
              <div>
                <h5 className="text-sm font-semibold mb-1">Sanskrit:</h5>
                <p className="text-sm italic">{event.sanskrit}</p>
              </div>
            )}

            {event.hindi && (
              <div>
                <h5 className="text-sm font-semibold mb-1">Hindi:</h5>
                <p className="text-sm">{event.hindi}</p>
              </div>
            )}

            {event.english && (
              <div>
                <h5 className="text-sm font-semibold mb-1">English:</h5>
                <p className="text-sm">{event.english}</p>
              </div>
            )}
          </div>

          {event.relatedCharacters && event.relatedCharacters.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Related Characters</h4>
              <div className="flex flex-wrap gap-2">
                {event.relatedCharacters.map(char => (
                  <Badge key={char} variant="secondary">{char}</Badge>
                ))}
              </div>
            </div>
          )}

          {event.relatedPlaces && event.relatedPlaces.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Related Places</h4>
              <div className="flex flex-wrap gap-2">
                {event.relatedPlaces.map(place => (
                  <Badge key={place} variant="outline">{place}</Badge>
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
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

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