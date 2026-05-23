🛠️ Instalación y Despliegue Local
Clonar el repositorio e instalar dependencias:

Bash
npm install
Ejecutar el entorno de desarrollo:
## next-ssg-isr-app

Aplicación de ejemplo construida con Next.js + TypeScript que demuestra patrones de renderizado: SSG (Static Site Generation), ISR (Incremental Static Regeneration) y CSR (Client-Side Rendering).

## Resumen

- Rutas de ejemplo: `/rickandmorty` y `/pokemon`.
- Uso de SSG para páginas que pueden generarse en build time.
- ISR en páginas individuales con revalidación periódica.
- Búsqueda y filtros implementados con CSR para mejor UX.

## Requisitos

- Node.js 18+ (recomendado)
- npm (o yarn/pnpm)

## Instalación

1. Clona el repositorio:

	git clone <repo-url>
	cd next-ssg-isr-app

2. Instala dependencias:

	npm install

## Scripts disponibles

- `npm run dev` — Levanta el servidor de desarrollo en `http://localhost:3000`.
- `npm run build` — Compila la aplicación para producción. Este paso ejecuta el tipado TypeScript y genera los assets estáticos (SSG). También resuelve `generateStaticParams()` para prerenderizar las rutas configuradas.
- `npm run start` — Inicia el servidor de producción optimizado (usa los artefactos generados por `build`).

## Notas sobre renderizado

- SSG (Static Site Generation): usado en la página principal de `/rickandmorty` para contenido que no cambia con frecuencia. Mejora el rendimiento y FCP.
- ISR (Incremental Static Regeneration): aplicado en rutas dinámicas como `/rickandmorty/[id]` con revalidación periódica para actualizar páginas sin desplegar.
- CSR (Client-Side Rendering): usado en componentes de búsqueda y filtrado para una experiencia interactiva sin recargas completas.

## Estructura relevante del proyecto

- `app/` — Rutas y componentes de la aplicación (Next 13 app router).
- `public/` — Archivos estáticos.
- `types/` — Tipados TypeScript para entidades (p. ej. Pokemon, Rick & Morty).

## Despliegue

Se puede desplegar en Vercel, Netlify u otro proveedor compatible con Next.js. En Vercel normalmente basta con conectar el repositorio y usar los comandos por defecto de build (`npm run build`).

## Buenas prácticas y recomendaciones

- Mantener variables sensibles fuera del repositorio (`.env.local`).
- Revisar los tiempos de revalidación ISR para equilibrar frescura y coste de render.

## Contribuciones

Si quieres colaborar, abre un issue o envía un pull request con cambios pequeños y documentados.

## Licencia

Proyecto para fines educativos. Añade una licencia si piensas publicar o compartir públicamente.

---

Si quieres que adapte el README a inglés, añada badges (CI, cobertura) o incluya instrucciones de despliegue en Vercel/Docker, dime cuál prefieres y lo hago.
