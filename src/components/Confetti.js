import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CONFETTI_COLORS = ['#F4B8C8', '#F9E4D4', '#D8E2DC', '#FCD5CE', '#E0C56E', '#FFFFFF'];
const CONFETTI_COUNT = 40;

function ConfettiPiece({ index }) {
  const fallAnim = useRef(new Animated.Value(-50)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(0)).current;

  // Randomize initial properties
  const size = Math.random() * 8 + 6;
  const left = Math.random() * width;
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const isCircle = Math.random() > 0.5;
  const duration = Math.random() * 2000 + 3000; // 3 to 5 seconds
  const delay = Math.random() * 2000;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        // Falling down
        Animated.timing(fallAnim, {
          toValue: height + 50,
          duration: duration,
          useNativeDriver: true,
        }),
        // Spinning
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        // Drifting left/right
        Animated.timing(driftAnim, {
          toValue: (Math.random() - 0.5) * 100,
          duration: duration,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: left,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: isCircle ? size / 2 : 0,
        transform: [
          { translateY: fallAnim },
          { translateX: driftAnim },
          { rotate: spin },
          { rotateX: spin },
        ],
        opacity: 0.8,
      }}
    />
  );
}

export default function Confetti() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </View>
  );
}
