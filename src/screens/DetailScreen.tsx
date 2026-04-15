import { View, Image, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ImageData } from '../data/ImageData';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import Carousel from '../components/Carousel';

const { width } = Dimensions.get('screen');
const _itemSize = width * 0.25;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

const DetailScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / _itemTotalSize;

    const newActiveIndex = Math.round(scrollX.value);
    if (activeIndex !== newActiveIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#000' }}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.Image
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          key={`image-${activeIndex}`}
          style={{ flex: 1 }}
          source={{ uri: ImageData[activeIndex] }}
        />
      </View>

      <Animated.FlatList
        style={{ flexGrow: 0, height: _itemSize * 2 }}
        data={ImageData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <Carousel imageUri={item} index={index} scrollX={scrollX} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        snapToInterval={_itemTotalSize}
        decelerationRate="fast"
      />
    </View>
  );
};

export default DetailScreen;
