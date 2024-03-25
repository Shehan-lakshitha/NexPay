import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { URL } from '../constants/URL';
import axios from 'axios';

const QRPayment = () => {
    const navigation=useNavigation()
    const route = useRoute();
    const {data,id} = route.params;
    const [imagePath, setImagePath] = useState(null);
    
    const [payer,setPayer]=useState()
    const [amount,setAmount] = useState(null);
    
    const fetchImg=async ()=>{
        try {
          const response = await axios.get(`${URL}/api/display/${id}`);
          
      
          setImagePath(response.data.imagePath.replace(/\\/g, '/'))
          
        } catch (error) {
          console.log(error)
        }
       }

       const fetchAccountDetails=async ()=>{
        try {
          const response = await axios.post(`${URL}/api/details/account`,{
            id:id
          });
          if(response){
            setPayer(response.data)
          }
          
          
        } catch (error) {
          console.log(error)
        }
       }
  
       useEffect(()=>{
    
        fetchImg()
        fetchAccountDetails()
        
      },[])

     
        
        
  
      
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Transfer Credit</Text>
      </View>
      <View style={styles.profile}>
              <View style={styles.imgContainer}><Image source={{ uri: `${URL}/${imagePath}` }} style={styles.img}></Image></View>
          </View>
          {/* <Text style={styles.accountName}>{`${payer.firstName} ${payer.lastName}`}</Text> */}
        <View style={styles.content}>
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input}  
         keyboardType='numeric'
        onChangeText={text => {
            setAmount(text);
              }} />
         
        </View>
        <Button
        style={styles.nextBtn}
        title="Continue"
        filled
        onpress={()=>{navigation.navigate('Verify',{data:data,amount:amount,id})}}
      />
    </SafeAreaView>
  )
}

export default QRPayment

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
        marginTop:50,
        
      },
    
    img:{
        height:110,
        width:110,
        resizeMode:"cover"
    },
    imgContainer:{
        borderRadius:75,
        height:110,
        width:110,
        
        
     
        overflow:'hidden',
        backgroundColor:"#C3ACD0",
       
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
      profile:{
        alignItems:'center',
        justifyContent:'center',  
    },
    accountName:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'600',
        marginTop:20
    },
    nextBtn:{
        marginTop: 300,
        marginHorizontal: 15,
        marginBottom: 20,
    }
})