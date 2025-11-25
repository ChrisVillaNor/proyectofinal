# 📚 APRENDIZAJE.md 

## a) ¿Qué es useState y cuándo usarlo?

### Explicación Teórica

`useState` es un Hook de React que permite agregar estado a componentes funcionales. Retorna un array con dos elementos:
1. El valor actual del estado
2. Una función para actualizar ese estado

**Sintaxis:**
\`\`\`javascript
const [state, setState] = useState(initialValue);
\`\`\`

**¿Cuándo usarlo?**
- Cuando necesitas que un componente "recuerde" información entre renders
- Para manejar formularios y inputs del usuario
- Para controlar la visibilidad de elementos (modales, dropdowns)
- Para almacenar datos que cambian con el tiempo

### Ejemplos del Proyecto

#### Ejemplo 1: Búsqueda con Debounce
\`\`\`javascript
// App.jsx líneas 12-13
const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

// Uso:
<SearchBar
  value={searchTerm}
  onChange={setSearchTerm}
  onClear={handleClearSearch}
/>
\`\`\`
**Por qué:** Necesitamos dos estados separados - uno para el input del usuario (actualización inmediata) y otro para la búsqueda real (con delay de 300ms).

#### Ejemplo 2: Configuración de Ordenamiento
\`\`\`javascript
// App.jsx líneas 22-25
const [sortConfig, setSortConfig] = useState({
  key: null,
  direction: 'none'
});

// Uso en el handler:
const handleSort = (key) => {
  setSortConfig(prev => {
    if (prev.key !== key) {
      return { key, direction: 'asc' };
    }
    if (prev.direction === 'asc') {
      return { key, direction: 'desc' };
    }
    if (prev.direction === 'desc') {
      return { key: null, direction: 'none' };
    }
    return { key, direction: 'asc' };
  });
};
\`\`\`
**Por qué:** El ordenamiento tiene un estado complejo (columna + dirección) que cicla entre tres valores, por eso usamos un objeto.

#### Ejemplo 3: Sistema de Favoritos
\`\`\`javascript
// App.jsx líneas 31-32
const [favorites, setFavorites] = useState([]);
const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

// Uso en el handler:
const handleToggleFavorite = (playerId) => {
  setFavorites(prev =>
    prev.includes(playerId)
      ? prev.filter(id => id !== playerId)
      : [...prev, playerId]
  );
};
\`\`\`
**Por qué:** Necesitamos mantener una lista de IDs de favoritos y un booleano para filtrar. El callback `prev =>` asegura que siempre trabajamos con el estado más reciente.

---

## b) ¿Qué es useEffect y sus casos de uso?

### Explicación del Ciclo de Vida

`useEffect` permite realizar **efectos secundarios** en componentes funcionales. Es el equivalente a `componentDidMount`, `componentDidUpdate` y `componentWillUnmount` combinados.

**Sintaxis:**
\`\`\`javascript
useEffect(() => {
  // Código del efecto
  
  return () => {
    // Cleanup (opcional)
  };
}, [dependencies]);
\`\`\`

### Diferencias en el Array de Dependencias

| Array de Dependencias | Comportamiento | Uso |
|----------------------|----------------|-----|
| `[]` (vacío) | Se ejecuta **solo una vez** al montar | Inicialización, fetch inicial |
| `[dep1, dep2]` | Se ejecuta cuando **cambian las dependencias** | Sincronización con estado/props |
| Sin array | Se ejecuta **en cada render** | ⚠️ Cuidado: puede causar loops infinitos |

### Ejemplo de Cleanup Function

\`\`\`javascript
// App.jsx líneas 44-50 - Debounce de búsqueda
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer); // 👈 CLEANUP
}, [searchTerm]);
\`\`\`

## c) ¿Qué es useMemo y cuándo usarlo?

### Explicación

`useMemo` es un Hook que **memoriza el resultado** de un cálculo costoso y solo lo recalcula cuando sus dependencias cambian. Previene re-cálculos innecesarios en cada render.

**Sintaxis:**
\`\`\`javascript
const memoizedValue = useMemo(() => {
  // Cálculo costoso
  return computedValue;
}, [dependencies]);
\`\`\`

### Diferencia con useCallback

| Hook | Memoriza | Uso |
|------|----------|-----|
| `useMemo` | **El resultado** de una función | Cálculos costosos, filtros, ordenamientos |
| `useCallback` | **La función misma** | Funciones que se pasan como props |

\`\`\`javascript
// useMemo - memoriza el VALOR
const sortedList = useMemo(() => list.sort(), [list]);

// useCallback - memoriza la FUNCIÓN
const handleClick = useCallback(() => doSomething(), []);
\`\`\`

### Ejemplos de Optimización en el Proyecto

#### Ejemplo 1: Filtrado de Jugadores
\`\`\`javascript
// App.jsx líneas 78-92
const filteredPlayers = useMemo(() => {
  let filtered = playersData;

  // Filtrar por búsqueda
  if (debouncedSearch) {
    filtered = filtered.filter(player =>
      player.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  // Filtrar por favoritos
  if (showOnlyFavorites) {
    filtered = filtered.filter(player => favorites.includes(player.id));
  }

  return filtered;
}, [debouncedSearch, showOnlyFavorites, favorites]);
\`\`\`
**Optimización:** El filtrado solo se ejecuta cuando cambia la búsqueda, favoritos o el toggle. Sin useMemo, se filtrarían los 50 jugadores en **cada render**.

## d) ¿Cómo funciona el cleanup en useEffect?

### Explicación

El **cleanup** es una función que se ejecuta **antes** de que se ejecute nuevamente el efecto o cuando el componente se desmonta. Se usa para:
- Cancelar timers o intervals
- Cancelar peticiones HTTP
- Limpiar event listeners
- Desuscribirse de observables

**¿Cuándo se ejecuta?**
1. Antes de ejecutar el efecto nuevamente (si las dependencias cambiaron)
2. Al desmontar el componente

### Ejemplo del Debounce

\`\`\`javascript
// App.jsx líneas 44-50
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer); // CLEANUP
}, [searchTerm]);
\`\`\`

#### Flujo de Ejecución:

**Usuario escribe "Messi":**
1. `searchTerm = "M"` → Se crea timer1 (300ms)
2. Antes de 300ms: `searchTerm = "Me"` → **CLEANUP ejecuta clearTimeout(timer1)** → Se crea timer2
3. Antes de 300ms: `searchTerm = "Mes"` → **CLEANUP ejecuta clearTimeout(timer2)** → Se crea timer3
4. Usuario deja de escribir por 300ms → timer3 se ejecuta → `setDebouncedSearch("Mes")`

**Sin cleanup:**
- Todos los timers se ejecutarían
- Se haría una búsqueda por cada letra
- Resultado: 5 búsquedas en lugar de 1

## e) ¿Cómo funciona localStorage con React?

### Explicación

`localStorage` es una API del navegador que permite almacenar datos de forma persistente (no se borran al cerrar la pestaña).

**Métodos principales:**
\`\`\`javascript
// Guardar
localStorage.setItem('key', 'value');

// Leer
const value = localStorage.getItem('key');

// Borrar uno
localStorage.removeItem('key');

// Borrar todo
localStorage.clear();
\`\`\`

**⚠️ Importante:**
- Solo almacena **strings**
- Para objetos/arrays: usar \`JSON.stringify()\` y \`JSON.parse()\`
- Límite: ~5-10MB por dominio

### Ejemplos de Persistencia en el Proyecto

#### Ejemplo 1: Modo Oscuro

**Guardar:**
\`\`\`javascript
// App.jsx líneas 63-65
useEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);
\`\`\`

**Cargar:**
\`\`\`javascript
// App.jsx líneas 37-43 (dentro del useEffect inicial)
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
\`\`\`

#### Ejemplo 2: Historial de Búsquedas

**Guardar:**
\`\`\`javascript
// App.jsx líneas 71-73
useEffect(() => {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}, [searchHistory]);
\`\`\`

**Actualizar:**
\`\`\`javascript
// App.jsx líneas 52-60
useEffect(() => {
  if (debouncedSearch && debouncedSearch.length > 2) {
    setSearchHistory(prev => {
      // Evitar duplicados
      const filtered = prev.filter(s => s !== debouncedSearch);
      // Agregar nuevo al inicio
      const updated = [debouncedSearch, ...filtered];
      // Limitar a 5
      return updated.slice(0, 5);
    });
  }
}, [debouncedSearch]);
\`\`\`


### Patrón Completo: Estado + localStorage

\`\`\`javascript
// 1. Definir estado
const [data, setData] = useState([]);

// 2. Cargar al montar (solo una vez)
useEffect(() => {
  const saved = localStorage.getItem('data');
  if (saved) setData(JSON.parse(saved));
}, []); // Array vacío = solo al inicio

// 3. Guardar cuando cambia
useEffect(() => {
  localStorage.setItem('data', JSON.stringify(data));
}, [data]); // Se ejecuta cada vez que cambia data
\`\`\`

🤖 IA

Este proyecto fue desarrollado con la asistencia de: Gemini 3 Pro y ChatGPT (OpenAI GPT-5.1*) en puntualidades de asistencia tecnica y optimización.