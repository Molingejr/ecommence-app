import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const foodImages = [
  'https://picsum.photos/id/292/800/400',
  'https://picsum.photos/id/312/800/400',
  'https://picsum.photos/id/488/800/400',
  'https://picsum.photos/id/490/800/400',
  'https://picsum.photos/id/1080/800/400',
];

export default function ImageCarousel() {
  return (
    <Carousel
      loop
      width={screenWidth}
      height={250}
      autoPlay={true}
      data={foodImages}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View style={styles.slide}>
          <Image source={{ uri: item }} style={styles.image} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
}); 