import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import Img from '../Assets/img1.png';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
const Balance = () => {
    const navigation=useNavigation()
    const [balance, setBalance] = useState(null);
    
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Balance</Text>
      </View>
      <View style={styles.addCard}>
          <Image source={Img} style={styles.imageStyles} />
          {/* <View style={styles.plus}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Wallet', {userData})}>
              <FontAwesomeIcon
                name="circle-plus"
                size={30}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View> */}
          <Text style={styles.cardtext}>{`Rs.${balance}.00`}</Text>
          <Text style={styles.cardsubtext}>{"Available balance"}</Text>
        </View>
        <View style={styles.creditContainer}>
            <TouchableOpacity style={styles.credit}>
                <Text style={styles.creditText}>Add Credit</Text>
            </TouchableOpacity>
        </View>
      
              <View style={styles.recentTransactionsContainer}>
          <Text style={styles.recentTransactions}>Recent Transactions</Text>
          <View style={styles.line}></View>
          
        </View>
     
    </SafeAreaView>
  )
}

export default Balance

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
      cardContainer:{
        position: 'relative',
        width: '100%',
        height: 150,
        backgroundColor: COLORS.purple,
        marginTop: 30,
        borderRadius: 12,
        padding: 30,
      },
      imageStyles: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: -1,
      },
      cardtext: {
        fontSize: 30,
        color: COLORS.white,
        fontWeight: '600',
      },
      cardsubtext: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.white,
      },

      content:{
        marginTop:70
      },
      contentText:{
        color:COLORS.low_grey,
        fontWeight:'600',
        textAlign:'center',
        fontSize:20
      },
      addCard: {
        position: 'relative',
        width: '100%',
        height: 150,
        backgroundColor: COLORS.purple,
        marginTop: 30,
        borderRadius: 12,
        padding: 30,
      },
      creditContainer:{
        justifyContent:'center',
        alignItems:'center',
      },
      credit:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:12,
        width:100,
        backgroundColor:COLORS.purple,
        marginTop:25
      },
      creditText:{
        color:COLORS.white,
        fontWeight:'600'
      },
      recentTransactions: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: '500',
        marginTop: 40,
      },
      line: {
        height: 3,
        width: '100%',
        backgroundColor: COLORS.purple,
        marginTop: 5,
      },
      transText: {
        alignSelf: 'center',
        marginTop: 20,
      },
      recentTransactionsContainer:{
        height:400,
        
      },
      
})