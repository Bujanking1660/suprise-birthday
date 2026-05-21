import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS } from '../theme';
import { playSparkle, playPop } from '../utils/sound';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react-native';
import Confetti from '../components/Confetti';

const { width } = Dimensions.get('window');

export default function IntroScreen({ onEnter, isMuted, onToggleMusic }) {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true })
    ]).start();

    // Floating mascot
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -15, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleToggle = () => {
    playPop();
    if (onToggleMusic) onToggleMusic();
  };

  const handleEnter = () => {
    playSparkle();
    onEnter();
  };

  return (
    <View style={styles.container}>
      <Confetti />
      
      {/* Top Bar for Music Toggle */}
      <View style={styles.header}>
        <View />
        <TouchableOpacity style={styles.musicBtn} onPress={handleToggle} activeOpacity={0.8}>
          {isMuted ? (
            <VolumeX size={24} color={COLORS.textSoft} />
          ) : (
            <Volume2 size={24} color={COLORS.text} />
          )}
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        {/* Banner Style Card matching Dashboard */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Selamat Ulang Tahun!</Text>
            <Text style={styles.bannerSub}>Untuk Rasya yang paling cantik 🌸 Semoga hari ini jadi hari terbaik kamu! ✨</Text>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>20 Mei 2025</Text>
            </View>
          </View>
          <Animated.Image 
            source={require('../../assets/maskot2.png')} 
            style={[styles.bannerIllustration, { transform: [{ translateY: floatAnim }] }]} 
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={handleEnter} activeOpacity={0.85}>
          <Text style={styles.startBtnText}>Buka Kejutan</Text>
          <ArrowRight size={20} color={COLORS.white} />
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    zIndex: 10,
  },
  musicBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  
  // Banner (Matched to Dashboard)
  bannerContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    minHeight: 240,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  bannerTextContent: {
    flex: 1,
    zIndex: 2,
    paddingRight: 80,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 12,
    lineHeight: 38,
  },
  bannerSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 22,
  },
  dateBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  dateBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  bannerIllustration: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 150,
    height: 150,
    zIndex: 1,
  },

  // Start Button
  startBtn: {
    backgroundColor: COLORS.text,
    paddingVertical: 18,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    marginRight: 8,
  }
});
