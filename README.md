# Proyecto Movie DB

Este proyecto es una aplicación web que utiliza la API de The Movie DB para mostrar información sobre Ana de Armas y programas de televisión populares.

## Características

- Vista de perfil de Ana de Armas con biografía e información personal.
- Lista de programas de televisión populares (10 por página) con paginación.
- Diseño responsivo utilizando Tailwind CSS.

## Tecnologías Utilizadas

- React
- Vite
- Tailwind CSS
- Axios para solicitudes a la API
- React Router para la navegación

## Instrucciones de Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Crea un archivo `.env` en el directorio raíz con las siguientes variables:
   ```
   VITE_TMDB_API_KEY=tu_api_key_aqui
   VITE_TMDB_ACCESS_TOKEN=tu_access_token_aqui
   ```
4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

## Variables de Entorno

- `VITE_TMDB_API_KEY`: Tu clave de API de The Movie DB.
- `VITE_TMDB_ACCESS_TOKEN`: Tu token de acceso de The Movie DB.

## Estructura de Carpetas

- `src/`
  - `components/`: Componentes reutilizables de la interfaz de usuario.
  - `pages/`: Componentes de páginas para las diferentes rutas.
  - `services/`: Funciones de servicio para la API.
  - `App.jsx`: Componente principal de la aplicación.
  - `main.jsx`: Punto de entrada de la aplicación.
  - `index.css`: Estilos globales con directivas de Tailwind.

## Información de la API

Este proyecto utiliza la API de The Movie DB. Debes registrarte en [themoviedb.org](https://www.themoviedb.org) para obtener tu clave de API y tu token de acceso.
# themoviedb
