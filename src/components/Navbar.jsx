import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#1E2939] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Movie DB</div>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200 transition">
              Ana de Armas
            </Link>
            <Link to="/tv-shows" className="hover:text-blue-200 transition">
              Popular TV Shows
            </Link>
            <Link
              to="/TrendingMovies"
              className="hover:text-blue-200 transition"
            >
              Peliculas en tendecias
            </Link>
            <Link to="/Upcoming" className="hover:text-blue-200 transition">
              Estrenos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
