'use client';

import { useEffect } from 'react';

export function RegistroServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrado'))
        .catch((error) => console.error('Error al registrar:', error));
    }
  }, []);
  return null;
}
