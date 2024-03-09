import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import COLORS from '../constants/colors';

import Login from '../screens/Login';
import AccountCreated from '../screens/AccountCreated';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import Home from '../screens/Home';
import CreatePassword from '../screens/CreatePassword';
import AddCard from '../screens/AddCard';
import Wallet from '../screens/Wallet';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import Profile from '../screens/Profile';
import IntroLogoAnimationScreen from '../screens/IntroLogoAnimationScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import TwoFactorAuthScreen from '../screens/TwoFactorAuthScreen';
import PinScreen from '../screens/PinScreen';
import AddCredit from '../screens/AddCredit';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        backgroundColor: COLORS.purple,
        height: 100,
        opacity: 0.9,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
        color: 'white',
      }}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        backgroundColor: COLORS.purple,
        height: 100,
        opacity: 0.9,
      }}
      text1Style={{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 15,
        color: 'white',
      }}
    />
  ),

  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [showIntro, setShowIntro] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    checkLoggedIn();
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 980);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {showIntro ? (
          <Stack.Screen
            name="IntroLogoAnimationScreen"
            component={IntroLogoAnimationScreen}
          />
        ) : null}
        {isLoggedIn ? (
          <Stack.Screen name="PinScreen" component={PinScreen} />
        ) : (
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        )}
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="twoFactorAuthScreen"
          component={TwoFactorAuthScreen}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="OTPVerificationScreen"
          component={OTPVerificationScreen}
        />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="AddCredit" component={AddCredit} />
      </Stack.Navigator>

      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
