


import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from "axios"
 const AccountCreated = ({navigation}) => {
  const route = useRoute();
  const {email} = route.params;
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://192.168.8.159:5000/api/generate',
        {email: email,},
      );
      console.log(response.data.message)
      if(response.data.success==true){
        navigation.navigate('OTPVerificationScreen')
      }
      
      
      
    } catch (error) {
      console.error(error);
      
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Icon name="check" size={100} color={COLORS.green} />
        <Text style={styles.heading}>Account Created</Text>
        <Text style={styles.text}>Amila, Your account has being created</Text>
      </View>

      <Button
        style={styles.btn}
        title="Continue"
        filled
        onpress={handleSubmit}
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50%',
  },
  heading: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  btn: {
    marginTop: 300,
    marginHorizontal: 15,
  },
});

export default AccountCreated;