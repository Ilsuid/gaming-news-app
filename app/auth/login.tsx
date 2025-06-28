import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Mail, Lock, Chrome, Apple, Facebook } from 'lucide-react-native';
import { AuthInput } from '@/components/AuthInput';
import { AuthButton } from '@/components/AuthButton';
import { SocialButton } from '@/components/SocialButton';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn, signInWithGoogle, signInWithApple, signInWithFacebook, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      await signIn({ email: email.trim(), password });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Sign In Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Google Sign In Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleAppleSignIn = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Apple Sign-In is not available on web');
      return;
    }

    try {
      await signInWithApple();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Apple Sign In Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Facebook Sign In Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.light.background} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your gaming journey</Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            autoComplete="email"
          />

          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
            autoComplete="password"
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Link href="/auth/forgot-password" asChild>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Link>
          </TouchableOpacity>

          <AuthButton
            title="Sign In"
            onPress={handleSignIn}
            loading={isLoading}
            style={styles.signInButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <SocialButton
              title="Continue with Google"
              onPress={handleGoogleSignIn}
              loading={isLoading}
              icon={<Chrome size={20} color={Colors.light.text} />}
            />

            {Platform.OS !== 'web' && (
              <SocialButton
                title="Continue with Apple"
                onPress={handleAppleSignIn}
                loading={isLoading}
                icon={<Apple size={20} color={Colors.light.text} />}
              />
            )}

            <SocialButton
              title="Continue with Facebook"
              onPress={handleFacebookSignIn}
              loading={isLoading}
              icon={<Facebook size={20} color={Colors.light.text} />}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.demoInfo}>
            <Text style={styles.demoText}>Demo credentials:</Text>
            <Text style={styles.demoCredentials}>Email: demo@gaming.com</Text>
            <Text style={styles.demoCredentials}>Password: password</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    color: Colors.light.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    color: Colors.light.muted,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  signInButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    color: Colors.light.muted,
    fontSize: 14,
    marginHorizontal: 16,
    fontFamily: 'Inter-Regular',
  },
  socialButtons: {
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    color: Colors.light.muted,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footerLink: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  demoInfo: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
  },
  demoText: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  demoCredentials: {
    color: Colors.light.muted,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});