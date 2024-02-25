import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Img from '../assets/img1.png'
import NavBar from '../components/NavBar';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';



export default function Home() {
  const route = useRoute();
  const {email} = route.params;
  const [currentDate, setCurrentDate] = useState('');
  const [userName, setUserName] = useState('');
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';

  useEffect(() => {
    let date = moment().format('llll');
    setCurrentDate(date);
    const fetchData=async()=>{
      try {
        const response=await axios.get(`http://192.168.43.199:5000/api/home/${email}`)
        
          setUserName(`${response.data.firstName} ${response.data.lastName}`)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [email]);

  return (
    <SafeAreaView style={[{flex:1},{backgroundColor}]} >
      <View style={styles.Container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.Date}>{`Today ${currentDate}`}</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
        <View style={styles.headerBtns}>
          <TouchableOpacity style={styles.headerbtn}>
            <FontAwesomeIcon name="headset" size={18} color={COLORS.black} style={{textAlign:'center'}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerbtn}>
            <Icon name="bell" size={18} color={COLORS.black} style={{textAlign:'center'}}/>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.addCard}>
        <Image source={Img} style={styles.imageStyles}/>
        <View style={styles.plus}>
          <TouchableOpacity onPress={()=>{}}>
          <FontAwesomeIcon name='circle-plus' size={30} color={COLORS.white}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.cardtext}>Add Your Card</Text>
        <Text style={styles.cardsubtext}>Link your credit/debit cart to make transactions.</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.tab}>
          <View style={[styles.tabCircle,{backgroundColor}]}>
          <FontAwesomeIcon name="credit-card" size={20} color={COLORS.purple} />
          </View>
          <Text style={styles.tabtext}>Add Credit</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.tab}>
        <View style={[styles.tabCircle,{backgroundColor}]}>
        <FontAwesomeIcon name="arrow-right-arrow-left" size={20} color={COLORS.purple} />
        </View>
          <Text style={styles.tabtext}>Transfer</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.tab}>
        <View style={[styles.tabCircle,{backgroundColor}]}>
        <Icon name="history" size={20} color={COLORS.purple} />
        </View>
          <Text style={styles.tabtext}>History</Text>
        </View>
        </TouchableOpacity>
      </View>

      <View style={styles.serviceContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Services</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.serviceTabs}>
        <View style={styles.serviceTabContainer}>

        <TouchableOpacity onPress={()=>{}}>
          <View style={styles.serviceTab}>
            <FontAwesomeIcon name="money-bill-1" size={25} color={COLORS.purple} />
           </View>
          </TouchableOpacity>
          <Text style={styles.serviceText}>Bill Payments</Text>
          </View>

          <View style={styles.serviceTabContainer}>
          <TouchableOpacity onPress={()=>{}}>
          <View style={styles.serviceTab}>
            <FontAwesomeIcon name="mobile-screen" size={25} color={COLORS.purple} />
            </View>
          </TouchableOpacity>
          <Text style={styles.serviceText}>{`Mobile\n top up`}</Text>
          </View>

          <View style={styles.serviceTabContainer}>
          <TouchableOpacity style={styles.serviceBtn}>
          <View style={styles.serviceTab}>
            <MaterialIcon name="wallet-giftcard" size={25} color={COLORS.purple} />
          </View>
          </TouchableOpacity>
          <Text style={styles.serviceText}>Rewards</Text>
          </View>

          <View style={styles.serviceTabContainer}>
          <TouchableOpacity style={styles.serviceBtn}>
          <View style={styles.serviceTab}>
            <FontAwesomeIcon name="sack-dollar" size={25} color={COLORS.purple} /> 
          </View>
          </TouchableOpacity>
          <Text style={styles.serviceText}>Check balance</Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
      <View style={styles.title}>
          <Text style={styles.titleText}>Recent transactions</Text>
          <View style={styles.line}></View>
          <View style={styles.transactions}>
           <FlatList/>
          </View>
        </View>
      </View>
      </View>
      <NavBar/>
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    
    margin: 25,
    marginBottom:0,
    position:'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  headerTitleContainer: {
    flexDirection: 'column',
  },
  Date: {
    color: COLORS.black,
    fontSize: 11,
  },
  name: {
    color: COLORS.black,
    fontSize: 24,
  },
  headerBtns: {
    flexDirection: 'row',
    gap:10
  },
  headerbtn:{
    
    padding:3,
    borderWidth:1,
    borderRadius:50,
    width:30,
    height:30
  },
  addCard:{
    position:'relative',
    width:'100%',
    height:150,
    backgroundColor:COLORS.purple,
    marginTop:30,
    borderRadius:12,
    padding:30
  },
  cardtext:{
    fontSize:30,
    color:COLORS.white,
    fontWeight:'600'
  },
  cardsubtext:{
    fontSize:14,
    fontWeight:'400',
    color:COLORS.white
  },
  plus:{
    position:'absolute',
    right:10,
    top:10
  },
  imageStyles:{
    position:'absolute',
    right:0,
    bottom:0,
    zIndex:-1
  },
  tabContainer:{
    
    marginTop:40,
    gap:5,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  tab:{
    position:'relative',
    height:70,
    width:100,
    backgroundColor:COLORS.purple,
    borderRadius:12,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
  tabCircle:{
    position:'absolute',
    height:40,
    width:40,
    borderRadius:50,
    right:'50%',
    transform:[{translateX:10}],
    top:-18,
    justifyContent:'center',
    alignItems:'center'


  },
  tabtext:{
    color:COLORS.white,
    fontWeight:'500'
  },
  serviceContainer:{
    marginTop:20,
    flexDirection:'column'
  },
  title:{
    
  },
  titleText:{
    fontSize:23,
    color:COLORS.black,
    fontWeight:'600'
  },
  line:{
    height:3,
    width:'100%',
    backgroundColor:COLORS.purple,
    marginTop:5
  },
  serviceTabContainer:{
    flexDirection:'column',
    alignItems:'center',
    width:80,
    gap:3,
    
    
  },
  serviceTabs:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-around',
  },
  serviceTab:{
    flexDirection:'column',
    width:60,
    height:60,
    borderRadius:12,
    borderWidth:2,
    borderColor:COLORS.purple,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
  },
  serviceBtn:{},
  serviceText:{
    textAlign:'center',
    fontWeight:'400',
    color:COLORS.black
  },
  transactionsContainer:{
    marginTop:10,
    flexDirection:'column',
   
  },
  transactions:{
    height:100,
  },
  
});
