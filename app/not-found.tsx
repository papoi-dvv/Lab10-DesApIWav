import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '4rem', color: '#dc2626', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Página no encontrada</h2>
      <p style={{ color: '#4b5563', marginBottom: '20px' }}>
        El recurso que buscas no existe.
      </p>
      <Link href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
        Volver a la Página Principal
      </Link>
    </div>
  );
}