import React from 'react';
import BuildCard from './BuildCard';

const MOCK_BUILDS = [
  {
    id: 1,
    title: "Ultimate DPS Build",
    author: "Agent_Smith",
    description: "High damage output build focused on critical hits and weapon damage. Perfect for legendary missions and raids.",
    likes: 234,
    views: 1205,
    tags: ["DPS", "Raid", "PvE"],
    primaryWeapon: "Police M4",
    skills: ["Assault Turret", "Striker Drone"],
    updatedAt: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Tank Support Build",
    author: "Division_Elite",
    description: "High armor build with focus on team support and survivability. Great for group play.",
    likes: 186,
    views: 892,
    tags: ["Tank", "Support", "Team"],
    primaryWeapon: "Scorpio",
    skills: ["Bulwark Shield", "Artificer Hive"],
    updatedAt: "2024-03-14T15:45:00Z"
  },
  {
    id: 3,
    title: "Skill Master Build",
    author: "TechWizard",
    description: "Maximum skill damage and cooldown reduction. Let your skills do all the work.",
    likes: 156,
    views: 743,
    tags: ["Skill", "PvE", "Solo"],
    primaryWeapon: "Capacitor",
    skills: ["Assault Turret", "Striker Drone"],
    updatedAt: "2024-03-13T09:15:00Z"
  }
];

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-division-orange mb-4">
          The Division 2 Build Creator
        </h1>
        <p className="text-division-light/80 text-lg mb-8">
          Create, save, and share your perfect Division 2 loadout
        </p>
        <div className="flex justify-center gap-4">
          <button 
            type="button"
            className="bg-division-orange text-black px-6 py-3 rounded font-medium hover:bg-division-orange/90 transition-colors"
          >
            Create New Build
          </button>
          <button 
            type="button"
            className="bg-black/50 text-division-light px-6 py-3 rounded font-medium hover:bg-black/70 transition-colors"
          >
            Browse All Builds
          </button>
        </div>
      </div>

      {/* Featured Builds */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-division-orange">Featured Builds</h2>
          <button 
            type="button"
            className="text-division-light/60 hover:text-division-orange transition-colors text-sm"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_BUILDS.map(build => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      </div>

      {/* Recent Builds */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-division-orange">Recent Builds</h2>
          <button 
            type="button"
            className="text-division-light/60 hover:text-division-orange transition-colors text-sm"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_BUILDS.map(build => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 