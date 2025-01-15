import React from 'react';

const InventorySlot = ({ 
  type, 
  rarity = 'high-end', 
  isEmpty = true, 
  level = 0,
  isWeapon = false,
  className = ''
}) => {
  const rarityColors = {
    'high-end': 'border-division-orange',
    'gear-set': 'border-[#800080]',
    'exotic': 'border-division-red',
    'named': 'border-division-orange',
  };

  const rarityGlows = {
    'high-end': 'shadow-[0_0_10px_rgba(255,107,24,0.3)]',
    'gear-set': 'shadow-[0_0_10px_rgba(128,0,128,0.3)]',
    'exotic': 'shadow-[0_0_10px_rgba(227,30,36,0.3)]',
    'named': 'shadow-[0_0_10px_rgba(255,107,24,0.3)]',
  };

  return (
    <div className={`space-y-1 ${className} group`}>
      <div 
        className={`
          relative w-32 h-16 
          border-l-4 ${rarityColors[rarity]} 
          bg-gradient-to-br from-black/95 to-black/80
          cursor-pointer 
          transition-all duration-200
          flex items-center justify-center
          ${type === 'Special Weapon' ? 'w-full' : ''}
          backdrop-blur-sm
          hover:scale-[1.02]
          hover:${rarityGlows[rarity]}
          before:absolute before:inset-0 
          before:bg-gradient-to-r before:from-transparent 
          before:to-white/5 before:opacity-0
          hover:before:opacity-100 before:transition-opacity
        `}
      >
        {/* Level indicator */}
        {level > 0 && (
          <div className="absolute top-1 left-1 flex items-center">
            <div className="text-xs font-bold bg-black/60 px-1.5 py-0.5 rounded">
              <span className="text-division-orange">{level}</span>
            </div>
          </div>
        )}
        
        {isEmpty ? (
          <div className="text-division-light/50 text-sm text-center font-medium">
            {type}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-900/50" />
        )}

        {/* Rarity indicator dot */}
        <div className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full ${rarityColors[rarity].replace('border-', 'bg-')}`} />
      </div>

      {/* Attribute bars for weapons */}
      {isWeapon && (
        <div className="flex gap-0.5 px-0.5">
          <div className="h-0.5 bg-gradient-to-r from-division-orange/80 to-division-orange flex-1 rounded-full" />
          <div className="h-0.5 bg-gradient-to-r from-division-orange/80 to-division-orange flex-1 rounded-full" />
          {type !== 'Sidearm' && (
            <div className="h-0.5 bg-gradient-to-r from-division-orange/80 to-division-orange flex-1 rounded-full" />
          )}
        </div>
      )}
    </div>
  );
};

export default InventorySlot; 