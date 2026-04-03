import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
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
      <head>
        {/* Google Analytics - Measurement ID: G-1FJL0HXWJ5, Stream ID: 14303285021 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1FJL0HXWJ5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1FJL0HXWJ5');
          `}
        </Script>

        {/* Google AdSense Script Placeholder */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={cairo.className}>
        <div className="layout-wrapper">
          <header className="main-header">
            <div className="container header-content">
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
