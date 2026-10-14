import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface ZLogoProps {
  size?: number;
}

export function ZLogo({ size = 54 }: ZLogoProps) {
  const viewBoxSize = 100;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
      >
        <Defs>
          {/* Main diagonal gradient for metallic 3D ribbon depth */}
          <LinearGradient id="zGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#18181B" />
            <Stop offset="35%" stopColor="#27272A" />
            <Stop offset="70%" stopColor="#71717A" />
            <Stop offset="100%" stopColor="#18181B" />
          </LinearGradient>

          {/* Top fold highlight */}
          <LinearGradient id="zGradTop" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#18181B" />
            <Stop offset="60%" stopColor="#3F3F46" />
            <Stop offset="100%" stopColor="#18181B" />
          </LinearGradient>

          {/* Bottom fold shadow */}
          <LinearGradient id="zGradBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#52525B" />
            <Stop offset="60%" stopColor="#27272A" />
            <Stop offset="100%" stopColor="#09090B" />
          </LinearGradient>
        </Defs>

        {/* 3D Curved Ribbon Z shape */}
        {/* Top curved head and arm */}
        <Path
          d="M 68 18 C 76 22 78 30 72 36 L 42 62 C 38 66 32 68 28 66 C 24 64 22 58 26 53 L 56 26 C 60 22 64 16 68 18 Z"
          fill="url(#zGradTop)"
        />

        {/* Central diagonal twist */}
        <Path
          d="M 68 20 C 72 26 66 36 56 46 L 36 64 C 28 72 22 78 26 84 C 30 88 38 86 46 80 L 76 56 C 84 50 86 38 80 28 C 76 22 72 18 68 20 Z"
          fill="url(#zGradMain)"
          opacity={0.95}
        />

        {/* Bottom sweep and hook */}
        <Path
          d="M 28 76 C 24 72 22 66 26 62 L 58 34 C 64 28 72 28 76 34 C 80 40 76 48 68 56 L 40 80 C 34 84 28 82 28 76 Z"
          fill="url(#zGradBottom)"
        />

        {/* Core solid overlay ribbon for crisp silhouette */}
        <Path
          d="M 66 18 C 76 20 78 30 68 39 L 43 62 C 37 68 31 73 34 81 C 37 87 46 87 56 80 L 75 66 C 79 63 83 66 81 70 C 77 77 62 88 47 88 C 30 88 20 78 22 66 C 24 57 32 49 42 41 L 63 24 C 66 21 68 18 66 18 Z"
          fill="#1C1C1E"
        />

        {/* Subtle glossy reflection accent */}
        <Path
          d="M 60 24 C 64 28 58 36 49 44 L 38 53 C 35 56 32 58 34 60 C 36 62 40 59 44 55 L 59 42 C 67 34 71 27 68 22 C 65 21 62 22 60 24 Z"
          fill="#71717A"
          opacity={0.65}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
