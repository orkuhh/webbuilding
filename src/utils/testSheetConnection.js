import { fetchGearData, fetchWeaponsData } from './sheetsApi';

export const testConnection = async () => {
  try {
    console.log('Testing Google Sheets connection...');
    
    // Try to fetch gear data
    const gearData = await fetchGearData();
    console.log('Successfully fetched gear data:', gearData.length, 'items');
    console.log('Sample gear item:', gearData[0]);

    // Try to fetch weapons data
    const weaponsData = await fetchWeaponsData();
    console.log('Successfully fetched weapons data:', weaponsData.length, 'items');
    console.log('Sample weapon:', weaponsData[0]);

    return true;
  } catch (error) {
    console.error('Error testing Google Sheets connection:', error);
    return false;
  }
}; 