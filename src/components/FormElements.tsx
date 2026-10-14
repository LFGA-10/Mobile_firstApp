import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Switch,
  TextInputProps,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// ==========================================
// 1. TEXT INPUT FIELD (Black & White Monochromatic)
// ==========================================
interface InputFieldProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  error?: string;
  helper?: string;
}

export function InputField({
  label,
  isPassword = false,
  error,
  helper,
  style,
  multiline,
  numberOfLines,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          multiline && styles.textareaWrapper,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          placeholderTextColor="#71717A"
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.textInput, multiline && styles.textareaInput, style]}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.eyeIconBtn}
          >
            {showPassword ? (
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle cx="12" cy="12" r="3" stroke="#FFFFFF" strokeWidth="2" />
              </Svg>
            ) : (
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

      {!!helper && !error && <Text style={styles.helperText}>{helper}</Text>}
      {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

// ==========================================
// 2. RADIO BUTTON GROUP (Black & White)
// ==========================================
interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  error?: string;
}

export function RadioGroup({
  label,
  options,
  selectedValue,
  onSelect,
  error,
}: RadioGroupProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.radioOptionsContainer}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={[
                styles.radioCard,
                isSelected && styles.radioCardSelected,
              ]}
            >
              <View
                style={[
                  styles.radioOuterCircle,
                  isSelected && styles.radioOuterCircleSelected,
                ]}
              >
                {isSelected && <View style={styles.radioInnerDot} />}
              </View>
              <Text
                style={[
                  styles.radioOptionLabel,
                  isSelected && styles.radioOptionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

// ==========================================
// 3. CHECKBOX GROUP (Multiple selection - Black & White)
// ==========================================
interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  error,
}: CheckboxGroupProps) {
  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.checkboxGrid}>
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          return (
            <Pressable
              key={option.value}
              onPress={() => toggleValue(option.value)}
              style={[
                styles.checkboxCard,
                isChecked && styles.checkboxCardChecked,
              ]}
            >
              <View
                style={[
                  styles.checkboxBox,
                  isChecked && styles.checkboxBoxChecked,
                ]}
              >
                {isChecked && (
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M5 13l4 4L19 7"
                      stroke="#000000"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
              <Text
                style={[
                  styles.checkboxLabel,
                  isChecked && styles.checkboxLabelChecked,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

// ==========================================
// 4. SINGLE CHECKBOX (Black & White)
// ==========================================
interface SingleCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function SingleCheckbox({
  label,
  checked,
  onChange,
  error,
}: SingleCheckboxProps) {
  return (
    <View style={styles.fieldContainer}>
      <Pressable
        onPress={() => onChange(!checked)}
        style={styles.singleCheckboxRow}
      >
        <View
          style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}
        >
          {checked && (
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 13l4 4L19 7"
                stroke="#000000"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </View>
        <Text style={styles.singleCheckboxText}>{label}</Text>
      </Pressable>
      {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

// ==========================================
// 5. DROPDOWN / SELECT FIELD (Black & White)
// ==========================================
interface SelectOption {
  label: string;
  value: string;
}

interface SelectDropdownProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  error?: string;
}

export function SelectDropdown({
  label,
  placeholder = 'Select an option',
  options,
  selectedValue,
  onSelect,
  error,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.selectTrigger,
          isOpen && styles.selectTriggerOpen,
          !!error && styles.inputError,
        ]}
      >
        <Text
          style={[
            styles.selectTriggerText,
            !selectedValue && styles.placeholderText,
          ]}
        >
          {selectedLabel}
        </Text>

        <Svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        >
          <Path
            d="M6 9l6 6 6-6"
            stroke="#A1A1AA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>

      {isOpen && (
        <View style={styles.optionsDropdown}>
          {options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                style={[
                  styles.optionItem,
                  isSelected && styles.optionItemSelected,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {isSelected && (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M5 13l4 4L19 7"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </Pressable>
            );
          })}
        </View>
      )}

      {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

// ==========================================
// 6. SWITCH / TOGGLE FIELD (Black & White)
// ==========================================
interface SwitchFieldProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export function SwitchField({
  label,
  description,
  value,
  onValueChange,
}: SwitchFieldProps) {
  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchInfo}>
        <Text style={styles.switchLabel}>{label}</Text>
        {!!description && (
          <Text style={styles.switchDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#27272A', true: '#FFFFFF' }}
        thumbColor={value ? '#000000' : '#71717A'}
        ios_backgroundColor="#27272A"
      />
    </View>
  );
}

// ==========================================
// 7. RATING / EXPERIENCE SLIDER (1 to 10 - Black & White)
// ==========================================
interface SliderFieldProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  unit?: string;
}

export function SliderField({
  label,
  value,
  min = 1,
  max = 10,
  onChange,
  unit = 'Level',
}: SliderFieldProps) {
  const levels = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.sliderBadge}>
          {unit} {value} / {max}
        </Text>
      </View>

      <View style={styles.sliderPillsRow}>
        {levels.map((lvl) => {
          const isCurrent = lvl === value;
          const isPassed = lvl <= value;
          return (
            <Pressable
              key={lvl}
              onPress={() => onChange(lvl)}
              style={[
                styles.sliderPill,
                isPassed && styles.sliderPillPassed,
                isCurrent && styles.sliderPillCurrent,
              ]}
            >
              <Text
                style={[
                  styles.sliderPillText,
                  isPassed && styles.sliderPillTextPassed,
                  isCurrent && styles.sliderPillTextCurrent,
                ]}
              >
                {lvl}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ==========================================
// STYLES - STRICTLY BLACK AND WHITE
// ==========================================
const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  helperText: {
    fontSize: 12,
    color: '#A1A1AA',
    marginTop: 5,
  },
  errorText: {
    fontSize: 12,
    color: '#E4E4E7',
    backgroundColor: '#27272A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#52525B',
  },
  inputWrapper: {
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#27272A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    minHeight: 48,
  },
  textareaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    minHeight: 100,
  },
  inputFocused: {
    borderColor: '#FFFFFF',
    backgroundColor: '#18181B',
  },
  inputError: {
    borderColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
  },
  textareaInput: {
    textAlignVertical: 'top',
    height: 80,
  },
  eyeIconBtn: {
    paddingLeft: 10,
    paddingVertical: 4,
  },

  // Radio styles
  radioOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#27272A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  radioCardSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: '#27272A',
  },
  radioOuterCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#52525B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterCircleSelected: {
    borderColor: '#FFFFFF',
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  radioOptionLabel: {
    fontSize: 14,
    color: '#A1A1AA',
    fontWeight: '500',
  },
  radioOptionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Checkbox styles
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkboxCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#27272A',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  checkboxCardChecked: {
    borderColor: '#FFFFFF',
    backgroundColor: '#27272A',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#52525B',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181B',
  },
  checkboxBoxChecked: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#A1A1AA',
    fontWeight: '500',
  },
  checkboxLabelChecked: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Single Checkbox
  singleCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  singleCheckboxText: {
    fontSize: 13,
    color: '#D4D4D8',
    flex: 1,
    lineHeight: 18,
  },

  // Select Dropdown
  selectTrigger: {
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#27272A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    height: 48,
  },
  selectTriggerOpen: {
    borderColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  selectTriggerText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#71717A',
  },
  optionsDropdown: {
    backgroundColor: '#18181B',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    marginTop: 6,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  optionItemSelected: {
    backgroundColor: '#27272A',
  },
  optionText: {
    fontSize: 14,
    color: '#D4D4D8',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Switch Field
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#27272A',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
  },
  switchInfo: {
    flex: 1,
    paddingRight: 12,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  switchDescription: {
    fontSize: 12,
    color: '#A1A1AA',
  },

  // Slider Field
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderBadge: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    backgroundColor: '#121212',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#52525B',
  },
  sliderPillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  sliderPill: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#27272A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderPillPassed: {
    backgroundColor: '#27272A',
    borderColor: '#52525B',
  },
  sliderPillCurrent: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.08 }],
  },
  sliderPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
  },
  sliderPillTextPassed: {
    color: '#D4D4D8',
  },
  sliderPillTextCurrent: {
    color: '#000000',
    fontWeight: '800',
  },
});
