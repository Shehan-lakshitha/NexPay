import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Logo from '../Assets/Logo.png';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PinScreen = () => {
  const [pin, setPin] = useState('');
  const [isPinComplete, setIsPinComplete] = useState(false);
  const navigation = useNavigation();

  const handlePinPress = async (digit) => {
    if(isPinComplete) return;

    const newPin = pin + digit;
    setPin(newPin);

    if(newPin.length === 4){
      setIsPinComplete(true);
      if(newPin === '4242'){
        const email = await AsyncStorage.getItem('email');
        console.log(email);
        navigation.navigate('Home',{email:email});
      }
    }
  }

  const handleDelete = () => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
    setIsPinComplete(false);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.heading}>Enter pin</Text>
        </View>

        <View style={styles.pinContainer}>
          {Array(4)
            .fill()
            .map((_, i) => (
              <View
                key={i}
                style={[styles.digit, pin.length >= i + 1 && styles.fillDigit]}
              />
            ))}
        </View>

        <View style={styles.keyboard}>
          {Array(9)
            .fill()
            .map((_, i) => (
              <TouchableOpacity key={i} style={styles.key} onPress={()=> handlePinPress(i+1)}>
                <Text style={styles.keyText}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          <TouchableOpacity style={styles.key} onPress={()=> handlePinPress(0)}>
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete} onPress={() => handleDelete()}>
            <Icon style={styles.deleteIcon} name="chevron-left" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
    //alignItems: 'center',
  },
  logo: {
    width: 100,
    resizeMode: 'contain',
    marginTop: -80,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -80,
    color: COLORS.black,
  },
  pinContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  digit: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
    marginTop: 20,
    margin: 5,
  },
  fillDigit: {
    backgroundColor: COLORS.primary,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  key: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderBottomWidth: 1,
    borderColor: '#A8A8A8',
  },
  keyText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  delete : {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -100,
    margin: 5,
  },
});
