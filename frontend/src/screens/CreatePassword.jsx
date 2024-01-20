import React, {useState} from 'react';
import axios from 'axios';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { useRoute } from '@react-navigation/native';




const CreatePassword = ({navigation}) => {
  const route = useRoute();
  const {firstName, lastName, email, NIC, phoneNumber} = route.params;
   
  const [ispasswordShown, setIsPasswordShown] = useState(false);
  const [ispasswordShownC, setIsPasswordShownC] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://192.168.8.159:5000/api/register',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          NIC: NIC,
          password: password,
          confirmPassword: confirmPassword,
        },
      );
      
      if(response.data.success===true){
        navigation.navigate('AccountCreated')
      }
      
      
      
    } catch (error) {
      console.log(error);
    }
  };
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
            onChangeText={text => setPassword(text)}
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
            at least 9 characters, contaning a letter and a number
          </Text>
        </View>
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
