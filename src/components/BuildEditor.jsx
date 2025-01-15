import React from 'react';
import InventorySlot from './InventorySlot';

function BuildEditor() {
  const leftGearSlots = [
    { type: 'Mask', level: 17 },
    { type: 'Backpack', level: 32 },
    { type: 'Chest', level: 33 },
  ];

  const rightGearSlots = [
    { type: 'Gloves', level: 26 },
    { type: 'Holster', level: 28 },
    { type: 'Kneepads', level: 19 },
  ];

  const weaponSlots = [
    { type: 'Primary Weapon', level: 3, rarity: 'gear-set' },
    { type: 'Secondary Weapon', level: 3, rarity: 'gear-set' },
    { type: 'Sidearm', level: 1, rarity: 'high-end' },
  ];

  const skillSlots = [
    { type: 'Skill 1', level: 9 },
    { type: 'Skill 2', level: 8 },
  ];

  const SectionHeader = ({ title, counter }) => (
    <div className="flex items-center mb-3 pb-2 border-b border-division-orange/20">
      <h3 className="text-division-orange font-bold tracking-wide">{title}</h3>
      {counter && (
        <div className="ml-auto text-division-orange">
          <span className="font-bold">0</span>
          <span className="opacity-75">/0</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-black to-black/95 p-8 max-w-4xl mx-auto rounded-lg shadow-2xl">
      <div className="space-y-6">
        {/* Special Weapon Section */}
        <div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <InventorySlot 
                type="Special Weapon"
                level={1}
                rarity="exotic"
                isWeapon={true}
                className="w-48"
              />
            </div>
            <div className="text-division-orange">
              <span className="font-bold">0</span>
              <span className="opacity-75">/0</span>
            </div>
          </div>
        </div>

        {/* Weapons Section */}
        <div>
          <SectionHeader title="Weapons" counter={true} />
          <div className="flex gap-2">
            {weaponSlots.map((slot) => (
              <InventorySlot 
                key={slot.type} 
                type={slot.type} 
                level={slot.level}
                rarity={slot.rarity}
                isWeapon={true}
              />
            ))}
          </div>
        </div>

        {/* Gear Section */}
        <div>
          <SectionHeader title="Gear" />
          <div className="flex gap-8 justify-center">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
              {leftGearSlots.map((slot) => (
                <InventorySlot 
                  key={slot.type} 
                  type={slot.type}
                  level={slot.level}
                  rarity="gear-set"
                />
              ))}
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-2">
              {rightGearSlots.map((slot) => (
                <InventorySlot 
                  key={slot.type} 
                  type={slot.type}
                  level={slot.level}
                  rarity="gear-set"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <SectionHeader title="Skills" />
          <div className="flex gap-2 justify-center">
            {skillSlots.map((slot) => (
              <InventorySlot 
                key={slot.type} 
                type={slot.type}
                level={slot.level}
                rarity="high-end"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildEditor;
