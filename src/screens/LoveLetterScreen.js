import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import Confetti from '../components/Confetti';
import { playSparkle, playPop } from '../utils/sound';
import { Heart } from 'lucide-react-native';
import { MinimalLeaves } from '../components/Illustrations';

export default function LoveLetterScreen({ onBack }) {
  const [opened, setOpened] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for the unopened envelope
  useEffect(() => {
    if (!opened) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.stopAnimation();
    }
  }, [opened]);

  const handleOpen = () => {
    playSparkle();
    setOpened(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* ─── Elegant Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>A Letter For You</Text>
      </View>

      {!opened ? (
        <View style={styles.centerContent}>
          <Text style={styles.hintText}>Tap the envelope to open your letter</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={handleOpen}>
            <Animated.View style={[styles.envelope, { transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.envelopeFlap} />
              <Heart size={40} color={COLORS.rose} fill={COLORS.rose} style={styles.waxSeal} />
              <Text style={styles.envelopeText}>To: Rasya</Text>
              
              <View style={styles.illustrationContainer}>
                <MinimalLeaves size={100} color={COLORS.text} />
              </View>
            </Animated.View>
          </TouchableOpacity>
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
                <Text style={styles.signatureText}>With all my love,</Text>
                <Text style={styles.signatureName}>Yours Boyfriend ❤️</Text>
              </View>
              <View style={styles.illustrationBottom}>
                <MinimalLeaves size={80} color={COLORS.olive} />
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 60 : 40,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    zIndex: 10,
  },
  backBtnText: {
    fontSize: 28,
    color: COLORS.text,
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 16,
    ...FONTS.heading,
    color: COLORS.text,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hintText: {
    ...FONTS.body,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 40,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  envelope: {
    width: 320,
    height: 220,
    backgroundColor: COLORS.white,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  envelopeFlap: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 160,
    borderRightWidth: 160,
    borderTopWidth: 110,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.secondary,
    opacity: 0.3,
  },
  waxSeal: {
    marginBottom: 16,
    zIndex: 2,
  },
  envelopeText: {
    fontSize: 20,
    ...FONTS.heading,
    color: COLORS.text,
    zIndex: 2,
  },
  illustrationContainer: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.5,
    zIndex: 1,
  },
  letterContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  letterScroll: {
    padding: 30,
  },
  greeting: {
    fontSize: 28,
    ...FONTS.heading,
    color: COLORS.text,
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    ...FONTS.body,
    lineHeight: 28,
    marginBottom: 20,
  },
  signatureContainer: {
    marginTop: 30,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 20,
  },
  signatureText: {
    fontSize: 16,
    ...FONTS.body,
    fontStyle: 'italic',
  },
  signatureName: {
    fontSize: 20,
    ...FONTS.heading,
    marginTop: 4,
    color: COLORS.rose,
  },
  illustrationBottom: {
    alignItems: 'center',
    marginTop: 20,
    opacity: 0.6,
  },
});
