import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Img from '../Assets/topup.png';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import Button from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavBar from '../components/NavBar';
const Rewards = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headertitle}>Rewards</Text>
        </View>
        <View style={styles.cardContainer}>
          <Image source={Img} style={styles.imageStyles} />
          <Text
            style={
              styles.text
            }>{`Get awesome rewards\nand discounts from\nNexPay`}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>
            Currently! No rewards or discounts available..
          </Text>
        </View>
      </SafeAreaView>
      <NavBar />
    </>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 28,
  },
  header: {
    flexDirection: 'row',
    margin: 25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headertitle: {
    color: COLORS.black,

    width: 150,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: '35%',
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    backgroundColor: COLORS.purple,
    marginTop: 30,
    borderRadius: 12,
    padding: 30,
  },
  imageStyles: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: -1,
  },
  text: {
    position: 'absolute',
    color: COLORS.low_grey,
    fontSize: 20,
    left: 100,
    top: 30,
    lineHeight: 30,
    fontWeight: '600',
  },
  content: {
    marginTop: 70,
  },
  contentText: {
    color: COLORS.low_grey,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
  },
});
