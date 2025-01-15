import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BuildCard from './BuildCard';

// Temporary mock data
const mockBuilds = [
  {
    id: 1,
    title: "DPS Negotiator's Dilemma",
    author: "Agent Smith",
    description: "High damage build focusing on critical hits and spreading damage across multiple targets using the Negotiator's Dilemma gear set.",
    likes: 245,
    views: 1820,
    tags: ["PvE", "DPS", "Gear Set"],
    primaryWeapon: "Police M4",
    gearScore: 900,
    updatedAt: "2024-03-15",
    difficulty: "Advanced",
    playstyle: "Aggressive"
  },
  {
    id: 2,
    title: "Tank True Patriot",
    author: "Division Veteran",
    description: "Survivability focused build using True Patriot to support the team and draw enemy attention.",
    likes: 189,
    views: 1240,
    tags: ["PvE", "Tank", "Support"],
    primaryWeapon: "ACS-12",
    gearScore: 895,
    updatedAt: "2024-03-14",
    difficulty: "Intermediate",
    playstyle: "Defensive"
  },
  // Add more mock builds as needed
];

const SORT_OPTIONS = {
  popular: { label: "Most Popular", fn: (a, b) => b.views - a.views },
  recent: { label: "Most Recent", fn: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) },
  likes: { label: "Most Liked", fn: (a, b) => b.likes - a.likes },
  gearScore: { label: "Gear Score", fn: (a, b) => b.gearScore - a.gearScore }
};

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const PLAYSTYLE_OPTIONS = ["Aggressive", "Defensive", "Support", "Balanced"];

export default function BuildsPage() {
  const [sortBy, setSortBy] = useState('popular');
  const [filterTag, setFilterTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPlaystyle, setSelectedPlaystyle] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique tags from all builds
  const allTags = useMemo(() => 
    Array.from(new Set(mockBuilds.flatMap(build => build.tags))),
    []
  );

  // Filter builds based on all criteria
  const filteredBuilds = useMemo(() => {
    return mockBuilds
      .filter(build => {
        const matchesSearch = searchQuery === '' || 
          build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          build.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = filterTag === 'all' || build.tags.includes(filterTag);
        
        const matchesDifficulty = selectedDifficulty === 'all' || 
          build.difficulty === selectedDifficulty;

        const matchesPlaystyle = selectedPlaystyle === 'all' || 
          build.playstyle === selectedPlaystyle;

        return matchesSearch && matchesTag && matchesDifficulty && matchesPlaystyle;
      })
      .sort(SORT_OPTIONS[sortBy].fn);
  }, [searchQuery, filterTag, selectedDifficulty, selectedPlaystyle, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Popular Builds</h1>
        <Link to="/create" className="btn-primary">
          Create Build
        </Link>
      </header>

      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 card">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search builds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input bg-division-dark-light min-w-[150px]"
          >
            {Object.entries(SORT_OPTIONS).map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          >
            Filters {filteredBuilds.length !== mockBuilds.length && `(${filteredBuilds.length})`}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-4 card space-y-4">
          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-division-gray-light">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn ${filterTag === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterTag('all')}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`btn ${filterTag === tag ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty and Playstyle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-division-gray-light">Difficulty</h3>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Difficulties</option>
                {DIFFICULTY_OPTIONS.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-division-gray-light">Playstyle</h3>
              <select
                value={selectedPlaystyle}
                onChange={(e) => setSelectedPlaystyle(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Playstyles</option>
                {PLAYSTYLE_OPTIONS.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Build Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilds.map(build => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBuilds.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-division-gray-light mb-2">
            No builds found
          </h3>
          <p className="text-division-gray">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
} 