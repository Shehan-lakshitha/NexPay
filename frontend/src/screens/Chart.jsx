import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import Img from '../Assets/topup.png';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { useNavigation, useRoute } from '@react-navigation/native';
import { URL } from '../constants/URL';
import { FlatList } from 'react-native';
import axios from 'axios';
const Chart = () => {
    const route = useRoute();
    const {id} = route.params;
    const [history, setHistory] = useState(null);
    const navigation=useNavigation()
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
        <Text style={styles.headertitle}>Chart Analyzing</Text>
      </View>
      
      <View style={styles.chartcontainer}>
  
  <LineChart
    data={{
      labels: ["Jan", "Feb", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={320} // from react-native
    height={220}
    yAxisLabel="Rs"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: COLORS.primary,
      backgroundGradientFrom: COLORS.primary,
      backgroundGradientTo: COLORS.low_purple,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,  
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
</View>
<Text style={styles.title}>Last Transactions</Text>
<View style={styles.headerTitle}><Text>Method</Text><Text>Amount</Text><Text>Date</Text><Text>Time</Text></View>
<FlatList
              data={history?.slice(-4)}
              renderItem={renderItem}
              keyExtractor={item => item.paymentIntentId}
              />
      {/* <View style={styles.content}>
        <Text style={styles.contentText}>Still developing with contact details and FAQs</Text>
      </View> */}
     
    </SafeAreaView>
  )
}

export default Chart

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
        marginTop:250,
      },
      contentText:{
        color:COLORS.low_grey,
        fontWeight:'600',
        textAlign:'center',
        fontSize:20
      },
      tile:{
        flexDirection:'row',
        padding:20,
        justifyContent: 'space-between',
        backgroundColor:COLORS.low_purple,
        borderRadius:12,
        marginTop:15
        
       },
       renderText:{
         fontWeight:'600'
       }
      ,
      title:{
        textAlign:'center',
        marginTop:25,
        marginBottom:10,
        fontSize:18,
        fontWeight:'600'
      },
      headerTitle:{
        flexDirection:'row',
        gap:10,
        justifyContent:'space-around',
        
      },
      chartcontainer:{
        
        alignItems:'center'
      },
      
})