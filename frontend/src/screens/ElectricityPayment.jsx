import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Img from '../Assets/billpayment.png';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';


const BillPayments = () => {

    const navigation  = useNavigation();
    const route = useRoute();
    const {userData} = route.params

    const [acNo,setacNo] = useState('');
    const [amount,setAmount] = useState('');

    const handleSubmit = () => {

        console.log(amount);
        console.log(acNo);
        if(acNo === '' || amount === ''){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'All fields are required'
            });
        } else {
          navigation.navigate('Verify',{data:userData,amount:amount})
            console.log('Submitted')
        }
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Electricity Bill Payment</Text>
      </View>
      <View style={styles.cardContainer}>
        <Image source={Img} style={styles.imageStyles} />
        <Text style={styles.text}>{`Pay your Electrity bills\ninstantly`}</Text>
      </View>

      <View style={styles.Content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Electricity A/C no.</Text>
          <View style={styles.input}>
            <TextInput style={{width: '100%'}} 
            onChangeText={(text) => setacNo(text)}
            value={acNo}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.input}>
            <TextInput style={{width: '100%'}} 
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            value={amount}
            />
          </View>
        </View>
      </View>

      <Button
        style={styles.loginBtn}
        title="Pay"
        filled
        onpress={handleSubmit}
        
      />
    </SafeAreaView>
  );
};

export default BillPayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headertitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: '15%',
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
    right: 5,
    bottom: 0,
    zIndex: -1,
  },
  text: {
    position: 'absolute',
    color: COLORS.white,
    fontSize: 22,
    left: 30,
    top: 50,
    lineHeight: 30,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 25,
  },
  label: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBtn: {
    width: '100%',
    marginTop: 240,
  },
});
