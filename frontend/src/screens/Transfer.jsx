import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../Assets/nexpay.png'
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { URL } from '../constants/URL';
import axios from 'axios';
const Transfer = () => {
    const navigation=useNavigation()
    const route = useRoute();
    const {userData} = route.params;
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [userDetails, setuserDetails] = useState(null);
    const [amount,setAmount] = useState(null);
      
    useEffect(()=>{
      const fetchUser=async ()=>{
        try {
          const response = await axios.post(`${URL}/api/transferdetails`,{phoneNumber:parseInt(phoneNumber)});
          
        if(response){
          setuserDetails(response.data)
        }
         
          
        } catch (error) {
          console.log(error)
        }
       }
       fetchUser()
    },[phoneNumber])
 

      
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Transfer Credit</Text>
      </View>
        <View >
              <View style={styles.imgContainer}><Image source={logo } style={styles.imgImg}></Image></View>
        </View>
        <View style={styles.content}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input}  
         keyboardType='numeric'
        onChangeText={text => {
                setPhoneNumber(text);
              }} />
         <View style={styles.userDetails}>
             
             <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input}  
         keyboardType='numeric'
        onChangeText={text => {
                setAmount(text);
               
              }} />
         </View>
        </View>
        <Button
        style={styles.nextBtn}
        title="Continue"
        filled
        onpress={()=>{navigation.navigate('QRVerify',{data:userData,amount:amount,id:userDetails._id})}}
      />
    </SafeAreaView>
  )
}

export default Transfer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 28, 
      },
      header: {
        flexDirection: 'row',
        margin:25,
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
      content:{
        marginTop:25,
        
      },
      img:{
        height:110,
        width:110,
        resizeMode:"cover"
    },
    imgContainer:{
        
        alignItems:'center',
        justifyContent:'center'
       
    },
    imgImg:{
       marginTop:25,
       height:80,
       width:300,
       alignItems:'center',
       justifyContent:'center',
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
      userDetails:{
    
        marginVertical:30
      },
      userText:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'600'
      },
      tabDetails:{
        flexDirection:'row',
        justifyContent:'space-between'
        
      },
})