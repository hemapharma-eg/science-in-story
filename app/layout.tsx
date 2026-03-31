import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'العلم في حكاية - Science in Story',
  description: 'منصة العلم في حكاية - مقالات وفيديوهات علمية شيقة',
  manifest: '/manifest.json',
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
        {/* Google AdSense Script Placeholder */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={cairo.className}>
        <div className="layout-wrapper">
          <header className="main-header">
            <div className="container header-content" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <h1>العلم في حكاية</h1>
              <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="/">الرئيسية</a>
                <div id="google_translate_element" style={{ minWidth: '150px' }}></div>
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

        {/* Google Translate Integration */}
        <Script id="google-translate-config" strategy="lazyOnload">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement({
                pageLanguage: 'ar',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
