// React Native screen for OTP verification
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';
import { URL } from '../constants/URL';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;
  const [id,setId]=useState("")
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/details/${email}`);
        
        setId(response.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[email])
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={COLORS.black} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require('../Assets/2FAicon.png')} style={styles.img} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            We’re now using this app for 2-step verification
          </Text>
          <Text style={styles.description}>
            You can now verify your identity with this app instead of by text.
            It’s more secure, and works over wifi when you don’t have signal.
          </Text>
          <Text style={styles.description}>
            Next time we need to confirm it’s really you, we’ll send a
            notification to this device..
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity >
          <Button style={styles.button} title={'Continue'} filled onpress={()=>navigation.navigate('Home',{email,id})} />
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

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingBottom: 20,
  },

  arrowContainer: {
    position: 'absolute',
    top: 45,
    left: 38,
    zIndex: 1,
  },

  imgContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  img: {
    resizeMode: 'contain',
    width: 120,
  },

  textContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    marginHorizontal: 24,
    paddingTop: 48,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
  },

  button: {
    fontSize: 18,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 58,
  },
});

export default GetStartedScreen;
