import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { scriptureEvents, powers, teachings, temples, relationships, hanumanChalisa } from '@/lib/data/scriptureData';

let client;
let db;

async function connectDB() {
  if (!process.env.MONGO_URL) {
    console.warn('MONGO_URL not configured');
    return null;
  }
  
  if (!db) {
    try {
      client = new MongoClient(process.env.MONGO_URL);
      await client.connect();
      db = client.db(process.env.DB_NAME || 'hanuman_knowledge');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return null;
    }
  }
  return db;
}

// Simple RAG implementation with in-memory search
function searchScriptures(query) {
  const lowercaseQuery = query.toLowerCase();
  const results = [];

  // Search in scripture events
  scriptureEvents.forEach(event => {
    let score = 0;
    const searchText = `${event.title} ${event.description} ${event.summary} ${event.english} ${event.hindi}`.toLowerCase();
    
    // Simple keyword matching
    const queryWords = lowercaseQuery.split(' ');
    queryWords.forEach(word => {
      if (word.length > 2 && searchText.includes(word)) {
        score += 1;
      }
    });

    if (score > 0) {
      results.push({ ...event, score, type: 'event' });
    }
  });

  // Search in teachings
  teachings.forEach(teaching => {
    let score = 0;
    const searchText = `${teaching.title} ${teaching.teaching} ${teaching.description}`.toLowerCase();
    
    const queryWords = lowercaseQuery.split(' ');
    queryWords.forEach(word => {
      if (word.length > 2 && searchText.includes(word)) {
        score += 0.8;
      }
    });

    if (score > 0) {
      results.push({ ...teaching, score, type: 'teaching' });
    }
  });

  // Search in powers
  powers.forEach(power => {
    let score = 0;
    const searchText = `${power.title} ${power.description} ${power.details}`.toLowerCase();
    
    const queryWords = lowercaseQuery.split(' ');
    queryWords.forEach(word => {
      if (word.length > 2 && searchText.includes(word)) {
        score += 0.7;
      }
    });

    if (score > 0) {
      results.push({ ...power, score, type: 'power' });
    }
  });

  // Sort by score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 5); // Return top 5 results
}

// AI Chat function using simple RAG
async function chatWithAI(message, conversationHistory = []) {
  try {
    const relevantContext = searchScriptures(message);
    
    // Build response from search results (simple RAG implementation)
    if (relevantContext.length === 0) {
      return {
        response: "I apologize, but I couldn't find information related to your question in my scripture database. Please try asking about Hanuman's birth, his meeting with Rama, the ocean crossing, bringing Sanjeevani, or his powers and teachings.",
        sources: []
      };
    }
    
    let response = "Based on the scriptures:\n\n";
    
    relevantContext.slice(0, 3).forEach((item, index) => {
      if (item.type === 'event') {
        response += `${index + 1}. **${item.title}**\n`;
        response += `${item.description}\n\n`;
        response += `*Source: ${item.scripture}, ${item.section}, Chapter ${item.chapter}, Verse ${item.verse}*\n`;
        if (item.english) {
          response += `Translation: "${item.english}"\n\n`;
        }
      } else if (item.type === 'teaching') {
        response += `${index + 1}. **${item.title}**\n`;
        response += `${item.description}\n\n`;
        response += `*Source: ${item.scripture}*\n\n`;
      } else if (item.type === 'power') {
        response += `${index + 1}. **${item.title}**\n`;
        response += `${item.details}\n\n`;
      }
    });

    return {
      response: response,
      sources: relevantContext.slice(0, 3).map(item => ({
        title: item.title,
        scripture: item.scripture,
        chapter: item.chapter,
        verse: item.verse,
        type: item.type
      }))
    };
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname || '';
    const searchParams = url.searchParams;
    const path = pathname.replace('/api', '') || '/';
  
    // Health check
    if (path === '/' || path === '') {
      return NextResponse.json({ message: 'Hanuman Knowledge Base API is running', status: 'ok' });
    }

    // Get all scripture events
    if (path === '/events') {
      const category = searchParams.get('category');
      const scripture = searchParams.get('scripture');
      
      let filtered = scriptureEvents;
      
      if (category) {
        filtered = filtered.filter(e => e.category === category);
      }
      
      if (scripture) {
        filtered = filtered.filter(e => e.scripture.toLowerCase().includes(scripture.toLowerCase()));
      }
      
      return NextResponse.json({ events: filtered, count: filtered.length });
    }

    // Get single event
    if (path.startsWith('/events/')) {
      const id = path.split('/')[2];
      const event = scriptureEvents.find(e => e.id === id);
      
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      
      // Get related events
      const related = scriptureEvents.filter(e => 
        e.id !== id && 
        (e.relatedCharacters.some(c => event.relatedCharacters.includes(c)) ||
         e.relatedPlaces.some(p => event.relatedPlaces.includes(p)))
      ).slice(0, 3);
      
      return NextResponse.json({ event, related });
    }

    // Get powers
    if (path === '/powers') {
      return NextResponse.json({ powers });
    }

    // Get teachings
    if (path === '/teachings') {
      return NextResponse.json({ teachings });
    }

    // Get temples
    if (path === '/temples') {
      return NextResponse.json({ temples });
    }

    // Get relationships
    if (path === '/relationships') {
      return NextResponse.json({ relationships });
    }

    // Get Hanuman Chalisa
    if (path === '/chalisa') {
      return NextResponse.json({ chalisa: hanumanChalisa });
    }

    // Search endpoint
    if (path === '/search') {
      const query = searchParams.get('q');
      if (!query) {
        return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
      }
      
      const results = searchScriptures(query);
      return NextResponse.json({ results, count: results.length });
    }

    // Timeline data
    if (path === '/timeline') {
      const timeline = scriptureEvents
        .sort((a, b) => {
          const order = ['birth', 'leela', 'relationship', 'blessing', 'teaching'];
          return order.indexOf(a.category) - order.indexOf(b.category);
        })
        .map(e => ({
          id: e.id,
          title: e.title,
          summary: e.summary,
          era: e.era,
          year: e.year,
          category: e.category
        }));
      
      return NextResponse.json({ timeline });
    }

    // Get bookmarks
    if (path === '/bookmarks') {
      const database = await connectDB();
      if (!database) {
        return NextResponse.json({ bookmarks: [] });
      }
      const bookmarks = await database.collection('bookmarks').find({}).toArray();
      return NextResponse.json({ bookmarks });
    }

    return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname || '';
    const path = pathname.replace('/api', '');
    const body = await request.json();

    // AI Chat endpoint
    if (path === '/chat') {
      const { message, history } = body;
      
      if (!message) {
        return NextResponse.json({ error: 'Message is required' }, { status: 400 });
      }

      const result = await chatWithAI(message, history || []);
      return NextResponse.json(result);
    }

    // Save bookmark
    if (path === '/bookmarks') {
      const { eventId, userId } = body;
      
      if (!eventId) {
        return NextResponse.json({ error: 'Event ID required' }, { status: 400 });
      }

      const database = await connectDB();
      if (!database) {
        return NextResponse.json({ error: 'Database not available' }, { status: 503 });
      }

      const bookmark = {
        eventId,
        userId: userId || 'anonymous',
        createdAt: new Date()
      };
      
      await database.collection('bookmarks').insertOne(bookmark);
      return NextResponse.json({ success: true, bookmark });
    }

    return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname || '';
    const path = pathname.replace('/api', '');

    // Delete bookmark
    if (path.startsWith('/bookmarks/')) {
      const id = path.split('/')[2];
      const database = await connectDB();
      if (!database) {
        return NextResponse.json({ error: 'Database not available' }, { status: 503 });
      }
      await database.collection('bookmarks').deleteOne({ eventId: id });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message 
    }, { status: 500 });
  }
}