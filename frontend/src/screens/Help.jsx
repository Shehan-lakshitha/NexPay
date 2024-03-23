import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import Img from '../Assets/topup.png';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
const Help = () => {
    const navigation=useNavigation()
    
    
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Help</Text>
      </View>
      
      
      <View style={styles.content}>
        <Text style={styles.contentText}>Still developing with contact details and FAQs</Text>
      </View>
     
    </SafeAreaView>
  )
}

export default Help

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
      
})