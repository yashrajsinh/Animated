import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

//data
import { ImageData } from '../data/ImageData';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
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

const DetailScreen = ({ navigation }: { navigation: any }) => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x;
    console.log(scrollX.value);
  });
  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={{ flexGrow: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ImageData}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return <Carousel imageUri={item} index={index} />;
        }}
        //scrolling
        onScroll={onScroll}
        scrollEventThrottle={16} //60 FPS (16 MS)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default DetailScreen;
