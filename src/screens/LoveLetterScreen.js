import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import Confetti from '../components/Confetti';
import { playSparkle, playPop } from '../utils/sound';
import { Heart, ChevronLeft } from 'lucide-react-native';

export default function LoveLetterScreen({ onBack }) {
  const [opened, setOpened] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!opened) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
    }
  }, [opened]);

  const handleOpen = () => {
    playSparkle();
    setOpened(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <ChevronLeft size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>A Letter For You 💌</Text>
        <View style={{ width: 44 }} />
      </View>

      {!opened ? (
        <View style={styles.centerContent}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.topIllustration}
            resizeMode="contain"
          />
          <Text style={styles.hintText}>Tap the envelope to open your letter</Text>

          <TouchableOpacity activeOpacity={0.9} onPress={handleOpen}>
            <Animated.View style={[styles.envelope, { transform: [{ scale: pulseAnim }] }]}>
              {/* Envelope flap decoration */}
              <View style={styles.envelopeFlap} />
              {/* Wax seal */}
              <View style={styles.waxSealCircle}>
                <Heart size={24} color={COLORS.white} fill={COLORS.white} />
              </View>
              <Text style={styles.envelopeText}>To: Rasya 💜</Text>
              <Text style={styles.envelopeSubText}>From: Your Boyfriend</Text>
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.tapHintPill}>
            <Text style={styles.tapHintText}>✨ Tap to open</Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Confetti />
          <Animated.View
            style={[
              styles.letterContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.letterScroll}
            >
              {/* Icon top in letter */}
              <View style={styles.letterIllustrationTop}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={styles.letterIconSmall}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.greeting}>My Dearest Rasya,</Text>

              <Text style={styles.paragraph}>
                Happy Birth sayangku, cintaku, tadaaaa aku buat gift buat kamu, aku pengen ngasih sesuatu yang simple tapi effort, walau gak ratusan ribu, jutaan, sampe miliaran tapi aku buat ini pake niat dan sayang hehe.
              </Text>

              <Text style={styles.paragraph}>
                Aku kepikiran aja buat ngasih ini ke kamu, ide nya sih yang agak pusing, aku udah pernah buat gini gitu, tapi kok kurang bagus ya, makanya aku coba buat yang ini.
              </Text>

              <Text style={styles.paragraph}>
                Semoga kamu suka ya sayang, aku sayang kamu rasya, ohh iyaa sayang, di buat buket onlen nanti kamu bakal dipindahin ke website, gratis kok, caranya kamu pilih beberapa bunga, terus kamu next/continue aja terus, kalo ada yang suruh bayar coba kamu scroll lagi ke bawah, jangan lupa kirim/share ya hasilnya ke aku hehe.
              </Text>

              <Text style={styles.paragraph}>
                Ohh iyaa, terima kasih yaudah nemenin aku selama ini, aku beruntung punya kamu. Selamat ulang tahun! hehe
              </Text>

              <View style={styles.signatureContainer}>
                <View style={[styles.signatureHeartRow]}>
                  <Heart size={18} color={COLORS.primary} fill={COLORS.primary} />
                  <Heart size={14} color={COLORS.secondary} fill={COLORS.secondary} style={{ marginLeft: 4 }} />
                </View>
                <Text style={styles.signatureText}>With all my love,</Text>
                <Text style={styles.signatureName}>Yours Boyfriend ❤️</Text>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 58 : 36,
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  // ─── Closed Envelope ───
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  topIllustration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  hintText: {
    fontSize: 15,
    color: COLORS.textSoft,
    marginBottom: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  envelope: {
    width: 300,
    height: 200,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  envelopeFlap: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 150,
    borderRightWidth: 150,
    borderTopWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.purple2,
  },
  waxSealCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  envelopeText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    zIndex: 2,
    marginBottom: 4,
  },
  envelopeSubText: {
    fontSize: 13,
    color: COLORS.textSoft,
    zIndex: 2,
    fontWeight: '500',
  },
  tapHintPill: {
    marginTop: 24,
    backgroundColor: COLORS.purple1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tapHintText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // ─── Open Letter ───
  letterContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: COLORS.white,
    borderRadius: 32,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  letterScroll: {
    padding: 28,
  },
  letterIllustrationTop: {
    alignItems: 'center',
    marginBottom: 20,
  },
  letterIconSmall: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  paragraph: {
    fontSize: 15,
    color: COLORS.textSoft,
    lineHeight: 26,
    marginBottom: 18,
    fontWeight: '400',
  },
  signatureContainer: {
    marginTop: 24,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.border,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  signatureHeartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  signatureText: {
    fontSize: 14,
    color: COLORS.textSoft,
    fontStyle: 'italic',
    fontWeight: '400',
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
