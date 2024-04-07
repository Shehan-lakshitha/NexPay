import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Image} from 'react-native';
import {TextInput} from 'react-native';
import Button from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import Img from '../Assets/img1.png';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import {URL} from '../constants/URL';
import axios from 'axios';
import NavBar from '../components/NavBar';
const Balance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState(null);
  const {userData} = route.params;

  const handleAddCredit = () => {
    navigation.navigate('AddCredit', {userData});
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.post(`${URL}/api/balance`, {
          id: userData._id,
        });
        //console.log(balance)

        if (response.data.success === true) {
          setBalance(response.data.balance);
        } else if (response.data.success === false) {
          setBalance(response.data.balance);
        }
        if (response.data.success === false) {
          setBalance(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBalance();
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post(`${URL}/api/paymenthistory`, {
          id: userData._id,
        });
        if (response) {
          setHistory(response.data.payments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, [balance]);

  const renderItem = ({item}) => {
    const date = new Date(item.created * 1000);

    // Format the date and time
    const formattedDateTime = date.toLocaleString();
    return (
      <View>
        <View style={styles.tile}>
          {item.type === 'payment' ? (
            <Text style={styles.renderTextRed}>{item.type}</Text>
          ) : (
            <Text style={styles.renderTextGreen}>{item.type}</Text>
          )}
          <Text style={styles.renderText}>{`Rs.${item.amount}.00`}</Text>
          <Text style={styles.renderText}>{formattedDateTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headertitle}>Balance</Text>
        </View>
        <View style={styles.addCard}>
          <Image source={Img} style={styles.imageStyles} />
          {/* <View style={styles.plus}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Wallet', {userData})}>
              <FontAwesomeIcon
                name="circle-plus"
                size={30}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View> */}
          <Text style={styles.cardtext}>{`Rs.${balance}.00`}</Text>
          <Text style={styles.cardsubtext}>{'Available balance'}</Text>
        </View>
        <View style={styles.creditContainer}>
          <TouchableOpacity style={styles.credit} onPress={handleAddCredit}>
            <Text style={styles.creditText}>Add Credit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentTransactionsContainer}>
          <Text style={styles.recentTransactions}>Recent Transactions</Text>
          <View style={styles.line}></View>
          <FlatList
            data={history?.slice(-8)}
            renderItem={renderItem}
            keyExtractor={item => item.paymentIntentId}
          />
        </View>
      </SafeAreaView>
      <NavBar />
    </>
  );
};

export default Balance;

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
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  cardtext: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: '600',
  },
  cardsubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.white,
  },

  content: {
    marginTop: 70,
  },
  contentText: {
    color: COLORS.low_grey,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
  },
  addCard: {
    position: 'relative',
    width: '100%',
    height: 150,
    backgroundColor: COLORS.purple,
    marginTop: 30,
    borderRadius: 12,
    padding: 30,
  },
  creditContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  credit: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    width: 100,
    backgroundColor: COLORS.purple,
    marginTop: 25,
  },
  creditText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  recentTransactions: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    marginTop: 40,
  },
  line: {
    height: 3,
    width: '100%',
    backgroundColor: COLORS.purple,
    marginTop: 5,
  },
  transText: {
    alignSelf: 'center',
    marginTop: 20,
  },
  recentTransactionsContainer: {
    height: 400,
  },
  tile: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  renderText: {
    fontWeight: '600',
  },
  renderTextGreen: {
    fontWeight: '600',
    color: COLORS.green,
  },
  renderTextRed: {
    fontWeight: '600',
    color: COLORS.warning,
  },
});
