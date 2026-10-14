import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TextInputProps,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface FormFieldProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  error?: string;
}

export function FormField({
  label,
  isPassword = false,
  error,
  style,
  ...props
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Row */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          placeholderTextColor="#52525B"
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, style]}
          {...props}
        />

        {/* Eye icon for password visibility toggle */}
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.eyeButton}
          >
            {showPassword ? (
              // Eye open icon
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="#A1A1AA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                  stroke="#A1A1AA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            ) : (
              // Eye off / slashed icon
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                  stroke="#71717A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M1 1l22 22"
                  stroke="#71717A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </Pressable>
        )}
      </View>

      {/* Error message */}
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E4E4E7',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#383838', // Muted subtle line matching the screenshot
    paddingBottom: 4,
  },
  inputFocused: {
    borderBottomColor: '#FFFFFF', // High-contrast clean white underline when typing
    borderBottomWidth: 1.5,
  },
  inputError: {
    borderBottomColor: '#EF4444',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  eyeButton: {
    paddingLeft: 8,
    paddingRight: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#F87171',
    marginTop: 4,
  },
});
