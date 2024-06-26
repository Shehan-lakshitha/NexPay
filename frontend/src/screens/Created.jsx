import React, { useEffect } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { useRoute } from '@react-navigation/native';
import axios from "axios"
import { URL } from '../constants/URL';
 const Created = ({navigation}) => {
  const route = useRoute();
  const {data,amount} = route.params;

  const addcredit=async()=>{
    try {
      const response = await axios.post(`${URL}/api/addcredit`, {
        id: data._id,
        total:parseInt(amount)
      });
      if(response.data.success===true){
        
        navigation.navigate('Home', {email:data.email,id:data._id});
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Icon name="check" size={100} color={COLORS.green} />
        <Text style={styles.heading}>Credit Added Successfully.</Text>
        
      </View>

      <Button
        style={styles.btn}
        title="Continue"
        filled
        onpress={addcredit}
      />
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

export default Created;