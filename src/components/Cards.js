import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import { Quote, Sparkles } from 'lucide-react-native';

// ─── Stat Card ───
export function StatCard({ label, value, color }) {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Gallery Image Card ───
export function ImageCard({ source, caption, color }) {
  return (
    <View style={[styles.galleryCard, { backgroundColor: color || COLORS.white }]}>
      <Image source={source} style={styles.galleryImage} />
      <View style={styles.captionBar}>
        <Text style={styles.captionText}>{caption}</Text>
      </View>
    </View>
  );
}

// ─── Gallery Quote Card ───
export function QuoteCard({ text, color }) {
  return (
    <View style={[styles.galleryCard, styles.quoteCard, { backgroundColor: color }]}>
      <View style={styles.quoteIconBg}>
        <Quote size={20} color={COLORS.primary} />
      </View>
      <Text style={styles.quoteText}>{text.replace(/"/g, '')}</Text>
    </View>
  );
}

// ─── Gallery Note Card ───
export function NoteCard({ title, text, color }) {
  return (
    <View style={[styles.galleryCard, styles.noteCard, { backgroundColor: color }]}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{title}</Text>
        <Sparkles size={20} color={COLORS.text} opacity={0.6} />
      </View>
      <Text style={styles.noteText}>{text}</Text>
    </View>
  );
}

// ─── Menu Button ───
export function MenuButton({ icon, label, sublabel, onPress, color }) {
  return (
    <View style={[styles.menuBtn, { backgroundColor: color }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={styles.menuIconContainer}>
          {icon}
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.menuLabel}>{label}</Text>
          {sublabel && <Text style={styles.menuSublabel}>{sublabel}</Text>}
        </View>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // ─── Stat Card ───
  statCard: {
    flex: 1,
    ...CLEAN.card,
    padding: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 160,
  },
  statValue: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -2,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSoft,
  },

  // ─── Gallery Cards ───
  galleryCard: {
    ...CLEAN.card,
    marginBottom: 20,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  captionBar: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  captionText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 22,
  },

  // ─── Quote Card ───
  quoteCard: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  quoteText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
  },

  // ─── Note Card ───
  noteCard: {
    padding: 28,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(45, 43, 85, 0.1)',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  noteText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 24,
    opacity: 0.9,
  },

  // ─── Menu Button ───
  menuBtn: {
    ...CLEAN.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  menuSublabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSoft,
    marginTop: 4,
  },
  menuArrow: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textSoft,
  },
});
