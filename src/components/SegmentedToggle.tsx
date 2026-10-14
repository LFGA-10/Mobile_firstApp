import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export type AuthMode = 'login' | 'signup';

interface SegmentedToggleProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export function SegmentedToggle({ mode, onModeChange }: SegmentedToggleProps) {
  return (
    <View style={styles.container}>
      {/* Login Tab */}
      <Pressable
        onPress={() => onModeChange('login')}
        style={[
          styles.tab,
          mode === 'login' ? styles.activeTab : styles.inactiveTab,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            mode === 'login' ? styles.activeText : styles.inactiveText,
          ]}
        >
          login
        </Text>
      </Pressable>

      {/* Sign Up Tab */}
      <Pressable
        onPress={() => onModeChange('signup')}
        style={[
          styles.tab,
          mode === 'signup' ? styles.activeTab : styles.inactiveTab,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            mode === 'signup' ? styles.activeText : styles.inactiveText,
          ]}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#383838',
    borderRadius: 25,
    padding: 3,
    alignSelf: 'center',
    width: 220,
    height: 42,
  },
  tab: {
    flex: 1,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#D1D5DB', // Light silver/white pill from the design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'System',
  },
  activeText: {
    color: '#18181B',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
