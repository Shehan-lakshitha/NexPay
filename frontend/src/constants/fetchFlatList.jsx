import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import COLORS from './colors';
import { URL } from './URL';

const fetchFlatList = () => {
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
          {item.type==='payment'?<Text style={styles.renderTextRed}>{item.type}</Text>:<Text style={styles.renderTextGreen}>{item.type}</Text>}
            <Text style={styles.renderText}>{`Rs.${item.amount}.00`}</Text>
            <Text style={styles.renderText}>{formattedDateTime}</Text>
            </View>
          
        </View>)
      };
  return (
    <FlatList
    data={history?.slice(-3)}
    renderItem={renderItem}
    keyExtractor={item => item.paymentIntentId}
    />)
}

export default fetchFlatList

const styles = StyleSheet.create({
    tile:{
        flexDirection:'row',
        padding:10,
        justifyContent: 'space-between',
        
       },
       renderText:{
         fontWeight:'600'
       },
       renderTextGreen:{
         fontWeight:'600',
         color:COLORS.green
        },
        renderTextRed:{
         fontWeight:'600',
         color:COLORS.warning
     
        },
})