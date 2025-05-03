import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from './types';

const CART_STORAGE_KEY = '@cart_items';

export const saveCartItems = async (items: CartItem[]) => {
  try {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(CART_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving cart items:', error);
  }
};

export const loadCartItems = async (): Promise<CartItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading cart items:', error);
    return [];
  }
}; 