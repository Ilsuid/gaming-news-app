import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, ExternalLink } from 'lucide-react-native';
import { NewsArticle } from '@/types/news';
import { Colors } from '@/constants/Colors';

interface NewsCardProps {
  article: NewsArticle;
  onPress: () => void;
}

export function NewsCard({ article, onPress }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.source}>{article.source}</Text>
          <View style={styles.meta}>
            <Clock size={12} color={Colors.light.muted} />
            <Text style={styles.time}>{formatDate(article.publishedAt)}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.readTime}>{article.readTime}</Text>
          <ExternalLink size={14} color={Colors.light.tint} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.light.border,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    color: Colors.light.muted,
    fontSize: 12,
  },
  title: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    color: Colors.light.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    color: Colors.light.muted,
    fontSize: 12,
  },
});