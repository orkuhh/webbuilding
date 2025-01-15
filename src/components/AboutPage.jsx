import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">About Division Builds</h1>
        <p className="text-division-gray-light text-lg">
          Your go-to platform for creating and sharing Division 2 builds
        </p>
      </header>

      {/* Mission Statement */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-division-gray-light">
          Division Builds was created by the community, for the community. Our mission is to provide Division 2 players 
          with powerful tools to create, share, and discover builds while fostering a helpful and engaging community.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-3">Build Creation</h3>
          <p className="text-division-gray-light mb-4">
            Create and customize your builds with our intuitive builder. Share your strategies with the community 
            and help others improve their game.
          </p>
          <Link to="/create" className="text-division-orange hover:text-division-orange/80 transition-colors">
            Try the Builder →
          </Link>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-3">Community Sharing</h3>
          <p className="text-division-gray-light mb-4">
            Browse builds created by other players, learn from their strategies, and adapt them to your playstyle.
          </p>
          <Link to="/builds" className="text-division-orange hover:text-division-orange/80 transition-colors">
            Explore Builds →
          </Link>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-3">Inventory Management</h3>
          <p className="text-division-gray-light mb-4">
            Keep track of your gear, weapons, and mods with our inventory system. Organize your items and plan your builds effectively.
          </p>
          <Link to="/inventory" className="text-division-orange hover:text-division-orange/80 transition-colors">
            Manage Inventory →
          </Link>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-3">Build Guides</h3>
          <p className="text-division-gray-light mb-4">
            Learn from detailed guides written by experienced players. Understand the mechanics and optimize your builds.
          </p>
          <Link to="/guides" className="text-division-orange hover:text-division-orange/80 transition-colors">
            Read Guides →
          </Link>
        </div>
      </div>

      {/* Community Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="text-division-gray-light mb-6">
          Division Builds is more than just a website - it's a community of passionate players helping each other succeed. 
          Join our Discord server to connect with other agents, get build advice, and stay updated on the latest game changes.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary flex items-center gap-2"
          >
            <span>Join Discord</span>
            <span>→</span>
          </a>
          <Link to="/contribute" className="btn-secondary">
            Contribute
          </Link>
        </div>
      </div>

      {/* Team Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Meet the Team</h2>
        <p className="text-division-gray-light mb-6">
          Division Builds is maintained by a dedicated team of Division 2 players who are passionate about helping 
          the community. We're always looking for contributors to help make the platform even better.
        </p>
        <Link to="/contact" className="text-division-orange hover:text-division-orange/80 transition-colors">
          Get in Touch →
        </Link>
      </div>
    </div>
  );
} 