import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import Link from 'next/link';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://story.toolabx.com'),
  title: 'العلم في حكاية - Science in Story',
  description: 'منصة العلم في حكاية - مقالات وفيديوهات علمية شيقة',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'العلم في حكاية - Science in Story',
    description: 'منصة العلم في حكاية - مقالات وفيديوهات علمية شيقة',
    url: 'https://story.toolabx.com',
    siteName: 'العلم في حكاية',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 800,
        alt: 'العلم في حكاية Logo',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  verification: {
    google: '3Pc8TP64Alt1MOZZAetFNdHhi8syF1IPVEDKGodIFOU',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'العلم في حكاية',
  },
};

export const viewport: Viewport = {
  themeColor: '#7c3aed',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head />
      <body className={cairo.className}>
        <GoogleAnalytics gaId="G-1FJL0HXWJ5" />
        <div className="layout-wrapper">
          <header className="main-header">
            <div className="container header-content">
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <img src="/logo.jpg" alt="العلم في حكاية" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-light)' }} />
                <h1>العلم في حكاية</h1>
              </Link>
              <nav>
                <Link href="/">الرئيسية</Link>
                <Link href="/about">من نحن</Link>
              </nav>
            </div>
          </header>
          
          <main className="container main-content">
            {children}
          </main>
          
          <footer className="main-footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} العلم في حكاية. جميع الحقوق محفوظة.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
