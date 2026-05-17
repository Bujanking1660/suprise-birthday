import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { COLORS, CLEAN, FONTS } from '../theme';
import Confetti from '../components/Confetti';
import { playPop, playSparkle } from '../utils/sound';
import { Heart, Sparkles } from 'lucide-react-native';
import { PottedPlant, MinimalLeaves } from '../components/Illustrations';

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
  }
];

export default function QuizScreen({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    playPop();
    const isCorrect = index === QUIZ_QUESTIONS[currentQ].correctIndex;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      if (score + (isCorrect ? 1 : 0) === QUIZ_QUESTIONS.length) {
        playSparkle();
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

  return (
    <View style={styles.container}>
      {/* ─── Elegant Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Memories</Text>
        <View style={{ width: 44 }} />
      </View>

      {!showResult ? (
        <View style={styles.quizCard}>
          <Text style={styles.questionCounter}>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</Text>
          <Text style={styles.questionText}>{QUIZ_QUESTIONS[currentQ].question}</Text>

          <View style={styles.optionsContainer}>
            {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.optionBtn, { backgroundColor: [COLORS.secondary, COLORS.primary, COLORS.accent1, COLORS.rose][idx % 4] }]}
                activeOpacity={0.8}
                onPress={() => handleAnswer(idx)}
              >
                <Text style={styles.optionText}>{opt}</Text>
                <View style={styles.optionArrow}><Text style={styles.arrowText}>↗</Text></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          {score === QUIZ_QUESTIONS.length && <Confetti />}
          <View style={styles.resultCard}>
            <View style={{ marginBottom: 20 }}>
              {score === QUIZ_QUESTIONS.length ? (
                <Sparkles size={60} color={COLORS.rose} fill={COLORS.rose} />
              ) : (
                <Heart size={60} color={COLORS.rose} />
              )}
            </View>
            <Text style={styles.resultTitle}>
              {score === QUIZ_QUESTIONS.length ? 'Perfect Score!' : `You got ${score}/${QUIZ_QUESTIONS.length}`}
            </Text>
            <Text style={styles.resultDesc}>
              {score === QUIZ_QUESTIONS.length 
                ? "You know us perfectly! I love you so much. If you haven't yet, find the QR code on the toybox and scan it!" 
                : "Aww, almost! But I still love you with all my heart. Try again!"}
            </Text>

            <TouchableOpacity style={styles.retryBtn} onPress={() => { playPop(); (score === QUIZ_QUESTIONS.length ? onBack() : resetQuiz()); }}>
              <Text style={styles.retryBtnText}>
                {score === QUIZ_QUESTIONS.length ? 'Back to Dashboard' : 'Try Again'}
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
    ...FONTS.heading,
    color: COLORS.text,
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 16,
    ...FONTS.heading,
    color: COLORS.text,
  },
  quizCard: {
    backgroundColor: COLORS.white,
    borderRadius: 36,
    padding: 30,
    margin: 20,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  questionCounter: {
    fontSize: 13,
    ...FONTS.body,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 24,
    ...FONTS.heading,
    color: COLORS.text,
    marginBottom: 30,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
    ...FONTS.heading,
    color: COLORS.text,
    flex: 1,
  },
  optionArrow: {
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
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 36,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  resultTitle: {
    ...FONTS.heading,
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  resultDesc: {
    ...FONTS.body,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
  },
  retryBtn: {
    backgroundColor: COLORS.text,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  retryBtnText: {
    ...FONTS.heading,
    fontSize: 16,
    color: COLORS.white,
  },
});
