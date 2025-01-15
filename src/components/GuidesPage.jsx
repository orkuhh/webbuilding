import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Temporary mock data
const MOCK_GUIDES = [
  {
    id: 1,
    title: "Beginner's Guide to The Division 2",
    author: "Agent_Smith",
    description: "Everything you need to know to get started in The Division 2. Covers basic mechanics, gear system, and early game progression.",
    likes: 342,
    views: 2156,
    tags: ["Beginner", "Tutorial", "Basics"],
    updatedAt: "2024-03-15T10:30:00Z",
    readTime: "15 min",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Advanced Combat Tactics",
    author: "Division_Elite",
    description: "Master advanced combat techniques, positioning, and skill usage to dominate in both PvE and PvP scenarios.",
    likes: 256,
    views: 1432,
    tags: ["Advanced", "Combat", "Tactics"],
    updatedAt: "2024-03-14T15:45:00Z",
    readTime: "12 min",
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Raid Mechanics Explained",
    author: "RaidMaster",
    description: "Detailed walkthrough of all raid mechanics, strategies, and required builds for successful completion.",
    likes: 189,
    views: 987,
    tags: ["Raid", "Endgame", "Team"],
    updatedAt: "2024-03-13T09:15:00Z",
    readTime: "20 min",
    difficulty: "Expert"
  }
];

const SORT_OPTIONS = {
  newest: { label: "Newest First", field: "updatedAt", order: "desc" },
  oldest: { label: "Oldest First", field: "updatedAt", order: "asc" },
  mostViewed: { label: "Most Viewed", field: "views", order: "desc" },
  mostLiked: { label: "Most Liked", field: "likes", order: "desc" }
};

const DIFFICULTY_FILTERS = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

export default function GuidesPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort guides
  const filteredGuides = MOCK_GUIDES.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "All" || guide.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Build Guides</h1>
        {isAuthenticated && (
          <Link to="/guides/create" className="btn-primary">
            Create Guide
          </Link>
        )}
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 card">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange min-w-[150px]"
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
            Filters
          </button>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="p-4 card space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_FILTERS.map(difficulty => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedDifficulty === difficulty
                      ? 'bg-division-orange text-black'
                      : 'bg-division-dark-lighter text-gray-300 hover:bg-division-dark-light'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guides Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredGuides.map(guide => (
          <Link key={guide.id} to={`/guides/${guide.id}`} className="card hover:bg-division-dark-lighter transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{guide.title}</h2>
                  <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>By {guide.author}</span>
                    <span>•</span>
                    <span>{guide.readTime} read</span>
                    <span>•</span>
                    <span>{new Date(guide.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{guide.views} views</span>
                    <span>•</span>
                    <span>{guide.likes} likes</span>
                  </div>
                  <div className="flex gap-2">
                    {guide.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-division-dark-lighter text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No guides found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 