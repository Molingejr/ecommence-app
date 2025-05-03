import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategory } from '../../store/categorySlice';

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];

export default function CategoryList() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectCategory);

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      dispatch(setCategory(null));
    } else {
      dispatch(setCategory(category));
    }
  };

  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        <TouchableOpacity 
          style={[
            styles.categoryItem,
            !selectedCategory && styles.selectedCategory
          ]}
          onPress={() => dispatch(setCategory(null))}
        >
          <Text style={[
            styles.categoryText,
            !selectedCategory && styles.selectedCategoryText
          ]}>All</Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  selectedCategoryText: {
    color: '#fff',
  },
}); 