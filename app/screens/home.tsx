import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useGetProductsQuery } from '../../store/api';
import CategoryList from '../components/CategoryList';
import ImageCarousel from '../components/ImageCarousel';
import ProductGrid from '../components/ProductGrid';

export default function HomeScreen() {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageCarousel />
      <CategoryList />
      <ProductGrid />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
