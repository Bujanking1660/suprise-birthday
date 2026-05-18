import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import { STATS } from '../data';
import Confetti from '../components/Confetti';
import { playPop } from '../utils/sound';
import { Lock, Image as ImageIcon, Mail, Gift, Camera, BookOpen, Flower2, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen({
  isLocked,
  onScanQR,
  onOpenGallery,
  onOpenLetter,
  onOpenQuiz,
  onToast,
}) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Float the icon illustration
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade + scale in for header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGallery = () => {
    playPop();
    if (isLocked) {
      onToast();
    } else {
      onOpenGallery();
    }
  };

  const handleBouquet = () => {
    playPop();
    Linking.openURL('https://digibouquet.vercel.app/');
  };

  return (
    <View style={styles.container}>
      <Confetti />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Hero Header Card ─── */}
        <Animated.View style={[styles.heroCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          {/* Decorative circles */}
          <View style={styles.heroBubble1} />
          <View style={styles.heroBubble2} />

          <View style={styles.heroTextBlock}>
            <Text style={styles.heroLabel}>✨ Special Day</Text>
            <Text style={styles.heroTitle}>Happy{'\n'}Birthday!</Text>
            <Text style={styles.heroSub}>Hallo, Sayang 🎂</Text>
          </View>

          {/* Floating Illustration */}
          <Animated.View style={[styles.heroIllustration, { transform: [{ translateY: floatAnim }] }]}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>

        {/* ─── It's your birthday banner ─── */}
        <View style={styles.bannerPill}>
          <Text style={styles.bannerText}>🎉 It's your birthday... ↗</Text>
        </View>

        {/* ─── Surprises Section ─── */}
        <Text style={styles.sectionTitle}>Surprises For You 🎁</Text>

        {/* Top Row */}
        <View style={styles.gridRow}>
          {/* Secret Gallery */}
          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: COLORS.purple1 }]}
            activeOpacity={0.85}
            onPress={handleGallery}
          >
            <View style={[styles.gridIconBg, { backgroundColor: COLORS.primary }]}>
              {isLocked
                ? <Lock size={22} color={COLORS.white} />
                : <ImageIcon size={22} color={COLORS.white} />}
            </View>
            <Text style={styles.gridCardTitle}>
              {isLocked ? 'Secret\nGallery' : 'Your\nGallery'}
            </Text>
            <View style={styles.gridArrow}>
              <Text style={styles.gridArrowText}>↗</Text>
            </View>
          </TouchableOpacity>

          {/* Special Letter */}
          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: COLORS.pink }]}
            activeOpacity={0.85}
            onPress={() => { playPop(); onOpenLetter(); }}
          >
            <View style={[styles.gridIconBg, { backgroundColor: '#EC4899' }]}>
              <Mail size={22} color={COLORS.white} />
            </View>
            <Text style={styles.gridCardTitle}>A Special{'\n'}Letter</Text>
            <View style={styles.gridArrow}>
              <Text style={styles.gridArrowText}>↗</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Row */}
        <View style={styles.gridRow}>
          {/* Quiz */}
          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: COLORS.mint }]}
            activeOpacity={0.85}
            onPress={() => { playPop(); onOpenQuiz(); }}
          >
            <View style={[styles.gridIconBg, { backgroundColor: '#10B981' }]}>
              <BookOpen size={22} color={COLORS.white} />
            </View>
            <Text style={styles.gridCardTitle}>Our{'\n'}Memories</Text>
            <View style={styles.gridArrow}>
              <Text style={styles.gridArrowText}>↗</Text>
            </View>
          </TouchableOpacity>

          {/* Digital Bouquet */}
          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: COLORS.yellow }]}
            activeOpacity={0.85}
            onPress={handleBouquet}
          >
            <View style={[styles.gridIconBg, { backgroundColor: '#F59E0B' }]}>
              <Flower2 size={22} color={COLORS.white} />
            </View>
            <Text style={styles.gridCardTitle}>Digital{'\n'}Bouquet</Text>
            <View style={styles.gridArrow}>
              <Text style={styles.gridArrowText}>↗</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ─── My Feelings Section ─── */}
        <Text style={styles.sectionTitle}>My Feelings To You 💜</Text>
        <View style={[styles.feelingCard]}>
          <View style={styles.feelingLeft}>
            <Star size={28} color={COLORS.primary} fill={COLORS.primary} />
            <Text style={styles.feelingLabel}>Love Level</Text>
          </View>
          <Text style={styles.feelingValue}>{STATS.loveLevel}</Text>
        </View>

        {/* ─── Locked Hint Card ─── */}
        {isLocked && (
          <View style={styles.hintCard}>
            <View style={styles.hintIconBg}>
              <Gift size={28} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.hintTitle}>A Special Surprise 🎀</Text>
              <Text style={styles.hintText}>
                Find the QR Code gift and scan it to reveal your hidden memories.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ─── Floating Scan QR Button ─── */}
      <Animated.View
        style={[styles.fabContainer, { transform: [{ translateY: floatAnim }] }]}
      >
        <TouchableOpacity
          style={styles.fab}
          onPress={() => { playPop(); onScanQR(); }}
          activeOpacity={0.85}
        >
          <Camera size={22} color={COLORS.white} />
          <Text style={styles.fabLabel}>Scan QR</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 58 : 36,
    paddingBottom: 30,
  },

  // ─── Hero Card ───
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 28,
    paddingBottom: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 180,
  },
  heroBubble1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -40,
    right: -30,
  },
  heroBubble2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -10,
    left: 10,
  },
  heroTextBlock: {
    flex: 1,
    zIndex: 2,
  },
  heroLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.88)',
  },
  heroIllustration: {
    width: 110,
    height: 110,
    zIndex: 2,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // ─── Banner Pill ───
  bannerPill: {
    backgroundColor: COLORS.purple2,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  // ─── Sections ───
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
    letterSpacing: -0.2,
  },

  // ─── Grid Cards ───
  gridRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  gridCard: {
    flex: 1,
    borderRadius: 24,
    padding: 18,
    minHeight: 150,
    justifyContent: 'space-between',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  gridIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 20,
    flex: 1,
    marginTop: 4,
  },
  gridArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  gridArrowText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  // ─── Feeling Card ───
  feelingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  feelingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  feelingLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 12,
  },
  feelingValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1,
  },

  // ─── Hint Card ───
  hintCard: {
    backgroundColor: COLORS.purple1,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 10,
  },
  hintIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  hintText: {
    fontSize: 13,
    color: COLORS.textSoft,
    lineHeight: 19,
    fontWeight: '400',
  },

  // ─── FAB ───
  fabContainer: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
  },
  fab: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  fabLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 4,
  },
});
