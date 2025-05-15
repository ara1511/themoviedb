import axios from "axios";

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
//Obtener información de una persona (actor/actriz)
export const getPersonDetails = async (personId = 224513) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}`, {
      params: { language: "es-ES" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar el perfil:", error);
    throw error;
  }
};
// Obtener películas en las que participó un actor
export const getPersonMovieCredits = async (personId = 224513) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}/movie_credits`, {
      params: { language: "es-ES" },
    });
    const sortedCredits = response.data.cast.sort(
      (a, b) => b.popularity - a.popularity
    );
    return {
      cast: sortedCredits,
      topMovies: sortedCredits.slice(0, 10),
    };
  } catch (error) {
    console.error("Error al recuperar los créditos de películas:", error);
    throw error;
  }
};
//Obtener redes sociales de un actor/actriz
export const getPersonExternalIds = async (personId = 224513) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}/external_ids`);
    return response.data;
  } catch (error) {
    console.error("Error al recuperar IDs externos:", error);
    throw error;
  }
};
//Obtener series de TV en las que participó una persona
export const getPersonTVCredits = async (personId = 224513) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}/tv_credits`, {
      params: { language: "es-ES" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar créditos de TV:", error);
    throw error;
  }
};
//Obtener detalles de una película específica
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: { language: "es-ES" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar detalles de la película:", error);
    throw error;
  }
};
//Obtener series de TV populares
export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/tv/popular", {
      params: { page, language: "es-ES" },
    });
    const results = response.data.results.slice(0, 10);
    return { ...response.data, results };
  } catch (error) {
    console.error("Error al buscar programas de televisión populares:", error);
    throw error;
  }
};
// Obtener películas en tendencia
export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week", {
      params: { language: "es-ES" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar películas en tendencia:", error);
    throw error;
  }
};
//Obtener próximos estrenos
export const getUpcomingMovies = async () => {
  try {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: {
        language: "es-ES",
        region: "ES",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar próximos estrenos:", error);
    throw error;
  }
};
