import React from 'react';

function BuildEditor() {
  return (
    <div className="bg-division-dark p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-division mb-4">
        Create New Build
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gear Slots */}
        <div className="space-y-4">
          <h3 className="text-xl text-division-light">Gear</h3>
          {/* Gear slots will go here */}
        </div>

        {/* Weapons */}
        <div className="space-y-4">
          <h3 className="text-xl text-division-light">Weapons</h3>
          {/* Weapon slots will go here */}
        </div>
      </div>
    </div>
  );
}

export default BuildEditor;
