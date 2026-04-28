'use client';

import { useEffect } from 'react';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    // Initialize dataLayer and global gtag function FIRST
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId);

    // Then load the external gtag.js script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [gaId]);

  return null;
}

// Extend Window interface
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
