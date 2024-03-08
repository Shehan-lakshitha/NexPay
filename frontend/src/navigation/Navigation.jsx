import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [showIntro, setShowIntro] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(isLoggedIn);
  }

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
        {
          isLoggedIn ? (
            <Stack.Screen name="PinScreen" component={PinScreen} />
          ) : 
          (
            <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          )
        }
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
