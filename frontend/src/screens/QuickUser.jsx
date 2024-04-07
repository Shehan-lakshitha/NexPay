import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../Assets/nexpay.png'
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { URL } from '../constants/URL';
import Toast from 'react-native-toast-message';
const QuickUser = () => {
    const navigation=useNavigation()
    const route = useRoute();
    const {id} = route.params;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const addUser=async()=>{
        try {
            const response = await axios.post(`${URL}/api/adduser`, {
              id:id,
              email,
            });
            if (response.data.success === true) {
                navigation.goBack()
            }else{
                Toast.show({
                    type: 'error',
                    text1: 'User is already added',
                    text2: 'Please enter valid User',
                  }); 
            }
          } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'User is already added',
                text2: 'Please enter valid User',
              });
          }
    }
    
  

      
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Add User</Text>
      </View>
        <View >
              <View style={styles.imgContainer}><Image source={logo } style={styles.imgImg}></Image></View>
        </View>
        <View style={styles.content}>
        <Text style={styles.label}>User Name</Text>
        <TextInput style={styles.input}  
         
        onChangeText={text => {
                setName(text);
              }} />
         <View style={styles.userDetails}>
             
             <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input}  
         
        onChangeText={text => {
                setEmail(text);
               
              }} />
         </View>
        </View>
        <Button
        style={styles.nextBtn}
        title="Add"
        filled
        onpress={addUser}
      />
    </SafeAreaView>
  )
}

export default QuickUser

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
        marginTop:25,
        
      },
      img:{
        height:110,
        width:110,
        resizeMode:"cover"
    },
    imgContainer:{
        
        alignItems:'center',
        justifyContent:'center'
       
    },
    imgImg:{
       marginTop:25,
       height:80,
       width:300,
       alignItems:'center',
       justifyContent:'center',
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
      nextBtn : {
        marginTop: 230,
      },
})