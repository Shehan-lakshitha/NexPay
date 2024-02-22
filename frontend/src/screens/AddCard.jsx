import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Easing,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Button from '../components/Button';

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.register}>Add New Card</Text>
      <TouchableOpacity style={styles.addbtn} onPress={handleFlip}>
        <Icon name="plus" size={12} color={COLORS.white} />
        <Text style={styles.addbtntext}>Flip Card</Text>
      </TouchableOpacity>

      {/* Front side */}
      <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
        <View style={styles.cardNameDate}>
          <Text style={styles.holderName}>
            {holderName || "Card Holder's Name"}
          </Text>
          <Text style={styles.expiry}>{expiryDate || 'MM/YY'}</Text>
        </View>
        <Text style={styles.cardNumber}>
          {cardNumber || '**** **** **** ****'}
        </Text>
      </Animated.View>

      {/* Back side */}
      <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.cvv}>{cvv || 'CVV'}</Text>
      </Animated.View>

      <View>
        <Text style={styles.name}>Card holder's Name</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={name => {
              setHolderName(name);
            }}
            placeholder=""
            style={{width: '100%'}}
          />
        </View>
      </View>

      <View>
        <Text style={styles.name}>Card Number</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={number => {
              setCardNumber(number);
            }}
            placeholder=""
            style={{width: '100%'}}
          />
        </View>
      </View>

      <View style={styles.expCvv}>
        <View>
          <Text style={styles.name}>Expire Date</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={expDate => {
                setExpiryDate(expDate);
              }}
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
              onPressIn={handleFlip}
              placeholder=""
              style={{width: '100%'}}
            />
          </View>
        </View>
      </View>

      <Button style={styles.savebtn} title="Save my card" filled />
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
    height: 230,
    width: '100%',
    backgroundColor: COLORS.primary,
    marginTop: 80,
    position: 'absolute',
    borderRadius: 20,
  },
  cardBack: {
    height: 230,
    width: '100%',
    backgroundColor: COLORS.primary,
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
    marginEnd: 30,
  },
  cvv: {
    color: COLORS.white,
    fontSize: 16,
    position: 'absolute',
    right: 0,
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
});
