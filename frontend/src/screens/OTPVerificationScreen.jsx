// React Native screen for OTP verification
import React, { useState  } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { URL } from '../constants/URL';
const OtpInput = ({length = 6, onOtpSubmit = () => {}}) => {
  const [otp, setOtp] = React.useState(new Array(length).fill(''));
  const inputRefs = React.useRef([]);

  React.useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'Backspace' && index === 0 && otp[index] === '') {
      // Move focus to the last input field if backspace is pressed on the first empty field
      inputRefs.current[length - 1].focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          style={styles.otpInput}
          value={digit}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={value => handleChange(index, value)}
          onKeyDown={e => handleKeyDown(index, e)}
        />
      ))}
    </View>
  );
};

const OTPVerificationScreen = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;
  const [errMsg,setErrmsg]=useState('')
  // Function to handle resend OTP
  const handleResendOTP = () => {
    console.log('Resend OTP');
    // Implement logic to resend OTP
  };

  // Function to handle verification
  const handleVerify = async otp => {
    console.log('Verify Button Pressed with OTP:', otp);
    // Implement verification logic
    try {
      const response = await axios.post(
        `${URL}/api/otpverify`,
        {email: email,
        otp:otp},
      );
      console.log(response.data.message)
      if(response.data.success==true){
        navigation.navigate('PinScreen',{email})
        
        
      }else{
        setErrmsg(response.data.message)
        
          
      }

      
      
      
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Arrow icon */}
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          {/* Lock icon and title */}
          <View style={styles.lockContainer}>
            <Icon
              name="lock"
              size={120}
              color={COLORS.primary}
              style={styles.lockIcon}
            />
            <Text style={styles.lockTitle}>OTP verification </Text>
          </View>

          {/* Email description */}
          <Text style={styles.emailDescription}>
            We sent a one-time password to your email
          </Text>
          <Text style={styles.userEmail}>user@example.com</Text>

          {/* OTP input boxes */}
          {/* Integrated OtpInput component */}
          <OtpInput length={6} onOtpSubmit={handleVerify} />

          {/* Resend OTP option */}
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
       <Text style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLORS.red,
            textAlign:'center'
          }}>{errMsg}</Text>
      {/* Verify button */}
      <Button style={styles.verifyButton} title="Verify" filled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingBottom: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 45,
    left: 38,
    zIndex: 1,
  },
  lockContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  lockIcon: {
    marginTop: 10,
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 18,
  },
  emailDescription: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 18,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  otpInput: {
    width: '12%',
    height: 48,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 4,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 6,
    textAlign: 'center',
  },
  verifyButton: {
    fontSize: 18,
    marginBottom: 58,
    marginLeft: 24,
    marginRight: 24,
  },
});

export default OTPVerificationScreen;
