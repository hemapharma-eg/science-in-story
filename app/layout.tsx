import type { Metadata } from 'next';
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
          <header className="main-header glass-panel">
            <div className="container header-content">
              <h1>العلم في حكاية</h1>
              <nav>
                <a href="/">الرئيسية</a>
                <a href="/admin">لوحة التحكم</a>
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
