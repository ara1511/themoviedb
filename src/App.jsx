import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ActorProfile from "./pages/ActorProfile";
import PopularTVShows from "./pages/PopularTVShows";
import TrendingMovies from "./pages/TrendingMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {" "}
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {" "}
          <Routes>
            <Route path="/" element={<ActorProfile />} />
            <Route path="/tv-shows" element={<PopularTVShows />} />
            <Route path="/TrendingMovies" element={<TrendingMovies />} />
            <Route path="/Upcoming" element={<UpcomingMovies />} />
          </Routes>
        </main>
        {/* Renderizamos el Footer al final */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
