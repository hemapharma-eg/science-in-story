'use client';

import { useEffect } from 'react';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    // Initialize dataLayer and global gtag function FIRST
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId);

    // Load the external gtag.js script WITHOUT crossOrigin
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    // Do NOT set script.crossOrigin — Google's servers don't send CORS headers
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
