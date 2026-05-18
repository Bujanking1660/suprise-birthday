import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import { GALLERY_DATA } from '../data';
import { ImageCard, QuoteCard, NoteCard } from '../components/Cards';
import { playPop } from '../utils/sound';
import { Heart, ChevronLeft } from 'lucide-react-native';

export default function GalleryScreen({ onBack }) {
  const renderItem = (item) => {
    switch (item.type) {
      case 'image':
        return <ImageCard key={item.id} source={item.source} caption={item.caption} color={COLORS.white} />;
      case 'quote':
        return <QuoteCard key={item.id} text={item.text} color={COLORS.purple1} />;
      case 'note':
        return <NoteCard key={item.id} title={item.title} text={item.text} color={COLORS.pink} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <ChevronLeft size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gallery 📸</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* ─── Unlocked Banner ─── */}
      <View style={styles.banner}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.bannerIcon}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.bannerTitle}>✨ Unlocked Memories</Text>
          <Text style={styles.bannerSub}>Photos & moments just for you</Text>
        </View>
      </View>

      {/* ─── Gallery Content ─── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {GALLERY_DATA.map(renderItem)}

        {/* ─── Footer Card ─── */}
        <View style={styles.footerCard}>
          <View style={styles.footerIconBg}>
            <Heart size={32} color={COLORS.white} fill={COLORS.white} />
          </View>
          <Text style={styles.footerText}>Happy Birthday, Rasya 🎂</Text>
          <Text style={styles.footerSub}>With all my love ❤️</Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
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
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 58 : 36,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  // ─── Banner ───
  banner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  bannerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 2,
  },
  bannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // ─── Footer ───
  footerCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    padding: 36,
    alignItems: 'center',
    marginTop: 10,
  },
  footerIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  footerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
});
