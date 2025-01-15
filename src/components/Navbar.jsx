import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black/95 border-b border-division-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-division-orange rounded flex items-center justify-center">
                <span className="text-black font-bold">D2</span>
              </div>
              <span className="text-division-orange font-bold text-lg">
                Division Builds
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/builds" className="text-division-light/80 hover:text-division-orange transition-colors">
              Builds
            </Link>
            <Link to="/inventory" className="text-division-light/80 hover:text-division-orange transition-colors">
              Inventory
            </Link>
            <Link to="/guides" className="text-division-light/80 hover:text-division-orange transition-colors">
              Guides
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-division-light/80 hover:text-division-orange transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link 
              to="/register"
              className="bg-division-orange text-black px-4 py-2 rounded font-medium hover:bg-division-orange/90 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-division-light/80 hover:text-division-orange"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/builds"
            className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
          >
            Builds
          </Link>
          <Link 
            to="/inventory"
            className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
          >
            Inventory
          </Link>
          <Link 
            to="/guides"
            className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
          >
            Guides
          </Link>
          <div className="border-t border-division-orange/10 pt-2 mt-2">
            <Link 
              to="/login"
              className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register"
              className="block px-3 py-2 text-division-orange hover:text-division-orange/80 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 