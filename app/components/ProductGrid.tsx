import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../store/api';
import { addToCart } from '../../store/cartSlice';
import { Product } from '../../store/types';
import StarRating from './StarRating';

type RootStackParamList = {
  Home: undefined;
  ProductDetails: { id: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProductCardProps {
  product: Product;
  width: number;
}

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 48) / numColumns;

function ProductCard({ product, width }: ProductCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const handlePress = () => {
    navigation.navigate('ProductDetails', { id: product.id });
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <TouchableOpacity 
      style={[styles.itemContainer, { width }]}
      onPress={handlePress}
    >
      <Image source={{ uri: product.image }} style={[styles.productImage, { height: width }]} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        {product.rating && <StarRating rating={product.rating} />}
        <Text style={styles.productPrice}>${product.price}</Text>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <FontAwesome name="cart-plus" size={16} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductGrid() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-circle" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>Failed to load products</Text>
        <Text style={styles.errorSubtext}>Please check your internet connection</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Products</Text>
      <View style={styles.grid}>
        {products?.map((item, index) => (
          <View 
            key={item.id} 
            style={[
              index % numColumns === 0 && styles.firstColumnItem
            ]}
          >
            <ProductCard product={item} width={itemWidth} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstColumnItem: {
    marginLeft: 0,
  },
  productImage: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: '500',
    textAlign: 'center',
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 