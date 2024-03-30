import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,useColorScheme,Image, Alert,BackHandler,
  
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { URL } from '../constants/URL';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';


const QuickTopUp = () => {
  const route = useRoute();
  const {id}=route.params
  const navigation=useNavigation()
  console.log(id)
  const [imagePath, setImagePath] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
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


    
  </View>
  <View style={styles.userContainer}>
        <View style={[styles.profile]}>
            <View style={styles.imgContainer}><Image source={{ uri: `${URL}/${imagePath}` }} style={styles.img}></Image></View>
        </View>
        
    </View>


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
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  userContainer:{
     
      marginTop:50,
      position:"relative"
      
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
      position:"absolute",
      left:"31%",
      top:-50
      
      
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
