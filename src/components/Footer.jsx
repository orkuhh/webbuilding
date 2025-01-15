import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/95 border-t border-division-orange/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-division-orange rounded flex items-center justify-center">
                <span className="text-black font-bold">D2</span>
              </div>
              <span className="text-division-orange font-bold text-lg">
                Division Builds
              </span>
            </div>
            <p className="text-division-light/60 text-sm">
              Create and share your Division 2 builds with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-division-orange font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/builds" className="text-division-light/60 hover:text-division-orange text-sm transition-colors">
                  Popular Builds
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-division-light/60 hover:text-division-orange text-sm transition-colors">
                  Build Guides
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-division-light/60 hover:text-division-orange text-sm transition-colors">
                  Inventory Manager
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-division-orange font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.ubisoft.com/en-us/game/the-division/2/news-updates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-division-light/60 hover:text-division-orange text-sm transition-colors"
                >
                  Patch Notes
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ubisoft.com/en-us/game/the-division/2/game-updates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-division-light/60 hover:text-division-orange text-sm transition-colors"
                >
                  Game Updates
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/divisionbuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-division-light/60 hover:text-division-orange text-sm transition-colors"
                >
                  Community Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-division-orange font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-division-light/60 hover:text-division-orange text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-division-light/60 hover:text-division-orange text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-division-light/60 hover:text-division-orange text-sm transition-colors">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-division-orange/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-division-light/40 text-sm">
              © 2024 Division Builds. Not affiliated with Ubisoft.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-division-light/40 hover:text-division-orange text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-division-light/40 hover:text-division-orange text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 