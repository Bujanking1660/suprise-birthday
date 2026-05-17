import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import DashboardScreen from './src/screens/DashboardScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import QRScannerScreen from './src/screens/QRScanner';
import LoveLetterScreen from './src/screens/LoveLetterScreen';
import QuizScreen from './src/screens/QuizScreen';
import { COLORS, CLEAN, FONTS } from './src/theme';
import { initSounds } from './src/utils/sound';

const SCREENS = {
  DASHBOARD: 'dashboard',
  GALLERY: 'gallery',
  SCANNER: 'scanner',
  LOVE_LETTER: 'love_letter',
  QUIZ: 'quiz',
};

// ─── Toast Component ───
function Toast({ visible, message }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -20,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

// ─── Main App ───
export default function App() {
  const [screen, setScreen] = useState(SCREENS.DASHBOARD);
  const [isLocked, setIsLocked] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    initSounds();

    let soundObject = null;
    const playBackgroundMusic = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/music/df_wahyumusicproduction-suara-hati-480282.mp3'),
          { shouldPlay: true, isLooping: true, volume: 0.5 }
        );
        soundObject = sound;
      } catch (error) {
        console.log('Error playing background music:', error);
      }
    };

    playBackgroundMusic();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const showToast = () => {
    setToastKey((k) => k + 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setScreen(SCREENS.DASHBOARD);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {screen === SCREENS.DASHBOARD && (
        <DashboardScreen
          isLocked={isLocked}
          onScanQR={() => setScreen(SCREENS.SCANNER)}
          onOpenGallery={() => setScreen(SCREENS.GALLERY)}
          onOpenLetter={() => setScreen(SCREENS.LOVE_LETTER)}
          onOpenQuiz={() => setScreen(SCREENS.QUIZ)}
          onToast={showToast}
        />
      )}

      {screen === SCREENS.GALLERY && (
        <GalleryScreen onBack={() => setScreen(SCREENS.DASHBOARD)} />
      )}

      {screen === SCREENS.SCANNER && (
        <QRScannerScreen
          onUnlock={handleUnlock}
          onClose={() => setScreen(SCREENS.DASHBOARD)}
        />
      )}

      {screen === SCREENS.LOVE_LETTER && (
        <LoveLetterScreen onBack={() => setScreen(SCREENS.DASHBOARD)} />
      )}

      {screen === SCREENS.QUIZ && (
        <QuizScreen onBack={() => setScreen(SCREENS.DASHBOARD)} />
      )}

      {/* Toast Overlay */}
      <Toast
        key={toastKey}
        visible={toastVisible}
        message="🔒 Gallery is locked! Please scan your QR code first."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  toast: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 65 : 45,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 999,
  },
  toastText: {
    color: COLORS.text,
    ...FONTS.body,
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
