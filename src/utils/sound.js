import { Audio } from 'expo-av';

let popSound = null;
let sparkleSound = null;

export async function initSounds() {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function playPop() {
  try {
    if (!popSound) {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/pop.mp3'));
      popSound = sound;
    }
    await popSound.setPositionAsync(0);
    await popSound.playAsync();
  } catch (error) {
    console.warn('Error playing pop sound', error);
  }
}

export async function playSparkle() {
  try {
    if (!sparkleSound) {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/sparkle.mp3'));
      sparkleSound = sound;
    }
    await sparkleSound.setPositionAsync(0);
    await sparkleSound.playAsync();
  } catch (error) {
    console.warn('Error playing sparkle sound', error);
  }
}
