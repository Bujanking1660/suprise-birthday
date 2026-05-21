import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  COINS: 'rasya_coins',
  CANDLES_BLOWN: 'rasya_candles_blown',
  RESOLUTION: 'rasya_resolution',
  UNLOCKED_WALLPAPERS: 'rasya_unlocked_wallpapers',
  QUIZ_100: 'rasya_quiz_100',
};

// --- Coins ---
export const getCoins = async () => {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.COINS);
    return val !== null ? parseInt(val, 10) : 0;
  } catch (e) {
    return 0;
  }
};

export const addCoins = async (amount) => {
  try {
    const current = await getCoins();
    const newAmount = current + amount;
    await AsyncStorage.setItem(STORAGE_KEYS.COINS, newAmount.toString());
    return newAmount;
  } catch (e) {
    return 0;
  }
};

export const spendCoins = async (amount) => {
  try {
    const current = await getCoins();
    if (current >= amount) {
      const newAmount = current - amount;
      await AsyncStorage.setItem(STORAGE_KEYS.COINS, newAmount.toString());
      return { success: true, newAmount };
    }
    return { success: false, newAmount: current };
  } catch (e) {
    return { success: false, newAmount: 0 };
  }
};

// --- Candle Status ---
export const getCandlesBlown = async () => {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.CANDLES_BLOWN);
    return val === 'true';
  } catch (e) {
    return false;
  }
};

export const setCandlesBlown = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CANDLES_BLOWN, 'true');
  } catch (e) {}
};

// --- Resolution Time Capsule ---
export const getResolution = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.RESOLUTION);
  } catch (e) {
    return null;
  }
};

export const saveResolution = async (text) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.RESOLUTION, text);
    return true;
  } catch (e) {
    return false;
  }
};

// --- Wallpapers ---
export const getUnlockedWallpapers = async () => {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_WALLPAPERS);
    return val ? JSON.parse(val) : [];
  } catch (e) {
    return [];
  }
};

export const unlockWallpaper = async (id) => {
  try {
    const current = await getUnlockedWallpapers();
    if (!current.includes(id)) {
      const updated = [...current, id];
      await AsyncStorage.setItem(STORAGE_KEYS.UNLOCKED_WALLPAPERS, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (e) {
    return [];
  }
};

// --- Quiz Status ---
export const getQuizCompleted = async () => {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.QUIZ_100);
    return val === 'true';
  } catch (e) {
    return false;
  }
};

export const setQuizCompleted = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.QUIZ_100, 'true');
  } catch (e) {}
};
