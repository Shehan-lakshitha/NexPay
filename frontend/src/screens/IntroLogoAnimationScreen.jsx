import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import COLORS from '../constants/colors';
import LottieView from 'lottie-react-native';

const IntroLogoAnimationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View>
            <LottieView
              style={styles.logoAnimation}
              source={require('../assets/LogoAnimation.json')}
              autoPlay
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  logoAnimation: {
    flex: 1,
    width: 400,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingBottom: 20,
  },
});

export default IntroLogoAnimationScreen;
