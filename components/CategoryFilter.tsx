import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Grid3x3 as Grid3X3, Monitor, Gamepad2, Smartphone, Trophy, Star, Briefcase } from 'lucide-react-native';
import { NewsCategory } from '@/types/news';
import { Colors } from '@/constants/Colors';

interface CategoryFilterProps {
  categories: NewsCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const iconMap = {
  grid: Grid3X3,
  monitor: Monitor,
  'gamepad-2': Gamepad2,
  smartphone: Smartphone,
  trophy: Trophy,
  star: Star,
  briefcase: Briefcase,
};

export function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap];
          const isSelected = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, isSelected && styles.selectedCategory]}
              onPress={() => onCategorySelect(category.id)}
              activeOpacity={0.7}
            >
              <IconComponent 
                size={20} 
                color={isSelected ? Colors.light.background : Colors.light.icon} 
              />
              <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
    gap: 8,
  },
  selectedCategory: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  categoryText: {
    color: Colors.light.icon,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.light.background,
    fontWeight: '600',
  },
});