# ⚔️ Next.js Multi-Laboratorio: Colisión Interdimensional

Aplicación web premium construida con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**. Este proyecto funciona como un ecosistema multi-laboratorio donde colisionan los universos de **Pokémon** y **Rick & Morty**, implementando de forma agresiva estrategias de renderizado avanzadas en el servidor y el cliente.

---

## 🚀 Arquitectura y Estrategias de Renderizado

### 1. El Nexo Central (`/`)
La página de inicio (`app/page.tsx`) fue diseñada con una estética cinematográfica de "conflicto épico". Funciona como un hub interactivo que divide visualmente ambos mundos mediante degradados animados, efectos de *glassmorphism* y bordes de neón reactivos.

### 2. Laboratorio Pokémon (`/pokemon`)
* **Paginación Avanzada:** El catálogo de criaturas se divide en pestañas dinámicas (de 48 en 48) para optimizar la transferencia de datos.
* **Estrategia ISR:** Los datos se pre-renderizan en el servidor y se revalidan en segundo plano cada 24 horas (`revalidate: 86400`), garantizando una velocidad de carga máxima sin perder frescura.

### 3. Tarea Rick and Morty (`/rickandmorty`)
* **Página Principal (SSG):** Petición inicial forzada en caché (`cache: 'force-cache'`), generando un documento estático ultra rápido durante la compilación para un FCP óptimo.
* **Búsqueda Interactiva (CSR):** Filtros en tiempo real (*Name, Status, Gender, Type*) procesados en el cliente usando `useState` y `useEffect` con un mecanismo de *debounce* para mitigar la saturación de la API.
* **Detalle de Personajes (ISR & `generateStaticParams`):** Mapeo exhaustivo del response (`/[id]`) con rutas estáticas pre-construidas en el build y una **revalidación estática de 10 días** (`revalidate: 864000`).
* **Lazy Loading:** Optimización nativa de imágenes externas mediante carga bajo demanda.

---

## 📁 Estructura del Proyecto

```text
NEXT-SSG-ISR-APP/
├── app/
│   ├── error.tsx                # Manejador global de fallos críticos (Error Boundary)
│   ├── layout.tsx               # Estructura base HTML5 y fuentes globales
│   ├── not-found.tsx            # Captura global de rutas 404 erróneas
│   ├── page.tsx                 # Hub de colisión interdimensional (Landing Page)
│   │
│   ├── pokemon/                 # MÓDULO 1: LABORATORIO POKÉMON (ISR)
│   │   ├── [name]/
│   │   │   └── page.tsx         # Ficha técnica individual y metadata dinámica
│   │   ├── not-found.tsx        # 404 temático de Pokémon
│   │   └── page.tsx             # Catálogo paginado de Pokémon
│   │
│   └── rickandmorty/            # MÓDULO 2: TAREA RICK AND MORTY (SSG/ISR/CSR)
│       ├── [id]/
│       │   └── page.tsx         # Ficha técnica interdimensional (ISR 10 días)
│       ├── character-search.tsx # Grid interactivo y controladores de filtrado (CSR)
│       ├── not-found.tsx        # 404 temático de la Ciudadela de Ricks
│       └── page.tsx             # Vista base del módulo de Rick & Morty (SSG)
│
├── types/
│   ├── pokemon.ts               # Tipado estricto para las respuestas de la PokéAPI
│   └── rickmorty.ts             # Modelos de datos para la API de Rick & Morty
│
├── next.config.ts               # Configuración de políticas de optimización de imágenes
└── tailwind.config.ts           # Configuración de estilos y paleta de colores extendida