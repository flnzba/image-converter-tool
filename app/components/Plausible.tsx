'use client';

import { useEffect } from 'react';

export default function Plausible() {
  useEffect(() => {
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', 'ai-image-converter.com');
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Return null since this is just a utility component
}
