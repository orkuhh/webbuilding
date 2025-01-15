import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

// Temporary mock data (will be replaced with context/API data later)
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
    secondaryWeapon: "Baker's Dozen",
    sidearm: "D50",
    gearScore: 900,
    updatedAt: "2024-03-15",
    difficulty: "Advanced",
    playstyle: "Aggressive",
    specialization: "Gunner",
    gear: {
      mask: { name: "Negotiator's Dilemma Mask", attributes: ["Weapon Damage", "Critical Hit Chance"], mod: "Critical Hit Damage" },
      backpack: { name: "Negotiator's Dilemma Pack", attributes: ["Weapon Damage", "Critical Hit Damage"], mod: "Critical Hit Chance", talent: "Critical Measures" },
      chest: { name: "Negotiator's Dilemma Vest", attributes: ["Weapon Damage", "Critical Hit Chance"], mod: "Critical Hit Damage", talent: "Mark and Execute" },
      gloves: { name: "Negotiator's Dilemma Gloves", attributes: ["Weapon Damage", "Critical Hit Chance"] },
      holster: { name: "Negotiator's Dilemma Holster", attributes: ["Weapon Damage", "Critical Hit Damage"] },
      kneepads: { name: "Negotiator's Dilemma Kneepads", attributes: ["Weapon Damage", "Critical Hit Chance"] }
    },
    skills: {
      skill1: { name: "Reviver Hive", mods: ["Range", "Charges"] },
      skill2: { name: "Crusader Shield", mods: ["Health", "Damage"] }
    },
    stats: {
      weaponDamage: "130.4%",
      criticalHitChance: "60%",
      criticalHitDamage: "172%",
      headShotDamage: "85%",
      weaponHandling: "30%",
      reloadSpeed: "25%"
    }
  }
  // Add more mock builds as needed
];

export default function BuildDetailsPage() {
  const { id } = useParams();
  
  const build = useMemo(() => 
    mockBuilds.find(b => b.id === Number.parseInt(id, 10)),
    [id]
  );

  if (!build) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-division-gray-light mb-4">Build Not Found</h2>
        <p className="text-division-gray mb-6">The build you're looking for doesn't exist or has been removed.</p>
        <Link to="/builds" className="btn-primary">
          Back to Builds
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <Link to="/builds" className="text-division-gray-light hover:text-division-orange transition-colors mb-2 inline-block">
            ← Back to Builds
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{build.title}</h1>
          <div className="flex items-center gap-4 text-division-gray-light">
            <span>by {build.author}</span>
            <span>•</span>
            <span>Updated {new Date(build.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="btn-secondary flex items-center gap-2">
            <span>❤️</span> {build.likes}
          </button>
          <button type="button" className="btn-primary">
            Save Build
          </button>
        </div>
      </div>

      {/* Build Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <p className="text-division-gray-light">{build.description}</p>
          </div>

          {/* Stats Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Build Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(build.stats).map(([key, value]) => (
                <div key={key} className="p-3 bg-division-dark-lighter rounded-lg">
                  <div className="text-division-gray-light text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-white font-bold text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gear Setup */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Gear Setup</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(build.gear).map(([slot, item]) => (
                <div key={slot} className="p-4 bg-division-dark-lighter rounded-lg">
                  <div className="text-division-orange font-semibold capitalize mb-2">
                    {slot}
                  </div>
                  <div className="text-white mb-2">{item.name}</div>
                  <div className="space-y-1">
                    {item.attributes.map((attr) => (
                      <div key={`${slot}-${attr}`} className="text-division-gray-light text-sm">
                        • {attr}
                      </div>
                    ))}
                    {item.mod && (
                      <div className="text-division-gray-light text-sm">
                        • Mod: {item.mod}
                      </div>
                    )}
                    {item.talent && (
                      <div className="text-division-yellow text-sm">
                        ★ {item.talent}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Build Overview Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="text-division-gray-light mb-1">Difficulty</div>
                <div className="text-white font-semibold">{build.difficulty}</div>
              </div>
              <div>
                <div className="text-division-gray-light mb-1">Playstyle</div>
                <div className="text-white font-semibold">{build.playstyle}</div>
              </div>
              <div>
                <div className="text-division-gray-light mb-1">Specialization</div>
                <div className="text-white font-semibold">{build.specialization}</div>
              </div>
              <div>
                <div className="text-division-gray-light mb-1">Gear Score</div>
                <div className="text-division-yellow font-semibold">{build.gearScore}</div>
              </div>
            </div>
          </div>

          {/* Weapons Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Weapons</h2>
            <div className="space-y-4">
              <div>
                <div className="text-division-gray-light mb-1">Primary</div>
                <div className="text-white font-semibold">{build.primaryWeapon}</div>
              </div>
              <div>
                <div className="text-division-gray-light mb-1">Secondary</div>
                <div className="text-white font-semibold">{build.secondaryWeapon}</div>
              </div>
              <div>
                <div className="text-division-gray-light mb-1">Sidearm</div>
                <div className="text-white font-semibold">{build.sidearm}</div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
            <div className="space-y-4">
              {Object.entries(build.skills).map(([slot, skill]) => (
                <div key={slot}>
                  <div className="text-division-gray-light mb-1">
                    {slot === 'skill1' ? 'Skill 1' : 'Skill 2'}
                  </div>
                  <div className="text-white font-semibold mb-1">{skill.name}</div>
                  <div className="text-sm text-division-gray-light">
                    Mods: {skill.mods.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {build.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-division-dark-lighter text-division-gray-light text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 