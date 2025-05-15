import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Instagram, Twitter } from "lucide-react";
import {
  getPersonDetails,
  getPersonMovieCredits,
  getPersonExternalIds,
  getPersonTVCredits,
} from "../services/api";

const ActorProfile = () => {
  const [actor, setActor] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTVCredits] = useState([]);
  const [externalIds, setExternalIds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        setLoading(true);
        const [details, credits, socialIds, tvData] = await Promise.all([
          getPersonDetails(),
          getPersonMovieCredits(),
          getPersonExternalIds(),
          getPersonTVCredits(),
        ]);
        setActor(details);
        setMovieCredits(credits.cast);
        setTVCredits(tvData.cast);
        setExternalIds(socialIds);
      } catch (err) {
        setError("Error al cargar los datos del actor");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActorData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!actor) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Column - Photo and Social Media */}
            <div className="md:w-1/3">
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-auto"
                />
                {externalIds && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4">
                    <div className="flex justify-center space-x-4">
                      {externalIds.instagram_id && (
                        <a
                          href={`https://instagram.com/${externalIds.instagram_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-black"
                        >
                          <Instagram size={24} />
                        </a>
                      )}
                      {externalIds.twitter_id && (
                        <a
                          href={`https://twitter.com/${externalIds.twitter_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-400"
                        >
                          <Twitter size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Informacion Personal */}
              <div className="p-6 bg-gray-50">
                <h2 className="text-xl font-bold mb-4">Información personal</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-600 font-medium">Conocido por</h3>
                    <p>{actor.known_for_department}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">
                      Fecha de nacimiento
                    </h3>
                    <p>
                      {new Date(actor.birthday).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">
                      Lugar de nacimiento
                    </h3>
                    <p>{actor.place_of_birth}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">
                      También conocido como
                    </h3>
                    <ul className="list-none">
                      {actor.also_known_as?.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna de la izquierda - Contenido principal */}
            <div className="md:w-2/3 p-6">
              <h1 className="text-4xl font-bold mb-6">{actor.name}</h1>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Biografía</h2>
                <p className="text-gray-700 leading-relaxed">
                  {actor.biography || "No hay biografía disponible."}
                </p>
              </div>

              <Tabs
                selectedIndex={activeTab}
                onSelect={(index) => setActiveTab(index)}
              >
                <TabList className="flex border-b mb-6">
                  <Tab
                    className={`px-6 py-3 cursor-pointer ${
                      activeTab === 0
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-600"
                    }`}
                  >
                    Películas
                  </Tab>
                  <Tab
                    className={`px-6 py-3 cursor-pointer ${
                      activeTab === 1
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-600"
                    }`}
                  >
                    Series de TV
                  </Tab>
                </TabList>

                <TabPanel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movieCredits.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 truncate">
                            {movie.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {movie.character || "Papel no especificado"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(movie.release_date).getFullYear()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tvCredits.map((show) => (
                      <div
                        key={show.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                          alt={show.name}
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 truncate">
                            {show.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {show.character || "Papel no especificado"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(show.first_air_date).getFullYear()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorProfile;
