import fs from 'node:fs';
import path from 'node:path';
import {
  fetchWeaponsData,
  fetchWeaponModsData,
  fetchGearData,
  fetchGearSetsData,
  fetchBrandSetsData,
  fetchTalentsData,
  fetchAttributesData
} from './sheetsApi.js';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper function to save data to JSON file
const saveToJson = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Saved ${filename}`);
};

// Main scraping function
export const scrapeAllData = async () => {
  try {
    console.log('Starting data scrape...');

    // Fetch all data in parallel
    const [
      weapons,
      weaponMods,
      gear,
      gearSets,
      brandSets,
      talents,
      attributes
    ] = await Promise.all([
      fetchWeaponsData(),
      fetchWeaponModsData(),
      fetchGearData(),
      fetchGearSetsData(),
      fetchBrandSetsData(),
      fetchTalentsData(),
      fetchAttributesData()
    ]);

    // Save each dataset to a separate JSON file
    saveToJson('weapons.json', weapons);
    saveToJson('weaponMods.json', weaponMods);
    saveToJson('gear.json', gear);
    saveToJson('gearSets.json', gearSets);
    saveToJson('brandSets.json', brandSets);
    saveToJson('talents.json', talents);
    saveToJson('attributes.json', attributes);

    // Save a timestamp of when the data was last updated
    saveToJson('lastUpdate.json', { timestamp: new Date().toISOString() });

    console.log('Data scrape completed successfully!');
    return true;
  } catch (error) {
    console.error('Error scraping data:', error);
    return false;
  }
}; 