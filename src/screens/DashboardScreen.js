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
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import { STATS } from '../data';
import { StatCard, MenuButton } from '../components/Cards';
import Confetti from '../components/Confetti';
import { playPop } from '../utils/sound';
import { Drumstick, Heart, Lock, Image as ImageIcon, Mail, MessageCircle, Gift, Camera } from 'lucide-react-native';
import { PottedPlant, SparklesArt } from '../components/Illustrations';

export default function DashboardScreen({ 
  isLocked, 
  onScanQR, 
  onOpenGallery, 
  onOpenLetter,
  onOpenQuiz,
  onToast 
}) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Elegant slow float for FAB
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Gentle fade in for header
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
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
      {/* Show confetti only if unlocked as a surprise, or you can just show it on load. Let's show it on load to celebrate! */}
      <Confetti />
      
        {/* ─── Elegant Header ─── */}
        <View style={styles.header}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.headerTitle}>Special Day</Text>
            <Text style={styles.headerName}>Hallo, Sayang</Text>
            <Text style={styles.headerSub}>Happy Birthday!</Text>
            <View style={styles.reflectionBox}>
              <Text style={styles.reflectionText}>It's your birthday...</Text>
              <Text style={styles.reflectionIcon}>↗</Text>
            </View>
          </Animated.View>
        </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Suprises For You</Text>
        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={[styles.gridBtn, { backgroundColor: COLORS.secondary }]} 
            activeOpacity={0.8} 
            onPress={handleGallery}
          >
            <Text style={styles.gridBtnTitle}>
              {isLocked ? 'Secret Gallery' : 'Your Gallery'}
            </Text>
            <View style={styles.gridBtnIconRow}>
              {isLocked ? <Lock size={20} color={COLORS.text} /> : <ImageIcon size={20} color={COLORS.text} />}
              <View style={styles.smallArrow}><Text style={styles.arrowText}>↗</Text></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridBtn, { backgroundColor: COLORS.primary }]} 
            activeOpacity={0.8} 
            onPress={() => { playPop(); onOpenLetter(); }}
          >
            <Text style={styles.gridBtnTitle}>A Special Letter</Text>
            <View style={styles.plantContainer}>
              <PottedPlant size={70} color={COLORS.text} />
            </View>
            <View style={[styles.smallArrow, { position: 'absolute', bottom: 16, right: 16 }]}><Text style={styles.arrowText}>↗</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={[styles.gridBtn, { backgroundColor: COLORS.accent1 }]} 
            activeOpacity={0.8} 
            onPress={() => { playPop(); onOpenQuiz(); }}
          >
            <Text style={styles.gridBtnTitle}>Our Memories Quiz</Text>
            <View style={styles.plantContainer}>
              <SparklesArt size={60} color={COLORS.olive} />
            </View>
            <View style={[styles.smallArrow, { position: 'absolute', bottom: 16, right: 16 }]}><Text style={styles.arrowText}>↗</Text></View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridBtn, { backgroundColor: COLORS.bg }]} 
            activeOpacity={0.8} 
            onPress={handleBouquet}
          >
            <Text style={styles.gridBtnTitle}>Digital Bouquet</Text>
            <View style={styles.smallArrow}><Text style={styles.arrowText}>↗</Text></View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>My Feelings To You</Text>
        <View style={styles.statsRow}>
          <StatCard
            label="Love Level"
            value={STATS.loveLevel}
            color={COLORS.white}
          />
        </View>

        {/* ─── Soft Message Card ─── */}
        {isLocked && (
          <View style={[styles.msgCard, { backgroundColor: COLORS.white }]}>
            <View style={styles.msgIconBg}>
              <Gift size={32} color={COLORS.text} />
            </View>
            <Text style={styles.msgTitle}>A Special Surprise</Text>
            <Text style={styles.msgText}>
              Find the QR Code gift and scan it to reveal your hidden memories.
            </Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ─── Floating Scan QR Button ─── */}
      <Animated.View
        style={[
          styles.fabContainer,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <TouchableOpacity
          style={styles.fab}
          onPress={() => { playPop(); onScanQR(); }}
          activeOpacity={0.85}
        >
          <Camera size={20} color={COLORS.white} />
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
  // ─── Header ───
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 14,
    ...FONTS.body,
    color: '#888',
    marginBottom: 4,
  },
  headerName: {
    fontSize: 32,
    ...FONTS.heading,
    color: COLORS.text,
  },
  headerSub: {
    fontSize: 28,
    ...FONTS.heading,
    color: COLORS.text,
    lineHeight: 36,
  },
  reflectionBox: {
    backgroundColor: 'rgba(28,28,28,0.04)',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reflectionText: {
    fontSize: 15,
    ...FONTS.body,
    color: '#888',
  },
  reflectionIcon: {
    fontSize: 18,
    color: COLORS.text,
  },
  // ─── Scroll ───
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  // ─── Section ───
  sectionTitle: {
    fontSize: 15,
    ...FONTS.body,
    color: '#888',
    marginBottom: 16,
    marginTop: 24,
  },
  // ─── Grid ───
  gridRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  gridBtn: {
    flex: 1,
    height: 180,
    borderRadius: 36,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  gridBtnTitle: {
    fontSize: 15,
    ...FONTS.heading,
    marginBottom: 8,
    zIndex: 2,
  },
  gridBtnIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  smallArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(28,28,28,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: COLORS.text,
  },
  plantContainer: {
    position: 'absolute',
    bottom: -10,
    left: 20,
    zIndex: 1,
  },
  // ─── Stats ───
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  // ─── Message Card ───
  msgCard: {
    ...CLEAN.card,
    padding: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  msgIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  msgTitle: {
    fontSize: 20,
    ...FONTS.heading,
    marginBottom: 10,
  },
  msgText: {
    fontSize: 15,
    ...FONTS.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  // ─── Bottom Nav FAB ───
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  fab: {
    backgroundColor: COLORS.text,
    width: 80,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
});
