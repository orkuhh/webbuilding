import React from 'react';
import { Link } from 'react-router-dom';

export default function BuildCard({ build }) {
  const {
    title,
    author,
    description,
    likes = 0,
    views = 0,
    tags = [],
    primaryWeapon,
    gearScore,
    updatedAt
  } = build;

  return (
    <Link to={`/builds/${build.id}`} className="block">
      <article className="card group h-full flex flex-col">
        {/* Header with title and stats */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-division-orange transition-colors">
              {title}
            </h3>
            <p className="text-division-gray-light text-sm">by {author}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-division-gray">
            <span className="flex items-center gap-1">
              <span>👁️</span> {views}
            </span>
            <span className="flex items-center gap-1">
              <span>❤️</span> {likes}
            </span>
          </div>
        </div>

        {/* Build info */}
        <div className="flex-1 space-y-4">
          <p className="text-division-gray-light line-clamp-2">{description}</p>
          
          {/* Weapon and gear score */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-division-gray">Primary:</span>
              <span className="text-white">{primaryWeapon}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-division-gray">GS:</span>
              <span className="text-division-yellow font-semibold">{gearScore}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-division-dark text-division-gray-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-division-gray-dark text-xs text-division-gray">
          Last updated {new Date(updatedAt).toLocaleDateString()}
        </div>
      </article>
    </Link>
  );
} 