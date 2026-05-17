import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import { GALLERY_DATA } from '../data';
import { ImageCard, QuoteCard, NoteCard } from '../components/Cards';
import { playPop } from '../utils/sound';
import { Heart } from 'lucide-react-native';

export default function GalleryScreen({ onBack }) {
  const renderItem = (item) => {
    switch (item.type) {
      case 'image':
        return <ImageCard key={item.id} source={item.source} caption={item.caption} color={COLORS.white} />;
      case 'quote':
        return <QuoteCard key={item.id} text={item.text} color={COLORS.bg} />;
      case 'note':
        return <NoteCard key={item.id} title={item.title} text={item.text} color={COLORS.secondary} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* ─── Elegant Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gallery</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* ─── Soft Banner ─── */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>✨ Unlocked Memories</Text>
      </View>

      {/* ─── Gallery Content ─── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {GALLERY_DATA.map(renderItem)}

        {/* ─── Elegant Footer ─── */}
        <View style={[styles.footerCard, { backgroundColor: COLORS.white }]}>
          <Heart size={48} color={COLORS.rose} fill={COLORS.rose} style={{ marginBottom: 12 }} />
          <Text style={styles.footerText}>Happy Birthday, Rasya</Text>
          <Text style={styles.footerSub}>With all my love</Text>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.bg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backBtnText: {
    fontSize: 28,
    ...FONTS.heading,
    color: COLORS.text,
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 20,
    ...FONTS.heading,
    color: COLORS.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  banner: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    ...FONTS.heading,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  footerCard: {
    ...CLEAN.card,
    padding: 36,
    alignItems: 'center',
    marginTop: 10,
  },
  footerEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 22,
    ...FONTS.heading,
    color: COLORS.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
  },
  footerSub: {
    fontSize: 14,
    ...FONTS.body,
    fontStyle: 'italic',
    opacity: 0.8,
  },
});
