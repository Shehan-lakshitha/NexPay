import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Img from '../Assets/billpayment.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavBar from '../components/NavBar';

const BillPayments = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData} = route.params;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headertitle}>Bill Payments</Text>
        </View>

        <View style={styles.cardContainer}>
          <Image source={Img} style={styles.imageStyles} />
          <Text
            style={styles.text}>{`Pay your utility bills\nwith NexPay`}</Text>
        </View>

        <View style={styles.utilityContainer}>
          <View style={styles.containerTop}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ElectricityPayment', {userData})
              }>
              <View style={styles.box}>
                <Icon name="bolt" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="wifi" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Internet</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="tv" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Television</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="tint" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Water</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBottom}>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="shield" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Insurance</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="balance-scale" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Tax</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="bus" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Transport</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Icon name="stethoscope" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.textUt}>Medical</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <NavBar />
    </>
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
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: '30%',
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
  box: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  utilityContainer: {
    marginTop: 50,
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  textUt: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
    color: COLORS.black,
  },
});
