import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedCategory: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;

// Selectors
export const selectCategory = (state: { category: CategoryState }) => state.category.selectedCategory;

export default categorySlice.reducer; 