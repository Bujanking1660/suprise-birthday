import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';

const MASCOTS = [
  require('../../assets/maskot1.png'),
  require('../../assets/maskot2.png'),
  require('../../assets/maskot3.png'),
  require('../../assets/maskot4.png'),
];

export default function RotatingMascot() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loopAnimation = () => {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        rotateAnim.setValue(0);
        setIndex((prev) => (prev + 1) % MASCOTS.length);
        loopAnimation();
      });
    };
    loopAnimation();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ rotateY: rotation }] }] }>
      <Image source={MASCOTS[index]} style={styles.image} resizeMode="contain" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
