import React from 'react';
import { Link } from 'react-router-dom';

export default function ContributePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Contribute to Division Builds</h1>
        <p className="text-division-gray-light text-lg">
          Help us make Division Builds better for everyone
        </p>
      </header>

      {/* Introduction */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Why Contribute?</h2>
        <p className="text-division-gray-light mb-6">
          Division Builds is an open-source project built by the community, for the community. 
          By contributing, you help make the platform better for all Division 2 players and become 
          part of our growing community.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://github.com/divisionbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub
          </a>
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Ways to Contribute */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">Development</h3>
          <div className="space-y-4">
            <p className="text-division-gray-light">
              Help improve the platform by contributing code. We welcome contributions of all sizes, 
              from bug fixes to new features.
            </p>
            <ul className="list-disc list-inside text-division-gray-light space-y-2">
              <li>Fix bugs and issues</li>
              <li>Implement new features</li>
              <li>Improve performance</li>
              <li>Write tests</li>
              <li>Review pull requests</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">Content Creation</h3>
          <div className="space-y-4">
            <p className="text-division-gray-light">
              Share your knowledge with the community by creating high-quality content.
            </p>
            <ul className="list-disc list-inside text-division-gray-light space-y-2">
              <li>Write build guides</li>
              <li>Create video tutorials</li>
              <li>Share optimal builds</li>
              <li>Document game mechanics</li>
              <li>Translate content</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">Community Support</h3>
          <div className="space-y-4">
            <p className="text-division-gray-light">
              Help make our community welcoming and helpful for everyone.
            </p>
            <ul className="list-disc list-inside text-division-gray-light space-y-2">
              <li>Answer questions</li>
              <li>Moderate discussions</li>
              <li>Report bugs</li>
              <li>Suggest improvements</li>
              <li>Welcome new members</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">Data Management</h3>
          <div className="space-y-4">
            <p className="text-division-gray-light">
              Help maintain and improve our game data and build information.
            </p>
            <ul className="list-disc list-inside text-division-gray-light space-y-2">
              <li>Update item data</li>
              <li>Verify build information</li>
              <li>Tag and categorize builds</li>
              <li>Maintain spreadsheets</li>
              <li>Document changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">1. Join Our Community</h3>
            <p className="text-division-gray-light">
              Start by joining our Discord server to connect with other contributors and get help when needed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">2. Read the Guidelines</h3>
            <p className="text-division-gray-light">
              Familiarize yourself with our contribution guidelines and code of conduct on GitHub.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">3. Find an Issue</h3>
            <p className="text-division-gray-light">
              Look through our GitHub issues to find something you'd like to work on, or suggest new improvements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">4. Make Your First Contribution</h3>
            <p className="text-division-gray-light">
              Start small and work your way up. Even small contributions are valuable!
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-division-dark-lighter">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to Contribute?</h2>
          <p className="text-division-gray-light">
            Join our Discord server to get started and connect with other contributors.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://discord.gg/divisionbuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Our Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 