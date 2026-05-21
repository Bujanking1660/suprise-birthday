import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import Confetti from '../components/Confetti';
import { playPop, playSparkle } from '../utils/sound';
import { addCoins, getQuizCompleted, setQuizCompleted } from '../utils/storage';
import { Heart, Sparkles, ChevronLeft } from 'lucide-react-native';

const QUIZ_QUESTIONS = [
  {
    question: "Where did we first meet?",
    options: ["At a coffee shop", "Ayam Penyet Place", "University", "Online"],
    correctIndex: 3,
  },
  {
    question: "What is my absolute favorite thing about you?",
    options: ["Your smile", "Your eyes", "Your cute laugh", "Everything"],
    correctIndex: 3,
  },
  {
    question: "What's the secret word I placed on the toybox?",
    options: ["RASYA_CUTE", "I Love You", "FOREVER_YOURS", "HBD_RASYA"],
    correctIndex: 1,
  },
];

// Option colors mapping to pastel purple theme
const OPTION_COLORS = [
  COLORS.purple1,
  COLORS.pink,
  COLORS.mint,
  COLORS.yellow,
];

export default function QuizScreen({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useEffect(() => {
    checkCompleted();
  }, []);

  const checkCompleted = async () => {
    const isCompleted = await getQuizCompleted();
    setAlreadyCompleted(isCompleted);
  };

  const handleAnswer = async (index) => {
    playPop();
    const isCorrect = index === QUIZ_QUESTIONS[currentQ].correctIndex;
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore(newScore);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      if (newScore === QUIZ_QUESTIONS.length) {
        playSparkle();
        if (!alreadyCompleted) {
          await addCoins(100);
          await setQuizCompleted();
          setAlreadyCompleted(true);
        }
      }
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    playPop();
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  const progress = ((currentQ) / QUIZ_QUESTIONS.length) * 100;

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <ChevronLeft size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Memories 💜</Text>
        <View style={{ width: 44 }} />
      </View>

      {!showResult ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ─── Illustration ─── */}
          <View style={styles.illustrationRow}>
            <Image
              source={require('../../assets/maskot2.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* ─── Progress Bar ─── */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressLabel}>
              {currentQ + 1} / {QUIZ_QUESTIONS.length}
            </Text>
          </View>

          {/* ─── Question Card ─── */}
          <View style={styles.questionCard}>
            <View style={styles.qNumBadge}>
              <Text style={styles.qNumText}>Q{currentQ + 1}</Text>
            </View>
            <Text style={styles.questionText}>
              {QUIZ_QUESTIONS[currentQ].question}
            </Text>
          </View>

          {/* ─── Options ─── */}
          <View style={styles.optionsContainer}>
            {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.optionBtn, { backgroundColor: OPTION_COLORS[idx % 4] }]}
                activeOpacity={0.8}
                onPress={() => handleAnswer(idx)}
              >
                <View style={[styles.optionIndex, { backgroundColor: COLORS.white }]}>
                  <Text style={styles.optionIndexText}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </Text>
                </View>
                <Text style={styles.optionText}>{opt}</Text>
                <View style={styles.optionArrow}>
                  <Text style={styles.optionArrowText}>↗</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.resultContainer}>
          {score === QUIZ_QUESTIONS.length && <Confetti />}
          <Image
            source={require('../../assets/maskot2.png')}
            style={styles.resultIllustration}
            resizeMode="contain"
          />
          <View style={styles.resultCard}>
            <View style={styles.resultIconBg}>
              {score === QUIZ_QUESTIONS.length ? (
                <Sparkles size={36} color={COLORS.primary} fill={COLORS.primary} />
              ) : (
                <Heart size={36} color={COLORS.primary} fill={COLORS.primary} />
              )}
            </View>
            <Text style={styles.resultTitle}>
              {score === QUIZ_QUESTIONS.length ? 'Perfect Score! 🎉' : `You got ${score}/${QUIZ_QUESTIONS.length} 💜`}
            </Text>
            <Text style={styles.resultDesc}>
              {score === QUIZ_QUESTIONS.length
                ? "You know us perfectly! I love you so much. If you haven't yet, find the QR code on the toybox and scan it! (+100 Love Coins)"
                : "Aww, almost! But I still love you with all my heart. Try again!"}
            </Text>

            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => { playPop(); score === QUIZ_QUESTIONS.length ? onBack() : resetQuiz(); }}
            >
              <Text style={styles.retryBtnText}>
                {score === QUIZ_QUESTIONS.length ? 'Back to Dashboard' : 'Try Again 💜'}
              </Text>
            </TouchableOpacity>
          </View>
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
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: '#000',
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // ─── Illustration ───
  illustrationRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  illustration: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  // ─── Progress ───
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.purple2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    width: 40,
    textAlign: 'right',
  },

  // ─── Question Card ───
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  qNumBadge: {
    backgroundColor: COLORS.purple1,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  qNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  // ─── Options ───
  optionsContainer: {
    gap: 12,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 12,
  },
  optionIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIndexText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  optionArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionArrowText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '700',
  },

  // ─── Result ───
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultIllustration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  resultIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.purple1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  resultDesc: {
    fontSize: 15,
    color: COLORS.textSoft,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
    fontWeight: '400',
  },
  retryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 36,
    borderRadius: 50,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  retryBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
});
