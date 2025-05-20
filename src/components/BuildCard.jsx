import React from 'react';
import { Link } from 'react-router-dom';

export default function BuildCard({ build }) {
  const {
    _id, // Changed from id
    title,
    creatorUsername, // Changed from author
    description,
    likesCount = 0, // Changed from likes
    // views are not directly available unless calculated or stored
    // tags would come from build.build_data or a dedicated field if implemented
    // primaryWeapon and gearScore would also come from build.build_data
    _creationTime, // Changed from updatedAt
    game, // Added game field
    userHasLiked, // From the enhanced build object
  } = build;

  // Attempt to get some info from build_data if it exists
  const primaryWeaponDisplay = build.build_data?.weapons?.primaryWeapon?.name || build.build_data?.primaryWeapon || 'N/A';
  const gearScoreDisplay = build.build_data?.gearScore || 'N/A';
  const tagsDisplay = build.build_data?.tags || [];


  return (
    <Link to={`/builds/${_id}`} className="block">
      <article className="card group h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-division-orange transition-colors">
              {title}
            </h3>
            <p className="text-division-gray-light text-sm">by {creatorUsername}</p>
            <p className="text-xs text-division-gray-light mt-1">Game: {game}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-division-gray">
            {/* Views can be added later if tracked */}
            {/* <span className="flex items-center gap-1"><span>👁️</span> {views}</span> */}
            <span className={`flex items-center gap-1 ${userHasLiked ? 'text-division-orange' : ''}`}>
              <span>{userHasLiked ? '❤️' : '🤍'}</span> {likesCount}
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-division-gray-light line-clamp-2">{description || "No description provided."}</p>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-division-gray">Primary:</span>
              <span className="text-white truncate">{primaryWeaponDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-division-gray">GS:</span>
              <span className="text-division-yellow font-semibold">{gearScoreDisplay}</span>
            </div>
          </div>

          {tagsDisplay.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tagsDisplay.slice(0, 3).map((tag, index) => ( // Show max 3 tags
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-division-dark text-division-gray-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-division-gray-dark text-xs text-division-gray">
          Created {new Date(_creationTime).toLocaleDateString()}
        </div>
      </article>
    </Link>
  );
}