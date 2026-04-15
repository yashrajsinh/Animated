import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
//images URL
import { ImageData } from '../data/ImageData';
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

type Props = {};
const { width } = Dimensions.get('screen');
const _itemSize = width * 0.25;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

function Carousel({
  imageUri,
  index,
  scrollX,
}: {
  imageUri: string;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(
        scrollX.value,
        [index - 1, index, index + 1],
        ['transparent', 'white', 'transparent'],
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
        },
        stylez,
      ]}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          flex: 1,
          borderRadius: _itemSize / 2,
        }}
      />
    </Animated.View>
  );
}

const DetailScreen = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / _itemTotalSize; // show value of X on scroll
    //round up index
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
          key={`imgae-${activeIndex}`}
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
        renderItem={({ item, index }) => {
          return <Carousel imageUri={item} index={index} scrollX={scrollX} />;
        }}
        //scrollling
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} //16 ms
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        snapToInterval={_itemTotalSize}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default DetailScreen;
