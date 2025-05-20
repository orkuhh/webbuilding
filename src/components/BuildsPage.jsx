import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import BuildCard from './BuildCard'; // Assuming BuildCard is adapted for Convex data

// Define available games (can be fetched or static)
const GAMES_OPTIONS = ["The Division 2", "The Division"]; // Example games

// Sort options for Convex query
const SORT_OPTIONS_CONVEX = {
  creationTimeDesc: { label: "Most Recent", field: "_creationTime", order: "desc" },
  // likesCountDesc: { label: "Most Liked", field: "likesCount", order: "desc" }, // Requires likesCount on build doc or a different query approach
  titleAsc: { label: "Title (A-Z)", field: "title", order: "asc" },
  titleDesc: { label: "Title (Z-A)", field: "title", order: "desc" },
  // Add more as needed, e.g., by game
};


export default function BuildsPage() {
  const [currentSort, setCurrentSort] = useState('creationTimeDesc');
  const [selectedGame, setSelectedGame] = useState('all'); // 'all' or a specific game title
  const [searchQuery, setSearchQuery] = useState(''); // For client-side filtering for now
  const [showFilters, setShowFilters] = useState(false);

  // Construct filters for the Convex query
  const queryFilters = useMemo(() => {
    const filters = {};
    if (selectedGame !== 'all') {
      filters.game = selectedGame;
    }
    // user_id filter can be added if needed, e.g., for "My Builds" page
    return filters;
  }, [selectedGame]);
  
  const sortParams = useMemo(() => ({
    sortField: SORT_OPTIONS_CONVEX[currentSort].field,
    sortOrder: SORT_OPTIONS_CONVEX[currentSort].order,
  }), [currentSort]);

  // Fetch builds using useQuery
  const allBuilds = useQuery(api.builds.getAll, { 
    filters: queryFilters,
    sortField: sortParams.sortField,
    sortOrder: sortParams.sortOrder,
  });

  // Client-side search filtering (can be moved server-side for larger datasets)
  const filteredBuilds = useMemo(() => {
    if (!allBuilds) return [];
    if (searchQuery === '') return allBuilds;
    return allBuilds.filter(build =>
      build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (build.description && build.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      build.creatorUsername.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allBuilds, searchQuery]);
  
  // Placeholder for tags, difficulty, playstyle - these would need to be stored in build_data or as separate fields
  // const allTags = useMemo(() => Array.from(new Set(allBuilds?.flatMap(build => build.tags || []) || [])), [allBuilds]);
  // const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"]; // Example
  // const PLAYSTYLE_OPTIONS = ["Aggressive", "Defensive", "Support", "Balanced"]; // Example


  if (allBuilds === undefined) {
    return <div className="text-center py-12">Loading builds...</div>; // Or a spinner component
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Community Builds</h1>
        <Link to="/builds/create" className="btn-primary"> {/* Updated Link */}
          Create Build
        </Link>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 p-4 card">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title, description, creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={currentSort}
            onChange={(e) => setCurrentSort(e.target.value)}
            className="input bg-division-dark-light min-w-[150px]"
          >
            {Object.entries(SORT_OPTIONS_CONVEX).map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          >
            Filters 
            {/* Display active filter count if any */}
            {(selectedGame !== 'all') && `(1)`} 
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-division-gray-light">Game</h3>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Games</option>
                {GAMES_OPTIONS.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>
            {/* Add more filters here for tags, difficulty, playstyle if implemented in schema/query */}
            {/* Example for tags (if build.tags is an array of strings)
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-division-gray-light">Tags</h3>
              ...
            </div>
            */}
          </div>
        </div>
      )}

      {filteredBuilds.length === 0 && !searchQuery && allBuilds?.length > 0 && (
         <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-division-gray-light mb-2">
            No builds match your current filter.
          </h3>
          <p className="text-division-gray">
            Try selecting a different game or clearing filters.
          </p>
        </div>
      )}
      
      {filteredBuilds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuilds.map(build => (
            <BuildCard key={build._id} build={build} /> // Use build._id for Convex
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-division-gray-light mb-2">
            No builds found.
          </h3>
          <p className="text-division-gray">
            {searchQuery ? "Try a different search query." : "Why not create the first one?"}
          </p>
        </div>
      )}
    </div>
  );
}