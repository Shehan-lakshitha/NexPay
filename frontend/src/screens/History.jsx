import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import Img from '../Assets/topup.png';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { URL } from '../constants/URL';
import axios from 'axios';
const History = () => {
    const navigation=useNavigation()
    const route=useRoute()
    const {id}=route.params
    const [history, setHistory] = useState(null);
    useEffect(()=>{
        const fetchHistory=async ()=>{
          try {
            const response = await axios.post(`${URL}/api/paymenthistory`, {
              id: id,
            });
            if (response) {
              setHistory(response.data.payments)
               
            }
          } catch (error) {
            console.log(error);
            
          }
        }
        fetchHistory()
  
      },[]) 
  
      const renderItem = ({ item }) => {
        const date = new Date(item.created * 1000);
  
        // Format the date and time
        const formattedDateTime = date.toLocaleString(); 
        return(<View>
          <View  style={styles.tile}>
            <Text style={styles.renderText}>{item.type}</Text>
            <Text style={styles.renderText}>{`Rs.${item.amount}.00`}</Text>
            <Text style={styles.renderText}>{formattedDateTime}</Text>
            </View>
          
        </View>)
      };
    
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>History</Text>
      </View>
      
      
      <View style={styles.content}>
      
              <FlatList
              data={history}
              renderItem={renderItem}
              keyExtractor={item => item.paymentIntentId}
              />
            
      </View>
     
    </SafeAreaView>
  )
}

export default History

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
        
        alignItems:'center',
        justifyContent:'center'
      },
      contentText:{
        color:COLORS.low_grey,
        fontWeight:'600',
        textAlign:'center',
        fontSize:20
      },
      tile:{
        flexDirection:'row',
        padding:10,
        justifyContent: 'space-between',
        
       },
       renderText:{
         fontWeight:'600'
       }
      
})