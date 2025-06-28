import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NewsCard } from '@/components/NewsCard';
import { FeaturedNews } from '@/components/FeaturedNews';
import { CategoryFilter } from '@/components/CategoryFilter';
import { mockNews, categories } from '@/data/mockNews';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') return mockNews;
    return mockNews.filter(article => article.category === selectedCategory);
  }, [selectedCategory]);

  const featuredArticle = filteredNews[0];
  const regularArticles = filteredNews.slice(1);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleArticlePress = (articleId: string) => {
    // Handle article navigation
    console.log('Article pressed:', articleId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.light.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gaming News</Text>
        <Text style={styles.headerSubtitle}>Stay updated with the latest in gaming</Text>
      </View>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.tint}
            colors={[Colors.light.tint]}
          />
        }
      >
        {featuredArticle && (
          <View style={styles.featuredSection}>
            <FeaturedNews
              article={featuredArticle}
              onPress={() => handleArticlePress(featuredArticle.id)}
            />
          </View>
        )}

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          {regularArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onPress={() => handleArticlePress(article.id)}
            />
          ))}
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
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
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    paddingVertical: 16,
  },
  newsSection: {
    paddingBottom: 100,
  },
  sectionTitle: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 16,
  },
});