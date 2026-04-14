import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Animation')}
        style={styles.glassBtn}
      >
        <Text style={styles.text}>Show Magic ✨</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        style={[styles.glassBtn, styles.blueBorder]}
      >
        <Text style={[styles.text, styles.blueText]}>Show Cool Stuff 🚀</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },

  glassBtn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginBottom: 16,

    backgroundColor: 'rgba(15,23,42,0.6)', // better on Android
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',

    elevation: 8, // Android shadow
  },

  text: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '500',
  },

  blueBorder: {
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(56,189,248,0.08)',
  },

  blueText: {
    color: '#38bdf8',
  },
});
