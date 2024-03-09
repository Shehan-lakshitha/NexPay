import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import cardFront from '../Assets/cardFront.png';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Wallet = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [addCard, setAddCard] = useState(true);
  const navigation = useNavigation();

  const handleAddCredit = () => {
    if(addCard){
      navigation.navigate('AddCredit');
    }else{
      Toast.show({
        type: 'error',
        text1: 'Card Not Added',
        text2: 'Please add a card to add credit',
      })
    }

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.register}>Wallet</Text>

      <TouchableOpacity
        style={styles.headerbtn}
        onPress={() => navigation.navigate('AddCard')}>
        <Icon name="plus" size={16} color={COLORS.white} />
        <Text style={styles.addCardbtn}>Add Card</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <ImageBackground source={cardFront} style={styles.cardFrontImg}>
          <View style={styles.cardNameDate}>
            <Text style={styles.holderName}>
              {holderName || "Card Holder's Name"}
            </Text>
            <Text style={styles.expiry}>{expiryDate || 'MM/YY'}</Text>
          </View>
          <Text style={styles.cardNumber}>
            {cardNumber || '**** **** **** ****'}
          </Text>
        </ImageBackground>

        <TouchableOpacity style={styles.addCredit} onPress={() => handleAddCredit()}>
          <Icon name="plus" size={12} color={COLORS.white} />
          <Text style={styles.addCreditText}>Add Credit</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.transfers}>Quick Transfers</Text>
          <View style={styles.line}></View>
          <View style={styles.boxStyle}>
            <TouchableOpacity style={styles.box}>
              <Icon name="plus" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <Text>Users</Text>
          </View>
        </View>

        <View>
          <Text style={styles.recentTransactions}>Recent Transactions</Text>
          <View style={styles.line}></View>
          <Text style={styles.transText}>No Recent Transactions</Text>
        </View>
      </View>
    </View>
  );
};

export default Wallet;

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
  headerbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    justifyContent: 'space-between',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    width: 100,
    padding: 8,
    borderRadius: 30,
  },
  addCardbtn: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    width: '100%',
    marginTop: 80,
    position: 'absolute',
    borderRadius: 20,
  },
  cardFrontImg: {
    width: '100%',
    height: 245,
    right: 0,
    marginStart: 8,
  },
  holderName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
  cardNumber: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '500',
    marginTop: 10,
    marginStart: 20,
  },
  cardNameDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  expiry: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    marginEnd: 30,
  },
  transfers: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  line: {
    height: 3,
    width: '100%',
    backgroundColor: COLORS.purple,
    marginTop: 5,
  },
  boxStyle: {
    width: 60,
    height: 60,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: COLORS.purple,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTransactions: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    marginTop: 40,
  },
  transText: {
    alignSelf: 'center',
    marginTop: 20,
  },
  addCredit: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: 90,
    padding: 8,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  addCreditText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  }
});
