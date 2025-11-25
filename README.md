📝 Descripción del Proyecto

Proyecto final desarrollado en React para visualizar y gestionar estadísticas de jugadores de fútbol profesional. La aplicación implementa funcionalidades avanzadas utilizando React Hooks (useState, useEffect, useMemo) y ofrece una experiencia de usuario moderna y fluida, incluyendo todas las funcionalidades solicitadas: búsqueda con debounce, paginación dinámica, ordenamiento, modo oscuro, favoritos, historial, modal y estadísticas en tiempo real.

🚀 Tecnologías Utilizadas

React

Vite

JavaScript

HTML5

CSS3 (metodología BEM)

GitHub

Netlify (Deploy)

💿 Instalación

Requisitos
- Node.js (versión 16 o superior)
- npm

Pasos de Instalación

1. Clonar el repositorio

git clone <https://github.com/ChrisVillaNor/proyectofinal>
cd proyectofinal


2. Instalar dependencias

npm install

3. Iniciar el servidor de desarrollo

npm run dev

4. Abrir en el navegador
- La aplicación se abrirá automáticamente en `http://localhost:5173`

🎣 Hooks Utilizados

useState
Propósito: Gestionar el estado local de los componentes
- `searchTerm` - Término de búsqueda actual
- `debouncedSearch` - Búsqueda con delay
- `searchHistory` - Historial de búsquedas
- `currentPage` - Página actual de paginación
- `itemsPerPage` - Elementos por página
- `sortConfig` - Configuración de ordenamiento
- `rowColors` - Estado de coloreo de filas
- `darkMode` - Modo oscuro/claro
- `favorites` - IDs de jugadores favoritos
- `showOnlyFavorites` - Filtro de favoritos
- `selectedPlayer` - Jugador seleccionado en modal
- `isModalOpen` - Estado del modal

useEffect
Propósito: Efectos secundarios y sincronización con APIs externas
- Carga inicial: Recuperar preferencias de localStorage
- Persistencia: Guardar darkMode, favorites y searchHistory
- Debounce: Implementar delay de 300ms en búsqueda
- Historial: Actualizar historial de búsquedas
- Reseteo: Resetear paginación al cambiar filtros

useMemo
Propósito: Optimización de cálculos costosos
- filteredPlayers: Filtrado de jugadores por búsqueda y favoritos
- sortedPlayers: Ordenamiento de jugadores
- paginatedPlayers: Cálculo de jugadores por página
- stats: Estadísticas en tiempo real (promedio edad, goles, distribución)

👥 Integrantes

- Juan José Vallejo Muñoz - Christopher Villa Noreña

🔗 Link de Deploy

Repositorio

🤖 IA

Este proyecto fue desarrollado con la asistencia de: Gemini 3 Pro y ChatGPT (OpenAI GPT-5.1*) en puntualidades de asistencia tecnica y optimización.

📋 Metodología BEM

Todos los estilos CSS siguen la metodología BEM (Block Element Modifier):
- Block: `.player-table`
- Element: `.player-table__thead`
- Modifier: `.player-table__table--dark`

🎯 Funcionalidades Implementadas

✅ Sistema de búsqueda con debounce (300ms)  
✅ Coloreo inteligente de filas (pares/impares)  
✅ Paginación dinámica completa  
✅ Ordenamiento de columnas  
✅ Modo oscuro/claro con localStorage  
✅ Estadísticas en tiempo real con useMemo  
✅ Modal de detalles con animaciones  
✅ Sistema de favoritos persistente  
✅ Historial de búsquedas  
✅ Componentes reutilizables  

📱 Responsive Design

La aplicación está optimizada para:
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px+)
- 📱 Tablet (768px+)
- 📱 Mobile (320px+)

🛠️ Tecnologías Utilizadas

- React 18.3.1
- Vite 5.4.2
- CSS3 (BEM Methodology)
- JavaScript ES6+
- LocalStorage API


---

