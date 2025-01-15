import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

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

          {/* Auth Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-division-light/80 hover:text-division-orange transition-colors"
                >
                  <span>{user?.user_metadata?.username || 'User'}</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-division-dark-lighter ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        to={`/profile/${user?.user_metadata?.username}`}
                        className="block px-4 py-2 text-sm text-division-light hover:bg-division-dark hover:text-division-orange"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/profile/edit"
                        className="block px-4 py-2 text-sm text-division-light hover:bg-division-dark hover:text-division-orange"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-division-light hover:bg-division-dark hover:text-division-orange"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-division-light/80 hover:text-division-orange"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/builds"
              className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Builds
            </Link>
            <Link 
              to="/inventory"
              className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inventory
            </Link>
            <Link 
              to="/guides"
              className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Guides
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={`/profile/${user?.user_metadata?.username}`}
                  className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/profile/edit"
                  className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="border-t border-division-orange/10 pt-2 mt-2">
                <Link 
                  to="/login"
                  className="block px-3 py-2 text-division-light/80 hover:text-division-orange transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="block px-3 py-2 text-division-orange hover:text-division-orange/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 