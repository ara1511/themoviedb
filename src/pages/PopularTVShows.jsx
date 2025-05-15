import { useState, useEffect } from "react";
import { getPopularTVShows } from "../services/api";

const PopularTVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const data = await getPopularTVShows(page);
        setShows(data.results.slice(0, 10));
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to fetch TV shows");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Popular TV Shows</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {shows.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 truncate" title={show.name}>
                {show.name}
              </h2>
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {show.first_air_date?.split("-")[0] || "N/A"}
                </span>
                <span className="flex items-center text-yellow-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {show.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>
        <span className="py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularTVShows;
