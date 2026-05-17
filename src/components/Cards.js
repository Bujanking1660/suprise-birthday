import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';

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
      <Text style={styles.quoteMarks}>"</Text>
      <Text style={styles.quoteText}>{text.replace(/"/g, '')}</Text>
      <Text style={[styles.quoteMarks, { alignSelf: 'flex-end', marginTop: -10 }]}>"</Text>
    </View>
  );
}

// ─── Gallery Note Card ───
export function NoteCard({ title, text, color }) {
  return (
    <View style={[styles.galleryCard, styles.noteCard, { backgroundColor: color }]}>
      <Text style={styles.noteTitle}>{title}</Text>
      <View style={styles.noteDivider} />
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
    padding: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 180,
  },
  statValue: {
    fontSize: 54,
    ...FONTS.heading,
    letterSpacing: -2,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 15,
    ...FONTS.body,
    opacity: 0.8,
  },

  // ─── Gallery Cards ───
  galleryCard: {
    ...CLEAN.card,
    marginBottom: 20,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  captionBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  captionText: {
    ...FONTS.body,
    fontSize: 14,
    color: COLORS.text,
  },

  // ─── Quote Card ───
  quoteCard: {
    padding: 30,
    alignItems: 'center',
  },
  quoteMarks: {
    fontSize: 50,
    fontFamily: 'Georgia',
    color: COLORS.rose,
    opacity: 0.3,
    lineHeight: 50,
    alignSelf: 'flex-start',
    marginBottom: -10,
  },
  quoteText: {
    fontSize: 18,
    ...FONTS.body,
    color: COLORS.text,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
    paddingHorizontal: 10,
  },

  // ─── Note Card ───
  noteCard: {
    padding: 24,
  },
  noteTitle: {
    fontSize: 20,
    ...FONTS.heading,
    marginBottom: 10,
  },
  noteDivider: {
    height: 2,
    backgroundColor: COLORS.white,
    opacity: 0.6,
    marginBottom: 14,
    width: 40,
    borderRadius: 2,
  },
  noteText: {
    fontSize: 15,
    ...FONTS.body,
    lineHeight: 24,
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
    fontSize: 17,
    ...FONTS.heading,
  },
  menuSublabel: {
    fontSize: 13,
    ...FONTS.small,
    marginTop: 4,
    opacity: 0.8,
  },
  menuArrow: {
    fontSize: 28,
    ...FONTS.heading,
    color: COLORS.text,
    opacity: 0.4,
  },
});
