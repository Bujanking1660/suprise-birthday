import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const PottedPlant = ({ size = 80, color = "#1C1C1C" }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Minimalist Potted Plant Line Art */}
    <Path d="M25 65 L32 95 C33 98 67 98 68 95 L75 65 Z" stroke={color} strokeWidth="3" strokeLinejoin="round" fill="#FFF" />
    {/* Simple Face on Pot */}
    <Path d="M40 75 Q45 80 50 75" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M40 75 L40 75.1" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Path d="M50 75 L50 75.1" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Left Leaf */}
    <Path d="M50 65 C20 45 15 25 35 30 C45 32 50 45 50 65" stroke={color} strokeWidth="3" strokeLinejoin="round" />
    {/* Right Leaf */}
    <Path d="M50 65 C80 45 85 25 65 30 C55 32 50 45 50 65" stroke={color} strokeWidth="3" strokeLinejoin="round" />
    {/* Top Leaf */}
    <Path d="M50 65 C40 30 50 15 65 15 C65 25 55 45 50 65" stroke={color} strokeWidth="3" strokeLinejoin="round" />
  </Svg>
);

export const MinimalLeaves = ({ size = 80, color = "#1C1C1C" }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Stem */}
    <Path d="M50 100 C50 70 45 40 55 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Leaves */}
    <Path d="M49 80 C20 70 15 50 35 50 C45 50 49 60 49 80" stroke={color} strokeWidth="3" strokeLinejoin="round" />
    <Path d="M48 55 C75 45 80 25 60 25 C50 25 48 35 48 55" stroke={color} strokeWidth="3" strokeLinejoin="round" />
    <Path d="M47 35 C20 25 15 5 35 5 C45 5 47 15 47 35" stroke={color} strokeWidth="3" strokeLinejoin="round" />
  </Svg>
);

export const SparklesArt = ({ size = 60, color = "#1C1C1C" }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Path d="M50 10 C50 40 40 50 10 50 C40 50 50 60 50 90 C50 60 60 50 90 50 C60 50 50 40 50 10 Z" stroke={color} strokeWidth="3" strokeLinejoin="round" />
    <Path d="M20 20 C20 30 15 35 5 35 C15 35 20 40 20 50 C20 40 25 35 35 35 C25 35 20 30 20 20 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M80 20 C80 25 75 30 65 30 C75 30 80 35 80 40 C80 35 85 30 95 30 C85 30 80 25 80 20 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
  </Svg>
);
