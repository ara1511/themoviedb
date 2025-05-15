import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
      <p>© {new Date().getFullYear()} The Moviee DB - All rights reserved</p>
      <div className="flex justify-center space-x-4 mt-2">
        {/* Enlace a Facebook */}
        <a
          href="https://www.facebook.com/themoviedb/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-500" />
        </a>
        <a
          href="https://www.instagram.com/tmdbmovies/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="w-6 h-6 cursor-pointer hover:text-pink-500" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
