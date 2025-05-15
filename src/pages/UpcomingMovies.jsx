import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "../services/api";
import { Calendar, Star } from "lucide-react";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data.results);
      } catch (err) {
        setError("Error al cargar los próximos estrenos");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Próximos Estrenos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {movie.title}
              </h2>
              <div className="flex items-center mb-2">
                <Calendar className="text-indigo-600 w-5 h-5" />
                <span className="ml-1 text-gray-600">
                  {new Date(movie.release_date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 w-5 h-5" />
                <span className="ml-1 text-gray-600">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
