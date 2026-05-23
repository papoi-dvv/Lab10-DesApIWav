'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí puedes registrar el error en un servicio como Sentry si quisieras
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{ color: '#ef4444', fontSize: '2rem' }}>¡Algo salió mal!</h2>
      <p style={{ color: '#4b5563', margin: '15px 0' }}>
        Ocurrió un error inesperado en la aplicación.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}