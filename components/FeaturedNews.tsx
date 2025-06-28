import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Clock, TrendingUp } from 'lucide-react-native';
import { NewsArticle } from '@/types/news';
import { Colors } from '@/constants/Colors';

interface FeaturedNewsProps {
  article: NewsArticle;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export function FeaturedNews({ article, onPress }: FeaturedNewsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.badge}>
          <TrendingUp size={14} color={Colors.light.background} />
          <Text style={styles.badgeText}>TRENDING</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {article.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source}</Text>
          <View style={styles.meta}>
            <Clock size={12} color={Colors.light.text} />
            <Text style={styles.time}>{formatDate(article.publishedAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 280,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.border,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 4,
  },
  badgeText: {
    color: Colors.light.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 8,
  },
  description: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
    opacity: 0.9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    color: Colors.light.tint,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    color: Colors.light.text,
    fontSize: 12,
    opacity: 0.8,
  },
});