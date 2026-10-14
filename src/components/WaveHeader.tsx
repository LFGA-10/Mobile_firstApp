import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ZLogo } from './ZLogo';

interface WaveHeaderProps {
  height?: number;
}

export function WaveHeader({ height = 210 }: WaveHeaderProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Reference width for SVG bezier coordinates
  const baseW = 390;
  const baseH = 210;

  // S-Curve wave path matching the screenshot:
  // Starts top-left (0,0) -> top-right (390,0) -> right edge down to (390, 105)
  // Curves down across the screen to (0, 195)
  const wavePath = `
    M 0 0
    L ${baseW} 0
    L ${baseW} 105
    C ${baseW * 0.8} 115, ${baseW * 0.65} 145, ${baseW * 0.45} 165
    C ${baseW * 0.25} 185, ${baseW * 0.12} 205, 0 195
    Z
  `;

  return (
    <View style={[styles.container, { height }]}>
      {/* SVG Wave Shape */}
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${baseW} ${baseH}`}
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
      >
        <Path d={wavePath} fill="#FFFFFF" />
      </Svg>

      {/* Centered Logo in the white curved area */}
      <View
        style={[
          styles.logoContainer,
          {
            paddingTop: Math.max(insets.top, 16) + 6,
          },
        ]}
      >
        <ZLogo size={56} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
