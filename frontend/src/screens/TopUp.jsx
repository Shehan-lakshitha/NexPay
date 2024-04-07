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
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';
const TopUp = () => {
  const route = useRoute();
  const {number, data} = route.params;
  const [amount, setAmount] = useState(null);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (amount) {
      navigation.navigate('Verify', {data, amount});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter the amount to transfer',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Mobile Top-up</Text>
      </View>
      <View style={styles.cardContainer}>
        <Image source={Img} style={styles.imageStyles} />
        <Text
          style={
            styles.text
          }>{`Send credits to your\n favourite with NexPay`}</Text>
      </View>
      <Text style={styles.textNumber}>
        Add amount to send credit to <Text style={styles.number}>{number}</Text>
      </Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={text => {
                setAmount(text);
              }}
              placeholder=""
              keyboardType="numeric"
              style={{width: '100%'}}
            />
          </View>
        </View>
      </View>
      <Button style={styles.nextBtn} title="Send" filled onpress={handleSubmit} />
    </SafeAreaView>
  );
};

export default TopUp;

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
    left: 90,
    top: 50,
    lineHeight: 30,
    fontWeight: '600',
  },
  form: {
    marginTop: 37,
  },
  inputContainer: {
    marginBottom: 25,
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
  nextBtn: {
    marginTop: 240,
    marginBottom: 20,
  },
  textNumber: {
    marginTop: 25,
    fontSize: 15,
    textAlign: 'center',
    color: COLORS.black,
  },
  number: {
    color: 'blue',
  },
});
