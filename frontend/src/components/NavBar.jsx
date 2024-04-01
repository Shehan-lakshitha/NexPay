import { StyleSheet, Text, View,TouchableOpacity,useColorScheme, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import COLORS from '../constants/colors';

export default function NavBar({navigation,data}) {
    const colorScheme = useColorScheme();
    
    const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  return (
    
    <View style={styles.navBar}>
    <View style={[styles.navQR,{backgroundColor}]}>
      <TouchableOpacity onPress={()=>{navigation.navigate('QRScan',{userData:data})}}>
      <MaterialIcon name='qrcode' size={40} color='#8A86EA'/>
      </TouchableOpacity>
      </View>
    <View style={styles.navleft}>
      
    <View style={styles.nav}>
      <TouchableOpacity>
      <FeatherIcon name="home" size={30} color={COLORS.white} /> 
      </TouchableOpacity>
    </View>
    <View style={styles.nav}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Chart',{id:data._id})}}>
      <Icon name="chart-bar" size={30} color={COLORS.white} /> 
      </TouchableOpacity>
    </View>
    
    </View>
    <View style={styles.navright}>
    <View style={styles.nav}>
      <TouchableOpacity onPress={()=>navigation.navigate('Wallet',{userData:data})}>
      <MaterialIcon name="wallet-outline" size={30} color={COLORS.white} /> 
      </TouchableOpacity>
    </View>
    <View style={styles.nav}>
      <TouchableOpacity onPress={()=>navigation.navigate('Profile',{data})}>
      <AwesomeIcon name="user-o" size={30} color={COLORS.white} /> 
      </TouchableOpacity>
    </View>
    </View>
  </View>

  )
}

const styles = StyleSheet.create({
    navBar:{
        position:'absolute',
        backgroundColor:COLORS.purple,
        padding:20,
        paddingLeft:30,
        paddingRight:30,
        zIndex:100,
        height:70,
        borderTopRightRadius:24,
        borderTopLeftRadius:24,
        gap:0,
        width:'100%',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
      },
      navQR:{
        position:'absolute',
        width:60,
        height:60,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        top:-30,
        right:'50%',
        
        
      },
      navleft:{
        flexDirection:'row',
        gap:70,
        justifyContent:'flex-start',
        width:'50%'
      },
      navright:{
        flexDirection:'row',
        gap:70,
        justifyContent:'flex-end',
        width:'50%'
      }
})