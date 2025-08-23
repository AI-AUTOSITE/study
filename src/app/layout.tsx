// src/app/layout.tsx
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

// フォント設定 - アカデミックな印象のために serif と sans-serif を組み合わせ
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

// layout.tsx の metadata 部分を以下に置き換え（20-68行目）

export const metadata: Metadata = {
  // 本番URLに修正
  metadataBase: new URL('https://study.ai-autosite.com'),
  
  title: {
    default: 'ScholarSumm - Academic Document Analysis & Study Tools',
    template: '%s | ScholarSumm'
  },
  description: 'Transform research papers and academic documents into comprehensive study materials using advanced AI. Trusted by students and researchers worldwide.',
  keywords: [
    'academic research',
    'study tools',
    'paper summarization',
    'research assistant',
    'AI summarization',
    'study cards',
    'flashcards',
    'academic productivity'
  ],
  authors: [{ name: 'ScholarSumm Team' }],
  creator: 'ScholarSumm',
  publisher: 'ScholarSumm',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://study.ai-autosite.com',  // 実際のURLに修正
    siteName: 'ScholarSumm',
    title: 'ScholarSumm - Academic Document Analysis & Study Tools',
    description: 'Transform research papers into comprehensive study materials using advanced AI technology.',
    images: [
      {
        url: 'https://study.ai-autosite.com/og-image.png',  // 絶対URLに修正
        width: 1200,
        height: 630,
        alt: 'ScholarSumm - Academic Research Assistant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarSumm - Academic Document Analysis',
    description: 'Transform research papers into study materials with AI',
    images: ['https://study.ai-autosite.com/twitter-image.png'],  // 絶対URLに修正
    creator: '@scholarsumm',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#312e81', // indigo-900
          colorText: '#111827', // gray-900
          colorBackground: '#ffffff',
          colorInputBackground: '#f9fafb', // gray-50
          colorInputText: '#111827',
          borderRadius: '0.375rem',
          fontFamily: inter.style.fontFamily,
        },
        elements: {
          formButtonPrimary: 'bg-indigo-900 hover:bg-indigo-800',
          card: 'shadow-lg',
          headerTitle: 'font-serif text-2xl',
          headerSubtitle: 'text-gray-600',
        },
      }}
    >
      <html 
        lang="en" 
        suppressHydrationWarning
        className={`${inter.variable} ${merriweather.variable}`}
      >
        <head>
          {/* Additional meta tags for academic credibility */}
          <meta name="application-name" content="ScholarSumm" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="ScholarSumm" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#312e81" />
        </head>
        <body 
          suppressHydrationWarning
          className={`${inter.className} antialiased bg-white text-gray-900`}
        >
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-900 text-white px-4 py-2 rounded"
          >
            Skip to main content
          </a>
          
          <div id="main-content">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}