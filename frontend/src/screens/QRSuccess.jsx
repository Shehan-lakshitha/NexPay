import React, { useEffect } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios"
import { URL } from '../constants/URL';

 const QRSuccess = () => {
  const route = useRoute();
  const {data,amount,id} = route.params;
  const navigation=useNavigation()
  
  useEffect(()=>{
    const makePayment=async()=>{
        try {
          const response = await axios.post(`${URL}/api/nexpayment`, {
            id: data._id,
            total:parseInt(amount)
          });
          if(response.data.success===true){
            
            const addcredit=async()=>{
                try {
                  const response = await axios.post(`${URL}/api/addcredit`, {
                    id: id,
                    total:parseInt(amount)
                  });
                  if(response.data.success===true){
                    navigation.navigate('Home', {email:data.email,id:data._id});
                    console.log('fuck')
                  }
                } catch (error) {
                  console.log(error)
                }
              }
              addcredit()
            
          }
        } catch (error) {
          console.log(error)
        }
      }
      makePayment()
  })
  console.log(data._id)
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Icon name="check" size={100} color={COLORS.green} />
        <Text style={styles.heading}>Payment Successfully.</Text>
        
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50%',
  },
  heading: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  btn: {
    marginTop: 300,
    marginHorizontal: 15,
  },
});

export default QRSuccess;