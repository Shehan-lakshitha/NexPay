import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { URL } from '../constants/URL';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CreatePassword = () => {
  const route = useRoute();
  const navigation=useNavigation()
  const {firstName, lastName, email, NIC, phoneNumber} = route.params;

  const [ispasswordShown, setIsPasswordShown] = useState(true);
  const [ispasswordShownC, setIsPasswordShownC] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [error,setError]=useState('')
  const [passwordValidity,setPassswordValidity]=useState(true)
   
  useEffect(()=>{
    const addEmailToStorage = async () => {
      try {
        await AsyncStorage.setItem('email',email);
        console.log('Email added to AsyncStorage');
      } catch (error) {
        console.error('Error adding email to AsyncStorage:', error);
      }
    };
    addEmailToStorage()
  },[email])

  const handleSubmit = async () => {
    try {
     
        const response = await axios.post(
          `${URL}/api/register`,
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: parseInt(phoneNumber),
            NIC: NIC,
            password: password,
            confirmPassword: confirmPassword,
          },
        );
        
        if(response.data.success===true){
          navigation.navigate('AccountCreated',{
            email,
            firstName
          })
        }else{
          setErrorText(response.data.message);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: `${errorText}`,
          })
        }
      

      
      
      
    } catch (error) {
      console.error(error);
      setErrorText('An unexpected error occurred. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${errorText}`,
      })
    }
  };

    const checkValidPassword=(value)=>{
      const minLength = 8; 
      const uppercaseRegex = /[A-Z]/; 
      const lowercaseRegex = /[a-z]/; 
      const digitRegex = /[0-9]/; 
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; 
  
      setPassword(value)
     if(password.length >= minLength && uppercaseRegex.test(password) && lowercaseRegex.test(password) && digitRegex.test(password) && specialCharRegex.test(password)){
         setPassswordValidity(true)
         setPassword(value)

     }else{
      setPassswordValidity(false)
      setError('Weak Password,should incude letters,special characters and numbers.')
     }

    }

  return (
    <View
      style={{
        marginHorizontal: 22,
        marginTop: 22,
      }}>
      <View>
        <TouchableOpacity
        onPress={()=> navigation.navigate('Register')}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: -28,
            fontSize: 22,
            fontWeight: '500',
            color: COLORS.black,
            alignSelf: 'center',
          }}>
          Create Your Password
        </Text>
      </View>

      {/* Password */}
      <View
        style={{
          marginTop: 22,
          marginBottom: 32,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLORS.black,
          }}>
          Password
        </Text>
        <View
          style={{
            width: '100%',
            height: 48,
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderRadius: 8,
          }}>
          <TextInput
            secureTextEntry={ispasswordShown}
            placeholder="Enter your password"
            value={password}
            onChangeText={text => checkValidPassword(text)}
            style={{
              fontSize: 16,
              fontWeight: '400',
              width: '100%',
              paddingLeft: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordShown(!ispasswordShown)}
            style={{
              position: 'absolute',
              right: 12,
              top: 10,
            }}>
            {ispasswordShown == true ? (
              <Icon name="eye" size={24} color={COLORS.primary} />
            ) : (
              <Icon name="eye-slash" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 4,
            }}>
            at least 8 characters, contaning a letter and a number
          </Text>
        </View>
        {!passwordValidity? 
        <Text 
        style={{
          textAlign:'center',
           color:COLORS.warning,
          fontWeight:'500',
          marginTop:16
                }}>{error}</Text>:''}
      </View>

      {/* Confirm Password */}
      <View
        style={{
          marginBottom: 32,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLORS.black,
          }}>
          Confirm Password
        </Text>
        <View
          style={{
            width: '100%',
            height: 48,
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderRadius: 8,
          }}>
          <TextInput
            secureTextEntry={ispasswordShownC}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            style={{
              fontSize: 16,
              fontWeight: '400',
              width: '100%',
              paddingLeft: 10,
            }}
          />
          
          <TouchableOpacity
            onPress={() => setIsPasswordShownC(!ispasswordShownC)}
            style={{
              position: 'absolute',
              right: 12,
              top: 10,
            }}>
            {ispasswordShownC == true ? (
              <Icon name="eye" size={24} color={COLORS.primary} />
            ) : (
              <Icon name="eye-slash" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        
      </View>
      <Button
      onpress={handleSubmit}
        style={{
          marginTop: 400,
        }}
        title="Confirm"
        filled
      />
    </View>
  );
};

export default CreatePassword;
