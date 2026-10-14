import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export interface FormSubmissionData {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  age: number | string;
  gender: string;
  country: string;
  educationLevel: string;
  bio: string;
  skills: string[];
  experienceLevel: number;
  birthDate: string;
  notifications: boolean;
  termsAccepted: boolean;
  submittedAt: string;
}

interface SubmissionSuccessModalProps {
  visible: boolean;
  data: FormSubmissionData | null;
  onClose: () => void;
  onReset: () => void;
}

export function SubmissionSuccessModal({
  visible,
  data,
  onClose,
  onReset,
}: SubmissionSuccessModalProps) {
  if (!data) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Black & White Checkmark Icon */}
          <View style={styles.iconCircle}>
            <Svg width={44} height={44} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="12" r="11" fill="#FFFFFF" />
              <Path
                d="M7.5 12l3 3 6-6"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          {/* Title & Subtitle */}
          <Text style={styles.title}>Submitted Successfully</Text>
          <Text style={styles.subtitle}>
            All form details have been received and printed to the console.
          </Text>

          {/* Console Notice Banner (Black & White) */}
          <View style={styles.consoleNoticeBanner}>
            <View style={styles.consoleDot} />
            <Text style={styles.consoleNoticeText}>
              Console Log Active: Press F12 or check terminal
            </Text>
          </View>

          {/* Scrollable Summary of all fields */}
          <ScrollView
            style={styles.detailsContainer}
            contentContainerStyle={styles.detailsContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Full Name</Text>
              <Text style={styles.detailValue}>{data.fullName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Username</Text>
              <Text style={styles.detailValue}>@{data.username}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{data.email}</Text>
            </View>

            {data.password ? (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Password</Text>
                <Text style={styles.detailValue}>
                  {'•'.repeat(Math.min(data.password.length, 10))}
                </Text>
              </View>
            ) : null}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{data.phone || 'N/A'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>{data.age} years</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{data.gender}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Country</Text>
              <Text style={styles.detailValue}>{data.country}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Education</Text>
              <Text style={styles.detailValue}>{data.educationLevel}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Skills</Text>
              <Text style={styles.detailValue}>
                {data.skills.length > 0 ? data.skills.join(', ') : 'None'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Experience</Text>
              <Text style={styles.detailValue}>Level {data.experienceLevel}/10</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Birth Date</Text>
              <Text style={styles.detailValue}>{data.birthDate || 'N/A'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Notifications</Text>
              <Text style={styles.detailValue}>
                {data.notifications ? 'Yes' : 'No'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Terms Accepted</Text>
              <Text style={styles.detailValue}>
                {data.termsAccepted ? 'Yes' : 'No'}
              </Text>
            </View>

            {data.bio ? (
              <View style={[styles.detailRow, { flexDirection: 'column', gap: 4 }]}>
                <Text style={styles.detailLabel}>Bio / Description:</Text>
                <Text style={[styles.detailValue, { textAlign: 'left', maxWidth: '100%' }]}>
                  {data.bio}
                </Text>
              </View>
            ) : null}

            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.detailLabel}>Submitted At</Text>
              <Text style={styles.detailValue}>{data.submittedAt}</Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <Pressable
              onPress={onReset}
              style={[styles.actionButton, styles.secondaryButton]}
            >
              <Text style={styles.secondaryButtonText}>Reset Form</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={[styles.actionButton, styles.primaryButton]}
            >
              <Text style={styles.primaryButtonText}>Close & Edit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 12,
  },
  iconCircle: {
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13,
    color: '#A1A1AA',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 18,
  },
  consoleNoticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#52525B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 14,
    width: '100%',
  },
  consoleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  consoleNoticeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#141416',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 18,
    maxHeight: 280,
    borderWidth: 1,
    borderColor: '#27272A',
  },
  detailsContent: {
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  detailLabel: {
    fontSize: 12,
    color: '#A1A1AA',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    maxWidth: '65%',
    textAlign: 'right',
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
