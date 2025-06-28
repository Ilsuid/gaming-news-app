import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  icon: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export function SocialButton({ 
  title, 
  onPress, 
  loading = false,
  icon,
  backgroundColor = Colors.light.card,
  textColor = Colors.light.text
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, loading && styles.disabledButton]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {loading ? (
            <ActivityIndicator size="small" color={textColor} />
          ) : (
            icon
          )}
        </View>
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  disabledButton: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
});