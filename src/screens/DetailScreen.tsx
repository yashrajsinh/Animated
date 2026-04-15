import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import React from 'react';
//images URL
import { ImageData } from '../data/ImageData';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {};
const { width } = Dimensions.get('screen');
const _itemSize = width * 0.25;
const _spacing = 12;
function Carousel({ imageUri, index }: { imageUri: string; index: number }) {
  return (
    <View>
      <Image
        source={{ uri: imageUri }}
        style={{
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
        }}
      />
    </View>
  );
}

const DetailScreen = (props: Props) => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x; // show value of X on scroll
  });
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Animated.FlatList
        style={{ flexGrow: 0 }}
        data={ImageData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return <Carousel imageUri={item} index={index} />;
        }}
        //scrollling
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} //16 ms
      />
    </View>
  );
};

export default DetailScreen;
