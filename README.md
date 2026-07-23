# श्री हनुमान ज्ञान कोष | Lord Hanuman Knowledge Base

A premium portfolio-style digital encyclopedia dedicated to Lord Hanuman with complete scripture references, divine leelas, teachings, and sacred places.

## ✨ Features

### Core Pages
1. **Home** - Premium landing page with featured content
2. **Complete Timeline** - Interactive chronological journey through Hanuman's life
3. **Divine Leelas** - Miraculous deeds from various scriptures
4. **Powers and Siddhis** - Eight supernatural abilities and divine powers
5. **Teachings** - Profound spiritual lessons and philosophy
6. **Scriptures** - Browse content by sacred texts
7. **Sacred Places** - Temple locations across India with interactive map
8. **Relationships** - Divine connections with Ram, Sita, and others
9. **Gallery** - Curated spiritual images
10. **References** - Complete bibliography and methodology

### Key Features
- ✅ **Complete Scripture Citations** - Every statement backed by source, chapter, and verse
- ✅ **AI Chatbot with RAG** - Ask questions, get answers from authentic scriptures
- ✅ **Three Theme Modes** - Light, Dark, and Bhagwa (saffron) themes
- ✅ **Full-Text Search** - Find content across all scriptures
- ✅ **Filters** - By scripture, era, and category
- ✅ **Responsive Design** - Works beautifully on all devices
- ✅ **Elegant Animations** - Smooth Framer Motion transitions
- ✅ **Citation System** - Sanskrit, Hindi, and English translations
- ✅ **Interactive Timeline** - Visual journey through major events

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB
- **UI**: shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **Themes**: next-themes (Light/Dark/Bhagwa)
- **Icons**: Lucide React

## 📚 Data Architecture

Every event includes:
- Title and detailed description
- Scripture source with exact chapter and verse
- Sanskrit original text
- Hindi translation
- English translation
- Related characters and places
- Era and category classification

### Sample Data Includes:
- 10+ Divine Leelas from Ramayana and Mahabharata
- 5+ Supernatural Powers (Ashtasiddhis)
- 3+ Core Teachings
- 5+ Sacred Temple locations
- 5+ Key Relationships
- Hanuman Chalisa verses with translations

## 🚀 Getting Started

The application is already running. Access it at:
```
http://localhost:3000
```

Or use the public URL:
```
https://afe69854-54f0-4c9e-81a4-6e119a8bc4b7.preview.emergentagent.com
```

## 📡 API Endpoints

### GET Endpoints
- `GET /api/` - Health check
- `GET /api/events` - Get all scripture events
- `GET /api/events?category=leela` - Filter by category
- `GET /api/events?scripture=Ramayana` - Filter by scripture
- `GET /api/events/:id` - Get single event with related events
- `GET /api/powers` - Get all powers and siddhis
- `GET /api/teachings` - Get all teachings
- `GET /api/temples` - Get all temple locations
- `GET /api/relationships` - Get all relationships
- `GET /api/chalisa` - Get Hanuman Chalisa verses
- `GET /api/timeline` - Get timeline data
- `GET /api/search?q=ocean` - Search across all content
- `GET /api/bookmarks` - Get saved bookmarks

### POST Endpoints
- `POST /api/chat` - AI chatbot with RAG
  ```json
  {
    "message": "Tell me about Hanuman crossing the ocean",
    "history": []
  }
  ```
- `POST /api/bookmarks` - Save bookmark
  ```json
  {
    "eventId": "1",
    "userId": "user123"
  }
  ```

### DELETE Endpoints
- `DELETE /api/bookmarks/:id` - Delete bookmark

## 🎨 Theme System

Three theme modes:
1. **Light Mode** - Clean, bright interface
2. **Dark Mode** - Premium black theme
3. **Bhagwa Mode** - Deep saffron/ochre religious theme

Toggle themes using the Sun/Moon/Flame buttons in the navigation.

## 🤖 AI Chatbot

The chatbot implements a simple RAG (Retrieval-Augmented Generation) pipeline:
1. User asks a question
2. System searches scripture database using keyword matching
3. Returns top relevant results with complete citations
4. Displays scripture source, chapter, verse, and translations

Example questions:
- "Tell me about Hanuman's birth"
- "What are the eight siddhis?"
- "How did Hanuman bring the Sanjeevani?"
- "What are Hanuman's teachings on devotion?"

## 🗺️ Map Feature

Simple SVG-based India map showing:
- 5 major Hanuman temples
- Location details and significance
- Clickable markers for each temple

## 📱 PWA Support

The application is configured as a Progressive Web App:
- Installable on mobile devices
- Offline-ready structure
- Fast loading with optimized images

## 🔍 SEO Optimization

- Comprehensive meta tags
- Open Graph support
- Semantic HTML structure
- Optimized page titles and descriptions

## 📖 Scripture Sources

Primary sources include:
- **Valmiki Ramayana** - Complete Hanuman narrative
- **Hanuman Chalisa** - 40-verse devotional hymn
- **Mahabharata** - Hanuman in Dvapara Yuga
- **Shiva Purana** - Divine aspects
- **Adhyatma Ramayana** - Spiritual interpretations

## 🎯 Key Pages

### Home Page
- Hero section with call-to-action
- Feature cards for quick navigation
- Statistics showcase

### Divine Leelas
- Grid/card layout
- Category filters
- Click to view full details with citations

### Timeline
- Chronological visualization
- Era-based organization
- Interactive scroll experience

### AI Chatbot
- Floating chat button
- Full-screen dialog interface
- Source citations for every answer
- Conversation history

## 🎨 Design Philosophy

- **Premium Aesthetic**: Black, ochre, and saffron color palette
- **Citation-First**: Every statement backed by scripture reference
- **Accessibility**: High contrast, readable fonts, semantic HTML
- **Performance**: Optimized images, lazy loading, minimal JS
- **Responsive**: Mobile-first design approach

## 📝 Development Notes

- All data is currently mock/sample data based on authentic scriptures
- Citations are accurate references to real scripture chapters and verses
- Translations are simplified for educational purposes
- For production, consider integrating actual LLM API for enhanced chatbot responses

## 🙏 Acknowledgments

All content is sourced from authentic Hindu scriptures with proper attribution. This platform is built with reverence and devotion to Lord Hanuman.

**जय श्री राम • जय हनुमान**

---

Built with ❤️ using Next.js, MongoDB, and shadcn/ui
