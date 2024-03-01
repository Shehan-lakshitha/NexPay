import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Img from '../Assets/img1.png';
import NavBar from '../components/NavBar';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {URL} from '../constants/URL';

export default function Home() {
  const route = useRoute();
  const {email} = route.params;
  const [currentDate, setCurrentDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  navigation = useNavigation();

  useEffect(() => {
    let date = moment().format('llll');
    setCurrentDate(date);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/home/${email}`);
        setUserName(`${response.data.firstName} ${response.data.lastName}`);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [email]);

  return (
    <SafeAreaView style={[{flex: 1}, {backgroundColor}]}>
      <View style={styles.Container}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.Date}>{`Today ${currentDate}`}</Text>
            <Text style={styles.name}>{userName}</Text>
          </View>
          <View style={styles.headerBtns}>
            <TouchableOpacity style={styles.headerbtn}>
              <FontAwesomeIcon
                name="headset"
                size={18}
                color={COLORS.black}
                style={{textAlign: 'center'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerbtn}>
              <Icon
                name="bell"
                size={18}
                color={COLORS.black}
                style={{textAlign: 'center'}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addCard}>
          <Image source={Img} style={styles.imageStyles} />
          <View style={styles.plus}>
            <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
              <FontAwesomeIcon
                name="circle-plus"
                size={30}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardtext}>Add Your Card</Text>
          <Text style={styles.cardsubtext}>
            Link your credit/debit cart to make transactions.
          </Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.tab}>
              <View style={[styles.tabCircle, {backgroundColor}]}>
                <FontAwesomeIcon
                  name="credit-card"
                  size={20}
                  color={COLORS.purple}
                />
              </View>
              <Text style={styles.tabtext}>Add Credit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.tab}>
              <View style={[styles.tabCircle, {backgroundColor}]}>
                <FontAwesomeIcon
                  name="arrow-right-arrow-left"
                  size={20}
                  color={COLORS.purple}
                />
              </View>
              <Text style={styles.tabtext}>Transfer</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.tab}>
              <View style={[styles.tabCircle, {backgroundColor}]}>
                <Icon name="history" size={20} color={COLORS.purple} />
              </View>
              <Text style={styles.tabtext}>History</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Services</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.serviceTabs}>
            <View style={styles.serviceTabContainer}>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.serviceTab}>
                  <FontAwesomeIcon
                    name="money-bill-1"
                    size={25}
                    color={COLORS.purple}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.serviceText}>Bill Payments</Text>
            </View>

            <View style={styles.serviceTabContainer}>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.serviceTab}>
                  <FontAwesomeIcon
                    name="mobile-screen"
                    size={25}
                    color={COLORS.purple}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.serviceText}>{'Mobile\n top up'}</Text>
            </View>

            <View style={styles.serviceTabContainer}>
              <TouchableOpacity style={styles.serviceBtn}>
                <View style={styles.serviceTab}>
                  <MaterialIcon
                    name="wallet-giftcard"
                    size={25}
                    color={COLORS.purple}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.serviceText}>Rewards</Text>
            </View>

            <View style={styles.serviceTabContainer}>
              <TouchableOpacity style={styles.serviceBtn}>
                <View style={styles.serviceTab}>
                  <FontAwesomeIcon
                    name="sack-dollar"
                    size={25}
                    color={COLORS.purple}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.serviceText}>Check balance</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Recent transactions</Text>
            <View style={styles.line} />
            <View style={styles.transactions}>
              <FlatList />
            </View>
          </View>
        </View>
      </View>
      <NavBar navigation={navigation} data={userData} />
    </SafeAreaView>
  );
}
