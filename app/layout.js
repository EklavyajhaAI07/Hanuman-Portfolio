import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'श्री हनुमान ज्ञान कोष | Lord Hanuman Knowledge Base',
  description: 'A complete digital encyclopedia dedicated to Lord Hanuman with authentic scripture references, divine leelas, teachings, and sacred places. Explore the life and wisdom of Pawanputra Hanuman.',
  keywords: 'Hanuman, Lord Hanuman, Hanuman Chalisa, Ramayana, Hindu Scriptures, Devotional, Spiritual Knowledge, Indian Mythology',
  authors: [{ name: 'Hanuman Knowledge Base' }],
  openGraph: {
    title: 'श्री हनुमान ज्ञान कोष',
    description: 'Complete encyclopedia of Lord Hanuman with authentic scripture references',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🙏</text></svg>" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}