import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

import AsyncStorage from '@react-native-async-storage/async-storage';

import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import Profile from '../screens/Profile';
import IntroLogoAnimationScreen from '../screens/IntroLogoAnimationScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import TwoFactorAuthScreen from '../screens/TwoFactorAuthScreen';

import QRScan from '../screens/QRScan';
import PinLog from '../screens/PinLog';
import PinScreen from '../screens/PinScreen';
import AddCredit from '../screens/AddCredit';
import PinVerify from '../screens/PinVerify';
import Created from '../screens/Created';
import MobileTopUp from '../screens/MobileTopUp';
import TopUp from '../screens/TopUp';
import Success from '../screens/Success';
import Verify from '../screens/Verify';
import Rewards from '../screens/Rewards';
import Notification from '../screens/Notification';
import Help from '../screens/Help';
import History from '../screens/History';

import BillPayments from '../screens/BillPayments';
import ElectricityPayment from '../screens/ElectricityPayment';

import Chart from '../screens/Chart';
import Transfer from '../screens/Transfer';
import QRPayment from '../screens/QRPayment';
import QRSuccess from '../screens/QRSuccess';
import QuickUser from '../screens/QuickUser';
import QuickTopUp from '../screens/QuickTopUp';
import QRVerify from '../screens/QRVerify';
import Balance from '../screens/Balance';





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
  const [isLogIn,setIsLogIn]=useState(null)

  useEffect(()=>{
    fetchToken = async () => {
      try {
        
        const token=await AsyncStorage.getItem('token');
        
        if(token){
          setIsLogIn(true)
        }
      } catch (error) {
        console.error('server error:', error);
      }
    };
    fetchToken()
   },[]) 


  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 980);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        {showIntro ? (
          <Stack.Screen
            name="IntroLogoAnimationScreen"
            component={IntroLogoAnimationScreen}
          />
        ) : null}

        {isLogIn? (<Stack.Screen name="PinLog" component={PinLog} />):
        (<Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />)}

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

        <Stack.Screen name="QRScan" component={QRScan} />
        <Stack.Screen name="PinScreen" component={PinScreen} />
        <Stack.Screen name="PinVerify" component={PinVerify} />
        <Stack.Screen name="Created" component={Created} />

        <Stack.Screen name="AddCredit" component={AddCredit} />
        <Stack.Screen name="MobileTopUp" component={MobileTopUp} />
        <Stack.Screen name="TopUp" component={TopUp} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Rewards" component={Rewards} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="History" component={History} />

        <Stack.Screen name="BillPayments" component={BillPayments} />
        <Stack.Screen name="ElectricityPayment" component={ElectricityPayment} />

        <Stack.Screen name="Chart" component={Chart} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="QRPayment" component={QRPayment} />
        <Stack.Screen name="QRSuccess" component={QRSuccess} />
        <Stack.Screen name="QuickUser" component={QuickUser} />
        <Stack.Screen name="QuickTopUp" component={QuickTopUp} />
        <Stack.Screen name="QRVerify" component={QRVerify} />
        <Stack.Screen name="Balance" component={Balance} />


      </Stack.Navigator>

      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
