import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StarRatingProps {
  rating: {
    rate: number;
    count: number;
  };
  size?: number;
  showCount?: boolean;
}

export default function StarRating({ rating, size = 12, showCount = true }: StarRatingProps) {
  if (!rating) return null;
  
  const stars = [];
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FontAwesome key={i} name="star" size={size} color="#FFD700" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FontAwesome key={i} name="star-half-o" size={size} color="#FFD700" />);
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={size} color="#FFD700" />);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {stars}
      </View>
      {showCount && (
        <Text style={[styles.ratingCount, { fontSize: size - 2 }]}>
          ({rating.count})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingCount: {
    color: '#666',
  },
}); 