// React Native screen for OTP verification
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';
import GetStartedSlideItems from '../components/GetStartedSlideItems';
import Slides from '../components/Slides';

const GetStartedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../Assets/Logo.png')} />
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={Slides}
          renderItem={({item}) => <GetStartedSlideItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Button style={styles.button} title={'Register'} filled />
        </TouchableOpacity>
        <TouchableOpacity>
          <Button style={styles.button} title={'Login'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: 25,
    objectFit: 'scale-down',
  },

  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 24,
    // backgroundColor: 'black',
  },

  contentContainer: {
    flex: 9,
    // backgroundColor: 'red',
  },

  button: {
    fontSize: 18,
    marginLeft: 24,
    marginRight: 24,
  },

  buttonContainer: {
    flex: 2,
    gap: 8,
    marginBottom: 24,
    // backgroundColor: 'blue',
  },
});

export default GetStartedScreen;
