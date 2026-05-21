import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import { COLORS } from '../theme';
import Confetti from '../components/Confetti';
import TimeCapsuleModal from '../components/TimeCapsuleModal';
import { playPop } from '../utils/sound';
import { Lock, Mail, Camera, Flower2, Store, Home, ArrowRight } from 'lucide-react-native';

const BIRTHDAY_FORTUNES = [];
const WISH_JARS = [];

export default function DashboardScreen({
  isLocked,
  onScanQR,
  onOpenGallery,
  onOpenLetter,
  onOpenQuiz,
  onOpenShop,
  onToast,
}) {
  const [capsuleVisible, setCapsuleVisible] = useState(false);

  // Simple floating animation for the banner icon
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 1500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
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

  const handleFortune = () => {};
  const handleWishJar = () => {};

  return (
    <View style={styles.container}>
      <Confetti />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ─── Top Header (Profile) ─── */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarBorder}>
              <Image source={require('../../assets/maskot1.png')} style={styles.avatar} />
            </View>
            <View style={styles.profileText}>
              <Text style={styles.greetingText}>Happy Birthday,</Text>
              <Text style={styles.nameText}>Rasya! 🎂</Text>
            </View>
          </View>
        </View>

        {/* ─── Big Banner ─── */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Time Capsule Ready!</Text>
            <Text style={styles.bannerSub}>Save your memories and hopes for the next 20 years 🎁</Text>
            <TouchableOpacity style={styles.bannerBtn} onPress={() => { playPop(); setCapsuleVisible(true); }}>
              <Text style={styles.bannerBtnText}>Start Now</Text>
              <ArrowRight size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <Animated.Image 
            source={require('../../assets/maskot2.png')} 
            style={[styles.bannerIllustration, { transform: [{ translateY: floatAnim }] }]} 
            resizeMode="contain"
          />
        </View>

        {/* ─── Cards ─── */}
        <View style={styles.listContainer}>
          {/* Memory Quiz */}
          <View style={[styles.card, { backgroundColor: COLORS.accent1 }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Memory Quiz</Text>
            </View>
            <Image source={require('../../assets/maskot3.png')} style={styles.cardImage} resizeMode="contain" />
            <TouchableOpacity style={styles.cardActionBtn} onPress={() => { playPop(); onOpenQuiz(); }}>
              <Text style={styles.cardActionText}>Play Now</Text>
              <ArrowRight size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {/* Digital Bouquet */}
          <View style={[styles.card, { backgroundColor: COLORS.secondary }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Digital Bouquet</Text>
              <View style={styles.coinBadge}>
                <Flower2 size={14} color={COLORS.text} />
                <Text style={styles.coinBadgeText}>Flowers</Text>
              </View>
            </View>
            <Image source={require('../../assets/maskot4.png')} style={styles.cardImage} resizeMode="contain" />
            <TouchableOpacity style={styles.cardActionBtn} onPress={handleBouquet}>
              <Text style={styles.cardActionText}>Open Bouquet</Text>
              <ArrowRight size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {/* Secret Gallery */}
          <View style={[styles.card, { backgroundColor: COLORS.accent2 }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{isLocked ? 'Secret Gallery' : 'Your Gallery'}</Text>
              <View style={styles.coinBadge}>
                <Lock size={14} color={COLORS.text} />
                <Text style={styles.coinBadgeText}>{isLocked ? 'Locked' : 'Unlocked'}</Text>
              </View>
            </View>
            <Image source={require('../../assets/maskot1.png')} style={styles.cardImage} resizeMode="contain" />
            <TouchableOpacity style={styles.cardActionBtn} onPress={handleGallery}>
              <Text style={styles.cardActionText}>View Photos</Text>
              <ArrowRight size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {/* Love Letter */}
          <View style={[styles.card, { backgroundColor: COLORS.accent3 }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Special Letter</Text>
              <View style={styles.coinBadge}>
                <Mail size={14} color={COLORS.text} />
                <Text style={styles.coinBadgeText}>Read</Text>
              </View>
            </View>
            <Image source={require('../../assets/maskot2.png')} style={styles.cardImage} resizeMode="contain" />
            <TouchableOpacity style={styles.cardActionBtn} onPress={() => { playPop(); onOpenLetter(); }}>
              <Text style={styles.cardActionText}>Open Letter</Text>
              <ArrowRight size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ─── Bottom Navigation (Dana-style) ─── */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Home size={26} color={COLORS.primary} />
            <Text style={[styles.navLabel, { color: COLORS.primary }]}>Home</Text>
          </TouchableOpacity>

          {isLocked ? (
            <TouchableOpacity style={styles.qrBtnContainer} onPress={() => { playPop(); onScanQR(); }} activeOpacity={0.85}>
              <View style={styles.qrBtn}>
                <Camera size={28} color={COLORS.white} />
              </View>
              <Text style={[styles.navLabel, { marginTop: 6 }]}>Scan QR</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qrBtnPlaceholder} />
          )}

          <TouchableOpacity style={styles.navItem} onPress={() => { playPop(); onOpenShop(); }}>
            <Store size={26} color={COLORS.textSoft} />
            <Text style={styles.navLabel}>Toko</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TimeCapsuleModal 
        visible={capsuleVisible} 
        onClose={() => setCapsuleVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 2,
    backgroundColor: COLORS.white,
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSoft,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
  },

  // Banner
  bannerContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    overflow: 'hidden',
  },
  bannerTextContent: {
    flex: 1,
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 8,
  },
  bannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    marginBottom: 16,
    paddingRight: 20,
  },
  bannerBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  bannerBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginRight: 6,
  },
  bannerIllustration: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 140,
    height: 140,
    zIndex: 1,
  },

  // List Cards
  listContainer: {
    gap: 20,
  },
  card: {
    borderRadius: 32,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 220,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    maxWidth: '60%',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  coinBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 4,
  },
  cardImage: {
    position: 'absolute',
    right: -10,
    top: 40,
    width: 160,
    height: 160,
    zIndex: 1,
  },
  cardActionBtn: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginRight: 6,
  },

  // Bottom Nav Dana-Style
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 12,
    zIndex: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSoft,
    marginTop: 4,
  },
  qrBtnContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -30,
  },
  qrBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrBtnPlaceholder: {
    width: 70,
  },
});
