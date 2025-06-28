import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { 
  Settings, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  User as UserIcon,
  Edit3
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
}

function SettingItem({ icon, title, subtitle, onPress, showChevron = true }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && (
        <ChevronRight size={20} color={Colors.light.muted} />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user, signOut, isLoading } = useAuth();

  const handleSettingPress = (setting: string) => {
    console.log('Setting pressed:', setting);
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/auth/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  const getProviderBadge = (provider: string) => {
    const badges = {
      google: { text: 'Google', color: '#4285F4' },
      apple: { text: 'Apple', color: '#000000' },
      facebook: { text: 'Facebook', color: '#1877F2' },
      email: { text: 'Email', color: Colors.light.tint },
    };
    
    return badges[provider as keyof typeof badges] || badges.email;
  };

  if (!user) {
    return null;
  }

  const providerBadge = getProviderBadge(user.provider);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.light.background} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <UserIcon size={32} color={Colors.light.muted} />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit3 size={14} color={Colors.light.background} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.providerBadge}>
            <Text style={[styles.providerText, { color: providerBadge.color }]}>
              Connected via {providerBadge.text}
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Bell size={20} color={Colors.light.tint} />}
              title="Notifications"
              subtitle="Manage your notification preferences"
              onPress={() => handleSettingPress('notifications')}
            />
            <SettingItem
              icon={<Moon size={20} color={Colors.light.tint} />}
              title="Dark Mode"
              subtitle="Currently enabled"
              onPress={() => handleSettingPress('theme')}
            />
            <SettingItem
              icon={<Globe size={20} color={Colors.light.tint} />}
              title="Language"
              subtitle="English"
              onPress={() => handleSettingPress('language')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Settings size={20} color={Colors.light.tint} />}
              title="Account Settings"
              subtitle="Manage your account details"
              onPress={() => handleSettingPress('account')}
            />
            <SettingItem
              icon={<Shield size={20} color={Colors.light.tint} />}
              title="Privacy & Security"
              subtitle="Control your privacy settings"
              onPress={() => handleSettingPress('privacy')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<HelpCircle size={20} color={Colors.light.tint} />}
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() => handleSettingPress('help')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<LogOut size={20} color={Colors.light.tint} />}
              title="Sign Out"
              onPress={handleSignOut}
              showChevron={false}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Gaming News App v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for gamers</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.border,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.tint,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  userName: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  userEmail: {
    color: Colors.light.muted,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  providerBadge: {
    backgroundColor: Colors.light.card,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  providerText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  settingsGroup: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'Inter-Medium',
  },
  settingSubtitle: {
    color: Colors.light.muted,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    color: Colors.light.muted,
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
});