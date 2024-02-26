import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Button from '../components/Button';
import visa from '../Assets/Visa_Logo.png';
import masterCard from '../Assets/MasterCard.png';
import cardFront from '../Assets/cardFront.png';
import cardBack from '../Assets/cardBack.png';

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const navigation = useNavigation();

  const spin = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: 500}),
        },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: 500}),
        },
      ],
    };
  });

  const handleFlip = () => {
    spin.value = spin.value ? 0 : 1;
  };

  const formattedCardNumber = number => {
    let formattedInput = number.replace(/\D/g, '');

    formattedInput = formattedInput.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedInput);
    checkCardType(formattedInput);
  };

  const formattedExpiryDate = date => {
    let formattedInput = date.replace(/\D/g, '');

    formattedInput = formattedInput.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
    setExpiryDate(formattedInput);
  };

  const checkCardType = number => {
    const firstNumber = number.charAt(0);
    if (firstNumber === '4') {
      setCardType('visa');
    } else if (firstNumber === '5') {
      setCardType('mastercard');
    } else {
      setCardType('');
    }
  };

  const handleSubmit = () => {
    console.log(
      'Card Number: ' + cardNumber,
      '\nCard holders name: ' + holderName,
      '\nExpire Date: ' + expiryDate,
      '\nCVV: ' + cvv,
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.register}>Add New Card</Text>

      {/* Front side */}
      <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
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
          {cardType === 'visa' && (
            <Image style={styles.visaLogo} source={visa} />
          )}
          {cardType === 'mastercard' && (
            <Image style={styles.mastercardLogo} source={masterCard} />
          )}
        </ImageBackground>
      </Animated.View>

      {/* Back side */}
      <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
        <ImageBackground source={cardBack} style={styles.cardFrontImg}>
          <Text style={styles.cvv}>{cvv || 'CVV'}</Text>
        </ImageBackground>
      </Animated.View>

      <View>
        <Text style={styles.name}>Card holder's Name</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={name => {
              setHolderName(name);
            }}
            placeholder=""
          />
        </View>
      </View>

      <View>
        <Text style={styles.name}>Card Number</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={number => {
              formattedCardNumber(number);
            }}
            maxLength={16}
            placeholder=""
          />
        </View>
      </View>

      <View style={styles.expCvv}>
        <View>
          <Text style={styles.name}>Expire Date</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={expDate => {
                formattedExpiryDate(expDate);
              }}
              maxLength={4}
              placeholder=""
              style={{width: '100%'}}
            />
          </View>
        </View>

        <View style={styles.cvvI}>
          <Text style={styles.name}>CVV</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={cvv => {
                setCvv(cvv);
              }}
              maxLength={3}
              onFocus={handleFlip}
              onBlur={handleFlip}
              placeholder=""
              style={{width: '100%'}}
            />
          </View>
        </View>
      </View>

      <Button
        style={styles.savebtn}
        onpress={handleSubmit}
        title="Save my card"
        filled
      />
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  cardFront: {
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
  cardBack: {
    height: 230,
    width: '100%',
    marginTop: 55,
    borderRadius: 20,
    backfaceVisibility: 'hidden',
  },
  register: {
    marginTop: -28,
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.black,
    alignSelf: 'center',
  },
  addbtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    width: 90,
    padding: 10,
    borderRadius: 30,
    marginTop: 40,
  },
  addbtntext: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
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
  cvv: {
    color: COLORS.black,
    fontSize: 16,
    position: 'absolute',
    right: 58,
    marginTop: 100,
    marginEnd: 20,
  },
  name: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    marginTop: 20,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expCvv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 183,
  },
  cvvI: {
    marginStart: 25,
  },
  savebtn: {
    top: 70,
  },
  visaLogo: {
    position: 'absolute',
    bottom: 40,
    left: -10,
    height: 20,
    resizeMode: 'contain',
  },
  mastercardLogo: {
    position: 'absolute',
    bottom: 40,
    right: 25,
    height: 50,
    resizeMode: 'contain',
  },
});
