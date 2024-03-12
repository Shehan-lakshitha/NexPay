import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import visa from '../Assets/Visa_Logo.png';
import masterCard from '../Assets/MasterCard.png';
import {RadioButton} from 'react-native-paper';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {URL} from '../constants/URL';

const AddCredit = () => {
  const cardNum = '4242'
  const [cardNumber, setCardNumber] = useState('****')
  const [expiryDate, setExpiryDate] = useState('MM/YY');
  const [cardSelect, setCardSelect] = useState('');
  const [fold, setFold] = useState(false);
  const [amount, setAmount] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const {userData} = route.params;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${URL}/api/carddetails`, {
          id: userData._id,
        });
        if (response) {
          setCardNumber(response?.data.cardNumber);

          const expiryDateFromAPI = response?.data.expireData;
          const [month, year] = expiryDateFromAPI.split('/');
          const formattedExpiry = `${month}/${year.slice(-2)}`;
          setExpiryDate(formattedExpiry);

          
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Error in fetching card details',
          text2: 'Please try again',
        })
        return null;
      }
    };
    fetchDetails();
  });

  const handleNext = () => {
    if(cardSelect === ''){
        Toast.show({
            type: 'error',
            text1: 'Card Not Selected',
            text2: 'Please select a card to continue',
        })
    }else{
      
            navigation.navigate('PinVerify', {data:userData,amount:amount});
         
    }
  }
 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.register}>Add Credit</Text>

      <View>
        <TouchableOpacity style={styles.cardContainer}>
          <View style={styles.cardContent}>
            {cardNum.charAt(0) === '4' ? (
              <Image source={visa} style={styles.visaLogo} />
            ) : cardNum.charAt(0) === '5' ? (
              <Image source={masterCard} style={styles.masterCardLogo} />
            ) : null}
            <View style={styles.cardText}>
              <Text style={styles.txtNum}>Card ending {cardNumber}</Text>
              <Text style={styles.txtExp}>Expiry {expiryDate}</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value= {cardNumber}
                status={cardSelect === cardNumber ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCardSelect(cardNumber);
                  setFold(true);
                }}
              />
            </View>
          </View>

              { fold && 
              <View style={styles.amountContent}>
              <Text style={styles.amountTxt}>Enter Amount</Text>
              <TextInput value={amount} keyboardType='numeric' style={styles.input}
              onChangeText={amount => setAmount(amount)}/>
            </View> 
            }
          
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addCard} onPress={()=> navigation.navigate('AddCard',{userData})}>
        <Icon name="plus" size={12} color={COLORS.white} />
        <Text style={styles.addCardText}>Add Card</Text>
      </TouchableOpacity>

      <Button 
        style={styles.btnnext}
        title="Next" 
        filled 
        onpress={handleNext}
      />
    </View>
  );
};

export default AddCredit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  register: {
    marginTop: -28,
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.black,
    alignSelf: 'center',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: COLORS.primary,
    marginTop: 20,
    padding: 10,
    opacity: 0.7,
    borderRadius: 10,
  },
  visaLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardText: {
    marginLeft: 10,
  },
  txtNum: {
    color: COLORS.black,
    fontSize: 16,
  },
  txtExp: {
    fontSize: 14,
  },
  radioBtn: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
  addCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: 90,
    padding: 8,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  addCardText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  btnnext: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
  },
  amountContent: {
    marginTop: 20,
  },
  amountTxt: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500',
  },
  input :{
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    textDecorationColor: COLORS.black,
  }
});
