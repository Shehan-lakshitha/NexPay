import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OTPVerificationScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = useRef([...Array(6)].map(() => React.createRef()));

  // Function to handle OTP input
  const handleOtpInput = (index, value) => {
    // Validate input to be a single numeric character
    if (/^[0-9]$/.test(value)) {
      // Update the OTP array with the entered digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box
      if (
        index < 5 &&
        refs.current[index + 1] &&
        refs.current[index + 1].current
      ) {
        refs.current[index + 1].current.focus();
      }
    } else if (value === '' && index > 0) {
      // If the value is empty, move focus to the previous input box
      if (refs.current[index - 1] && refs.current[index - 1].current) {
        refs.current[index - 1].current.focus();
      }
    } else if (value === ' ' && index > 0) {
      // Allow backspacing by clearing the current digit and moving focus to the previous input
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (refs.current[index - 1] && refs.current[index - 1].current) {
        refs.current[index - 1].current.focus();
      }
    } else if (/^[0-9]$/.test(value) && index < 5) {
      // If user enters a number again, clear the current digit and replace with the new one
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box
      if (refs.current[index + 1] && refs.current[index + 1].current) {
        refs.current[index + 1].current.focus();
      }
    }
  };

  // Function to handle resend OTP
  const handleResendOTP = () => {
    console.log('Resend OTP');
    // Implement logic to resend OTP
  };

  // Function to handle verification
  const handleVerify = () => {
    console.log('Verify Button Pressed');
    // Implement verification logic
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
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={refs.current[index]}
                style={styles.otpInput}
                value={digit}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={value => handleOtpInput(index, value)}
              />
            ))}
          </View>

          {/* Resend OTP option */}
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
