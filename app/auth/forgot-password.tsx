import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { AuthInput } from '@/components/AuthInput';
import { AuthButton } from '@/components/AuthButton';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword, isLoading } = useAuth();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleResetPassword = async () => {
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await resetPassword(email.trim());
      setEmailSent(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor={Colors.light.background} />
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <ArrowLeft size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Mail size={64} color={Colors.light.tint} />
          </View>
          
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a password reset link to{'\n'}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
          
          <Text style={styles.instructions}>
            Click the link in the email to reset your password. If you don't see the email, check your spam folder.
          </Text>

          <AuthButton
            title="Back to Sign In"
            onPress={handleBackToLogin}
            style={styles.backToLoginButton}
          />

          <TouchableOpacity onPress={() => setEmailSent(false)}>
            <Text style={styles.resendText}>
              Didn't receive the email? <Text style={styles.resendLink}>Try again</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.light.background} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
          <ArrowLeft size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          No worries! Enter your email address and we'll send you a link to reset your password.
        </Text>

        <View style={styles.form}>
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
            autoComplete="email"
          />

          <AuthButton
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={isLoading}
            style={styles.resetButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  successIcon: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    color: Colors.light.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    color: Colors.light.muted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: 'Inter-Regular',
  },
  emailText: {
    color: Colors.light.text,
    fontWeight: '600',
  },
  instructions: {
    color: Colors.light.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    fontFamily: 'Inter-Regular',
  },
  form: {
    marginTop: 20,
  },
  resetButton: {
    marginTop: 24,
  },
  backToLoginButton: {
    marginBottom: 24,
  },
  resendText: {
    color: Colors.light.muted,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  resendLink: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
});