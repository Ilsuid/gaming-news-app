import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bookmark, BookmarkX } from 'lucide-react-native';
import { NewsCard } from '@/components/NewsCard';
import { mockNews } from '@/data/mockNews';
import { Colors } from '@/constants/Colors';

export default function BookmarksScreen() {
  // Simulate saved articles (first 3 articles)
  const [savedArticles, setSavedArticles] = useState(mockNews.slice(0, 3));

  const handleArticlePress = (articleId: string) => {
    console.log('Article pressed:', articleId);
  };

  const removeBookmark = (articleId: string) => {
    setSavedArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const clearAllBookmarks = () => {
    setSavedArticles([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.light.background} />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Saved Articles</Text>
            <Text style={styles.headerSubtitle}>
              {savedArticles.length} article{savedArticles.length !== 1 ? 's' : ''} saved
            </Text>
          </View>
          {savedArticles.length > 0 && (
            <TouchableOpacity onPress={clearAllBookmarks} style={styles.clearButton}>
              <BookmarkX size={20} color={Colors.light.tint} />
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {savedArticles.length === 0 ? (
          <View style={styles.emptyState}>
            <Bookmark size={64} color={Colors.light.muted} />
            <Text style={styles.emptyTitle}>No saved articles</Text>
            <Text style={styles.emptyText}>
              Articles you bookmark will appear here for easy access later
            </Text>
          </View>
        ) : (
          <View style={styles.newsSection}>
            {savedArticles.map((article) => (
              <View key={article.id} style={styles.articleContainer}>
                <NewsCard
                  article={article}
                  onPress={() => handleArticlePress(article.id)}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeBookmark(article.id)}
                >
                  <BookmarkX size={16} color={Colors.light.tint} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.light.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: Colors.light.muted,
    fontSize: 14,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  clearText: {
    color: Colors.light.tint,
    fontSize: 12,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: Colors.light.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  newsSection: {
    paddingBottom: 100,
  },
  articleContainer: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 16,
    right: 24,
    backgroundColor: Colors.light.card,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
});