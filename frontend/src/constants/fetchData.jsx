import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './URL'
import COLORS from './colors';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
const fetchData = ({id}) => {
    const [other, setOther] = useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            try {
              const response = await axios.post(`${URL}/api/adduserdetails`, {
                id: id,
              });
              if (response) {
             
               setOther(response.data)
              }
            } catch (error) {
              console.log(error);
            }
          }
          fetchData()
    },[])

  return (
    <View style={styles.boxStyle}>
    <TouchableOpacity style={styles.box} onPress={()=>{navigation.navigate('QuickUser',{id: id,})}}>
      <Icon name="plus" size={18} color={COLORS.primary} />
    </TouchableOpacity>
    <Text>Users</Text>
  </View>
  )
}

export default fetchData
const styles = StyleSheet.create({
    boxStyle: {
        width: 60,
        height: 60,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      box: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: COLORS.purple,
        borderRadius: 12,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

