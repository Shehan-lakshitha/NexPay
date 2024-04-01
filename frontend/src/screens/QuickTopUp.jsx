import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,useColorScheme,Image, Alert,BackHandler,TextInput
  
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { URL } from '../constants/URL';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/Button';


const QuickTopUp = () => {
  const route = useRoute();
  const {id,data}=route.params
  const navigation=useNavigation()
  
  const [imagePath, setImagePath] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const fetchImg=async ()=>{
    try {
      const response = await axios.get(`${URL}/api/display/${id}`);
      
  
      setImagePath(response.data.imagePath.replace(/\\/g, '/'))
      
    } catch (error) {
      console.log(error)
    }
   }
  
  const fetchUser=async ()=>{
    try {
      const response = await axios.post(`${URL}/api/udetails`,{id:id});
      
  
      setuserDetails(response.data)
      
    } catch (error) {
      console.log(error)
    }
   }
  
   useEffect(()=>{
    
    fetchImg()
    fetchUser()
  },[])

  return (
    <SafeAreaView style={[styles.Container]}>
    <View style={styles.subContainer}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Quick Transfer</Text>
      </View>
  <View style={styles.userContainer}>
        <View style={[styles.profile]}>
            <View style={styles.imgContainer}><Image source={{ uri: `${URL}/${imagePath}` }} style={styles.img}></Image></View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{`${userDetails?.firstName} ${userDetails?.lastName}`}</Text>
          <Text style={styles.infosubText}>{userDetails?.phoneNumber}</Text>
        </View>
    </View>
    <View style={styles.content}>
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input}  
         
        onChangeText={text => {
                setAmount(text);
              }} />
         <View style={styles.userDetails}>
             
             <Text style={styles.label}>Message</Text>
        <TextInput style={styles.  inputMessage}  
         multiline={true}
        onChangeText={text => {
                setMessage(text);
               
              }} />
         </View>
        </View>
        <Button
        style={styles.nextBtn}
        title="Pay"
        filled
        onpress={()=>{navigation.navigate('QRVerify',{data:data,amount:amount,id:id})}}
      />
    </View>
  </SafeAreaView>
  
  )
}

export default QuickTopUp
const styles = StyleSheet.create({
  Container: {
    flex:1,
      
  },
  subContainer:{
      margin:25,
      
  },
  header: {
    flexDirection: 'row',
    marginHorizontal:25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headertitle: {
    color: COLORS.black,
    
    width:150,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: '35%',
  },
  userContainer:{
     
      marginTop:20,
      position:"relative",
      flexDirection:'row',
      gap:20,
      justifyContent:'center'
      
  },
  info:{
    justifyContent:'center',
    alignContent:'center',
    gap:5,
    

  },
  infoText:{
    fontSize:18,
    fontWeight:'600',
    color:COLORS.black
  },
  infosubText:{
    fontSize:14,
    fontWeight:'600',
    color:COLORS.black
  },
  content:{
    marginTop:25,
    
  },
  label: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
    marginTop:5
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputMessage: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    height:100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextBtn:{
    marginTop: 240,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  usercon:{ 
      height: 230,
      borderRadius:25,
      backgroundColor:COLORS.purple,
      overflow:"hidden"
  },
  textContainer:{
    marginTop:100,
    zIndex:100,
    gap:3
  },
  textName:{
    
    textAlign:'center',
   
    
    fontSize:25,
    fontWeight:'600',
    color:COLORS.white
    
  },
  textNum:{
    textAlign:'center',
    
    fontSize:15,
    fontWeight:'400',
    color:COLORS.white
  },
  serviceTabs: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profile:{
      borderRadius:75,
      height:130,
      width:130,
    
      
      
  },
  imgEdit:{
    position:'absolute',
    top:15,
    left:15
  },
  imgContainer:{
      borderRadius:75,
      height:110,
      width:110,
      position:"absolute",
      left:"8%",
      top:10,
      overflow:'hidden',
      backgroundColor:"#C3ACD0",
     
  },
  img:{
      height:110,
      width:110,
      resizeMode:"cover"
  },
  shape1:{
      position:"absolute",
      right:-10,
      top:-20,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 60,
      
  
  transform: [{ rotate: '45deg' }],
      height:150,
      width:150,
      backgroundColor:COLORS.low_purple,
      opacity:0.7,
  },
  qrStyles:{
      margin:50,
      marginTop:18,
      marginBottom:0,
      zIndex:100,
      display:'hidden'

  },
  qrHidden:{
    display:'hidden'
  },
  subtextcon:{
    marginTop:10,
    zIndex:100,
    marginBottom:10
  },
  subtext:{
    textAlign:'center',
    color:COLORS.low_grey,
    fontWeight:'400',
    fontSize:16
  },
  shape2:{
      position:"absolute",
      left:-15,
      bottom:-15,
      borderTopLeftRadius:180,
      borderTopRightRadius: 80,
      borderBottomRightRadius:180,
      
      
  
  transform: [{ rotate: '15deg' }],
      height:200,
      width:120,
      backgroundColor:COLORS.low_purple,
      opacity:0.7,
  },
  showMore:{
      position:"absolute",
      justifyContent:"center",
      alignItems:"center",
      bottom:15,
      borderRadius:25,
      left:"35%",
      height:35,
      width:100,
      backgroundColor:COLORS.white,
      elevation:5
  },
  showText:{
      color:COLORS.black,
      fontWeight:"600"
  },
  unfold:{
      height: 510,
      borderRadius:25,
      backgroundColor:COLORS.purple,
      overflow:"hidden"
  },
  tabContainer:{marginTop:80,marginBottom:95},
  tabtab:{
   flexDirection:"column",
   alignItems:"center",
   gap:5
  },
  tabRow:{
    
    backgroundColor:"white",
    flexDirection:"row",
    justifyContent:"flex-start",
    gap:22,
    marginTop:15
  },
  tab:{
      
      borderWidth:2,
      borderRadius:15,
      padding:20,
      borderColor:COLORS.purple,
      width:80,
      height:80,
      justifyContent:"center",
      alignItems:"center",
      
      
      
  },
  tabText:{
      color:COLORS.black,
      fontWeight:"500",
      textAlign:"center",
      width:100
  },
  serviceContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  title: {},
  titleText: {
    fontSize: 23,
    color: COLORS.black,
    fontWeight: '600',
  },
  serviceTabContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 80,
    gap: 3,
  },
  serviceTab: {
    flexDirection: 'column',
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.purple,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceBtn: {},
  serviceText: {
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.black,
  },
});
