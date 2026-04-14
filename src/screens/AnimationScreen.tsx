import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const AnimationScreen = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  const [isVisible, setIsVisible] = useState(true);

  const handlePress = ({ navigation }: any) => {
    Animated.timing(opacity, {
      toValue: isVisible ? 0 : 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    setIsVisible(!isVisible);
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [400, 0],
                }),
              },
            ],
          },
        ]}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text> {isVisible ? 'Show' : 'Hide'} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
  },
});

export default AnimationScreen;
