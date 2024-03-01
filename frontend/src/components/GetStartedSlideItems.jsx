/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import COLORS from '../constants/colors';
import Slides from './Slides';

const GetStartedSlideItems = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.imgURL}
        style={[styles.img, {width, resizeMode: 'contain'}]}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
  },

  img: {
    flex: 0.5,
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GetStartedSlideItems;
