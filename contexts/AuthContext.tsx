import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { AuthContextType, User, LoginCredentials, SignUpCredentials } from '@/types/auth';

// Complete the auth session for web
if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Mock OAuth configurations - replace with your actual credentials
const GOOGLE_CLIENT_ID = 'your-google-client-id';
const FACEBOOK_APP_ID = 'your-facebook-app-id';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Google OAuth configuration
  const googleRequest = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'gaming-news-app',
        useProxy: true,
      }),
    },
    { authorizationEndpoint: 'https://accounts.google.com/oauth/authorize' }
  );

  // Facebook OAuth configuration
  const facebookRequest = AuthSession.useAuthRequest(
    {
      clientId: FACEBOOK_APP_ID,
      scopes: ['public_profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'gaming-news-app',
        useProxy: true,
      }),
    },
    { authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth' }
  );

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeAuth = async (token: string, userData: User) => {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error storing auth:', error);
      throw new Error('Failed to store authentication data');
    }
  };

  const clearAuth = async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with your actual authentication endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate authentication
      if (credentials.email === 'demo@gaming.com' && credentials.password === 'password') {
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          name: 'Gaming Enthusiast',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
          provider: 'email',
          createdAt: new Date().toISOString(),
        };
        
        await storeAuth('mock-token', mockUser);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with your actual registration endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        provider: 'email',
        createdAt: new Date().toISOString(),
      };
      
      await storeAuth('mock-token', mockUser);
    } catch (error) {
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await googleRequest[1]();
      
      if (result?.type === 'success') {
        // Mock user data - in production, fetch from Google API
        const mockUser: User = {
          id: 'google-' + Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
          provider: 'google',
          createdAt: new Date().toISOString(),
        };
        
        await storeAuth(result.params.access_token || 'google-token', mockUser);
      }
    } catch (error) {
      throw new Error('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setIsLoading(true);
      
      if (Platform.OS === 'web') {
        throw new Error('Apple Sign-In is not available on web');
      }
      
      // Mock Apple Sign-In for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'apple-' + Date.now(),
        email: 'user@icloud.com',
        name: 'Apple User',
        provider: 'apple',
        createdAt: new Date().toISOString(),
      };
      
      await storeAuth('apple-token', mockUser);
    } catch (error) {
      throw new Error('Apple Sign-In failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setIsLoading(true);
      const result = await facebookRequest[1]();
      
      if (result?.type === 'success') {
        // Mock user data - in production, fetch from Facebook API
        const mockUser: User = {
          id: 'facebook-' + Date.now(),
          email: 'user@facebook.com',
          name: 'Facebook User',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
          provider: 'facebook',
          createdAt: new Date().toISOString(),
        };
        
        await storeAuth(result.params.access_token || 'facebook-token', mockUser);
      }
    } catch (error) {
      throw new Error('Facebook sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await clearAuth();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Mock API call - replace with your actual password reset endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signInWithFacebook,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}