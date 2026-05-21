import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { COLORS, FONTS } from '../theme';
import Confetti from '../components/Confetti';
import { playPop, playSparkle } from '../utils/sound';
import { addCoins, setCandlesBlown } from '../utils/storage';

export default function CandleScreen({ onComplete }) {
  const [candles, setCandles] = useState([true, true, true]); // true means lit
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Gently pulse the cake
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.02, duration: 1500, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const blowCandle = (index) => {
    if (!candles[index]) return;
    
    playPop();
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // Check if all are blown out
    if (newCandles.every(c => !c)) {
      handleAllBlown();
    }
  };

  const handleAllBlown = async () => {
    setIsFinished(true);
    playSparkle();
    setShowConfetti(true);
    
    // Save to local storage
    await setCandlesBlown();
    await addCoins(50); // Reward +50 coins

    setTimeout(() => {
      // Fade out screen
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      }).start(() => {
        onComplete();
      });
    }, 2500);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {showConfetti && <Confetti />}
      
      <View style={styles.content}>
        <Text style={styles.title}>
          {isFinished ? "Yayyy! Happy Birthday! 🎉" : "Tiup lilinnya dong sayang... 🎂"}
        </Text>
        
        <Text style={styles.subtitle}>
          {isFinished ? "+50 Love Coins earned!" : "Tap the candles to blow them out"}
        </Text>

        <Animated.View style={[styles.cakeContainer, { transform: [{ scale: scaleAnim }] }]}>
          {/* We use a placeholder cake shape here, or you can replace with an actual cake SVG/Image */}
          <View style={styles.cakeBase}>
            <View style={styles.cakeTop}>
              <View style={styles.candlesContainer}>
                {candles.map((isLit, index) => (
                  <TouchableOpacity 
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => blowCandle(index)}
                    style={styles.candleWrapper}
                  >
                    {isLit && <View style={styles.flame} />}
                    <View style={styles.candleBody} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E26', // Dark aesthetic background
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 60,
  },
  cakeContainer: {
    width: 200,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cakeBase: {
    width: 200,
    height: 80,
    backgroundColor: COLORS.pink,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cakeTop: {
    width: 180,
    height: 30,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    top: 0,
  },
  candlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 160,
    position: 'absolute',
    bottom: 30,
    left: 10,
  },
  candleWrapper: {
    alignItems: 'center',
    height: 80,
    width: 30,
    justifyContent: 'flex-end',
  },
  candleBody: {
    width: 12,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  flame: {
    width: 16,
    height: 24,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    marginBottom: 4,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  }
});
