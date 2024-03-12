import { Image, SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import React, { useRef,useEffect,useState } from 'react';
import ReactNativePinView from 'react-native-pin-view';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import logo from '../Assets/nexpay.png'
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { URL } from '../constants/URL';
const PinVerify = () => {
  const pinView = useRef(null)
  const route = useRoute();
  const {data,amount} = route.params;
  const [enteredPin, setEnteredPin] = useState("")
 
  const navigation=useNavigation()
  useEffect(()=>{
    const pinFetch=async()=>{
      
      try {
        if(enteredPin.length === 4){
          
          const response=await axios.post(
            `${URL}/api/pinverify`,
            {
              pin:parseInt(enteredPin)
            },
          );
          if(response.data.success ===true){
            navigation.navigate('Created',{data:data,amount:amount})
                
            
            
            
          }else if(response.data.success ===false){
            console.log('incorrect pin')
            pinView.current.clearAll()
          }
             
        }
        
      } catch (error) {
        console.log(error)
        console.log('incorrectt pin')
        Toast.show({
          type: 'error',
          text1: 'Invalid Pin',
          text2: 'Please enter a valid pin',
        })
        pinView.current.clearAll()
      }
    }
    pinFetch()
  },[enteredPin])
   
   
   
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Image source={logo} style={{width:120,height:30}}/>
            <Text style={styles.headerText}>Enter Pin</Text>
        </View>
        <View style={styles.pincontainer}>
       <ReactNativePinView
            inputSize={20}
            ref={pinView}
            pinLength={4}
            buttonSize={60}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 40,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
            inputViewFilledStyle={{
              backgroundColor: COLORS.primary,
            }}
            buttonViewStyle={{
              
              borderColor: COLORS.low_grey,
              borderBottomWidth:1,
              borderRadius:0,
              
              
            }}
            buttonTextStyle={{
              color: COLORS.black,
              fontSize:25
            }}
            onButtonPress={key => {
              if (key === "custom_right") {
                pinView.current.clear()
              }
              
              
            }}
            customRightButton={ <MaterialIcon name="backspace-outline" size={25} color={COLORS.black} /> }
            
            
          />
          </View>
    </SafeAreaView>
  )
}

export default PinVerify

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10
    },
    header:{
      flex:.25,
      alignItems:'center',
      margin:50
    },
    headerText:{
        marginTop:90,
        fontSize:23,
        fontWeight:'600',
        color:COLORS.black
    },
    pincontainer:{
        flex:.5,
        justifyContent:"center",
        alignItems:'center',
    },
})