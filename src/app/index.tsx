import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

import {
  InputField,
  RadioGroup,
  CheckboxGroup,
  SingleCheckbox,
  SelectDropdown,
  SwitchField,
  SliderField,
} from '@/components/FormElements';
import {
  SubmissionSuccessModal,
  FormSubmissionData,
} from '@/components/SubmissionSuccessModal';

export default function ComprehensiveFormScreen() {
  // Form State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [studyMode, setStudyMode] = useState('Full-Time');
  const [country, setCountry] = useState('Rwanda');
  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree");
  const [skills, setSkills] = useState<string[]>(['React Native', 'TypeScript']);
  const [experienceLevel, setExperienceLevel] = useState<number>(7);
  const [birthDate, setBirthDate] = useState('2002-05-18');
  const [notifications, setNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [bio, setBio] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Status & Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormSubmissionData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showConsoleCard, setShowConsoleCard] = useState(false);
  const [lastLoggedPayload, setLastLoggedPayload] = useState<string | null>(null);

  // Options
  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const studyModeOptions = [
    { label: 'Full-Time', value: 'Full-Time' },
    { label: 'Part-Time', value: 'Part-Time' },
    { label: 'Online / Remote', value: 'Online / Remote' },
  ];

  const countryOptions = [
    { label: 'Rwanda', value: 'Rwanda' },
    { label: 'Kenya', value: 'Kenya' },
    { label: 'Uganda', value: 'Uganda' },
    { label: 'Tanzania', value: 'Tanzania' },
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Other', value: 'Other' },
  ];

  const educationOptions = [
    { label: 'High School', value: 'High School' },
    { label: "Bachelor's Degree", value: "Bachelor's Degree" },
    { label: "Master's Degree", value: "Master's Degree" },
    { label: 'PhD / Doctorate', value: 'PhD' },
    { label: 'Self-Taught / Bootcamp', value: 'Self-Taught' },
  ];

  const skillOptions = [
    { label: 'React Native', value: 'React Native' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'UI/UX Design', value: 'UI/UX Design' },
    { label: 'Node.js / Express', value: 'Node.js' },
    { label: 'Python', value: 'Python' },
    { label: 'SQL / Databases', value: 'Databases' },
  ];

  const validate = () => {
    const err: { [key: string]: string } = {};

    if (!fullName.trim()) err.fullName = 'Full name is required';
    if (!username.trim()) {
      err.username = 'Username is required';
    } else if (username.trim().length < 3) {
      err.username = 'Username must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      err.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      err.email = 'Please enter a valid email';
    }

    if (!password) {
      err.password = 'Password is required';
    } else if (password.length < 6) {
      err.password = 'Password must be at least 6 characters';
    }

    if (!phone.trim()) {
      err.phone = 'Phone number is required';
    }

    if (!age.trim()) {
      err.age = 'Age is required';
    } else if (isNaN(Number(age)) || Number(age) < 10 || Number(age) > 120) {
      err.age = 'Please enter a valid age (10-120)';
    }

    if (!country) err.country = 'Please select your country';
    if (!educationLevel) err.educationLevel = 'Please select your education';
    if (skills.length === 0) err.skills = 'Please select at least one skill';
    if (!termsAccepted) err.termsAccepted = 'You must accept the terms & conditions';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload: FormSubmissionData = {
      fullName: fullName.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      age: Number(age),
      gender,
      country,
      educationLevel,
      bio: bio.trim(),
      skills,
      experienceLevel,
      birthDate: birthDate.trim(),
      notifications,
      termsAccepted,
      submittedAt: new Date().toLocaleString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);

      // ==========================================
      // CRITICAL REQUIREMENT: PRINT ALL DETAILS IN CONSOLE
      // ==========================================
      console.log('======================================================');
      console.log('>>> [FORM SUBMITTED] ALL DETAILS RECEIVED & LOGGED <<<');
      console.log('======================================================');
      console.log('Full Name:               ', payload.fullName);
      console.log('Username:                @' + payload.username);
      console.log('Email Address:           ', payload.email);
      console.log('Password:                ', payload.password);
      console.log('Phone Number:            ', payload.phone);
      console.log('Age:                     ', payload.age);
      console.log('Gender:                  ', payload.gender);
      console.log('Study Mode:              ', studyMode);
      console.log('Country / Location:      ', payload.country);
      console.log('Education Level:         ', payload.educationLevel);
      console.log('Skills & Interests:      ', payload.skills.join(', '));
      console.log('Experience Level:        ', `${payload.experienceLevel} / 10`);
      console.log('Date of Birth:           ', payload.birthDate);
      console.log('Notifications Enabled:   ', payload.notifications ? 'YES' : 'NO');
      console.log('Two-Factor Auth (2FA):   ', twoFactorAuth ? 'ENABLED' : 'DISABLED');
      console.log('Bio / Statement:         ', payload.bio || '(None provided)');
      console.log('Terms & Conditions:      ', payload.termsAccepted ? 'ACCEPTED' : 'NOT ACCEPTED');
      console.log('Submission Timestamp:    ', payload.submittedAt);
      console.log('------------------------------------------------------');
      console.log('Tabular View (console.table):');
      console.table(payload);
      console.log('Complete JSON Object Payload:');
      console.log(payload);
      console.log('======================================================');

      // Update UI state
      setSubmittedData(payload);
      setLastLoggedPayload(JSON.stringify(payload, null, 2));
      setShowConsoleCard(true);
      setModalVisible(true);
    }, 400);
  };

  const handleReset = () => {
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
    setAge('');
    setGender('Male');
    setStudyMode('Full-Time');
    setCountry('Rwanda');
    setEducationLevel("Bachelor's Degree");
    setSkills([]);
    setExperienceLevel(5);
    setBirthDate('');
    setBio('');
    setNotifications(true);
    setTwoFactorAuth(false);
    setTermsAccepted(false);
    setErrors({});
    setModalVisible(false);
    setSubmittedData(null);
    setShowConsoleCard(false);
    setLastLoggedPayload(null);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Top Header Banner (Strictly Black & White) */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Mobile App Form</Text>
        </View>
        <Text style={styles.headerTitle}>All Form Elements</Text>
        <Text style={styles.headerSubtitle}>
          Fill out all inputs below and click Submit to print all submitted details in the console.
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Card containing all form elements */}
          <View style={styles.formCard}>
            {/* Section 1: Personal Information */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>1</Text>
              </View>
              <Text style={styles.sectionTitle}>Personal Details (Text Inputs)</Text>
            </View>

            {/* 1. Text Input: Full Name */}
            <InputField
              label="Full Name *"
              placeholder="e.g. Alex Ndayisaba"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              error={errors.fullName}
            />

            {/* 2. Text Input: Username */}
            <InputField
              label="Username *"
              placeholder="e.g. alex_ndayi"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
              }}
              error={errors.username}
            />

            {/* 3. Email Input */}
            <InputField
              label="Email Address *"
              placeholder="e.g. alex@example.com"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              error={errors.email}
            />

            {/* 4. Password Input */}
            <InputField
              label="Password *"
              placeholder="Enter secure password"
              isPassword
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              error={errors.password}
            />

            {/* 5. Phone Input & 6. Age Input in Row */}
            <View style={styles.row}>
              <View style={{ flex: 1.4 }}>
                <InputField
                  label="Phone Number *"
                  placeholder="e.g. +250 788 123 456"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  error={errors.phone}
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Age *"
                  placeholder="e.g. 21"
                  keyboardType="numeric"
                  value={age}
                  maxLength={3}
                  onChangeText={(text) => {
                    setAge(text);
                    if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
                  }}
                  error={errors.age}
                />
              </View>
            </View>

            {/* 7. Date of Birth Input */}
            <InputField
              label="Date of Birth"
              placeholder="YYYY-MM-DD (e.g. 2002-05-18)"
              value={birthDate}
              onChangeText={setBirthDate}
              helper="Format: YYYY-MM-DD"
            />

            {/* Section 2: Selections & Dropdowns */}
            <View style={[styles.sectionHeader, { marginTop: 10 }]}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>2</Text>
              </View>
              <Text style={styles.sectionTitle}>Select & Radio Elements</Text>
            </View>

            {/* 8. Radio Buttons: Gender */}
            <RadioGroup
              label="Gender *"
              options={genderOptions}
              selectedValue={gender}
              onSelect={setGender}
            />

            {/* 9. Radio Buttons: Study Mode */}
            <RadioGroup
              label="Study / Work Mode"
              options={studyModeOptions}
              selectedValue={studyMode}
              onSelect={setStudyMode}
            />

            {/* 10. Select Dropdown: Country */}
            <SelectDropdown
              label="Country of Origin / Residence *"
              options={countryOptions}
              selectedValue={country}
              onSelect={(val) => {
                setCountry(val);
                if (errors.country) setErrors((prev) => ({ ...prev, country: '' }));
              }}
              error={errors.country}
            />

            {/* 11. Select Dropdown: Education */}
            <SelectDropdown
              label="Highest Education Level *"
              options={educationOptions}
              selectedValue={educationLevel}
              onSelect={(val) => {
                setEducationLevel(val);
                if (errors.educationLevel)
                  setErrors((prev) => ({ ...prev, educationLevel: '' }));
              }}
              error={errors.educationLevel}
            />

            {/* Section 3: Checkboxes & Ranges */}
            <View style={[styles.sectionHeader, { marginTop: 10 }]}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>3</Text>
              </View>
              <Text style={styles.sectionTitle}>Checkboxes & Rating Slider</Text>
            </View>

            {/* 12. Checkbox Group: Skills */}
            <CheckboxGroup
              label="Technical Skills / Interests *"
              options={skillOptions}
              selectedValues={skills}
              onChange={(newSkills) => {
                setSkills(newSkills);
                if (errors.skills) setErrors((prev) => ({ ...prev, skills: '' }));
              }}
              error={errors.skills}
            />

            {/* 13. Range / Rating Slider */}
            <SliderField
              label="Self-Rated Experience Level (1 to 10)"
              value={experienceLevel}
              min={1}
              max={10}
              onChange={setExperienceLevel}
              unit="Rating"
            />

            {/* Section 4: Switches & Multiline Textarea */}
            <View style={[styles.sectionHeader, { marginTop: 10 }]}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>4</Text>
              </View>
              <Text style={styles.sectionTitle}>Switches & Multiline Textarea</Text>
            </View>

            {/* 14. Switch 1: Notifications */}
            <SwitchField
              label="Email Notifications"
              description="Receive weekly summaries, announcements and activity logs"
              value={notifications}
              onValueChange={setNotifications}
            />

            {/* 15. Switch 2: Two-Factor Auth */}
            <SwitchField
              label="Two-Factor Authentication (2FA)"
              description="Require verification code on sensitive account actions"
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
            />

            {/* 16. Multiline Textarea: Bio */}
            <InputField
              label="Bio / Additional Comments"
              placeholder="Write a brief introduction or your goal for this course..."
              multiline
              numberOfLines={4}
              value={bio}
              onChangeText={setBio}
              helper="Optional: Max 300 characters"
            />

            {/* 17. Single Checkbox: Terms & Conditions */}
            <SingleCheckbox
              label="I agree to the Terms of Service, Code of Conduct, and Privacy Policy *"
              checked={termsAccepted}
              onChange={(checked) => {
                setTermsAccepted(checked);
                if (errors.termsAccepted) {
                  setErrors((prev) => ({ ...prev, termsAccepted: '' }));
                }
              }}
              error={errors.termsAccepted}
            />

            {/* Submission Action Buttons */}
            <View style={styles.actionsContainer}>
              <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={({ pressed }) => [
                  styles.submitBtn,
                  pressed && styles.submitBtnPressed,
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#000000" size="small" />
                ) : (
                  <View style={styles.btnContentRow}>
                    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        stroke="#000000"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                    <Text style={styles.submitBtnText}>Submit & Log to Console</Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={handleReset}
                style={({ pressed }) => [
                  styles.resetBtn,
                  pressed && styles.resetBtnPressed,
                ]}
              >
                <Text style={styles.resetBtnText}>Clear / Reset Form</Text>
              </Pressable>
            </View>
          </View>

          {/* Live Console Output Card (Strict Black & White) */}
          {showConsoleCard && lastLoggedPayload && (
            <View style={styles.consoleCard}>
              <View style={styles.consoleCardHeader}>
                <View style={styles.consoleHeaderLeft}>
                  <View style={styles.terminalDotWhite} />
                  <Text style={styles.consoleCardTitle}>
                    Console Output Logged (F12)
                  </Text>
                </View>
                <Text style={styles.consoleHintBadge}>console.log & table</Text>
              </View>
              <Text style={styles.consoleExplanation}>
                Open developer tools (<Text style={{ fontWeight: '700', color: '#FFFFFF' }}>F12</Text> in browser → <Text style={{ fontWeight: '700', color: '#FFFFFF' }}>Console</Text>) or your terminal to inspect the active log and table!
              </Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{lastLoggedPayload}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submission Success Modal */}
      <SubmissionSuccessModal
        visible={modalVisible}
        data={submittedData}
        onClose={() => setModalVisible(false)}
        onReset={handleReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000', // Pure black
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 60,
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : 40,
    paddingBottom: 22,
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#1E1E22',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#A1A1AA',
    textAlign: 'center',
    maxWidth: 480,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#0F0F11',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#27272A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  sectionNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionNumberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionsContainer: {
    marginTop: 20,
    gap: 12,
  },
  submitBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  submitBtnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  btnContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 0.2,
  },
  resetBtn: {
    backgroundColor: '#18181B',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  resetBtnPressed: {
    opacity: 0.8,
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  consoleCard: {
    backgroundColor: '#0F0F11',
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: '#3F3F46',
  },
  consoleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  consoleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  terminalDotWhite: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  consoleCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  consoleHintBadge: {
    fontSize: 11,
    color: '#000000',
    fontWeight: '700',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  consoleExplanation: {
    fontSize: 12,
    color: '#A1A1AA',
    marginBottom: 12,
    lineHeight: 18,
  },
  codeContainer: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#27272A',
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 18,
  },
});
