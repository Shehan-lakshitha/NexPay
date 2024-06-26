import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../constants/URL';

export default function Login({navigation}) {
  const [ispasswordShown, setIsPasswordShown] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [emailValidity, setEmailValidity] = useState(true);
  const [passwordValidity, setPassswordValidity] = useState(true);
  const [error, setError] = useState('');
  const handleCheckEmail = text => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmail(text);
    if (emailRegex.test(text)) {
      setEmailValidity(true);
    } else {
      setEmailValidity(false);
      setError('Invalid Email');
    }
  };

  const handleCheckPassword = value => {
    const isNoWhiteSpace = /^\S+$/;
    if (!isNoWhiteSpace.test(value)) {
      setPassswordValidity(false);
      setError('Password must not contain Whitespaces.');
    } else {
      setPassswordValidity(true);
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${URL}/api/login`, {
        email: email,
        password: password,
      });
      if (response.data.success === true) {
        if (response.data.token) {
          await AsyncStorage.multiSet([
            ['token', response.data.token],
            ['email', email],
          ]);

          navigation.navigate('Home', {email, id: response.data.id});
        }
      } else if (response.data.success === false) {
        setError('Invalid Email or Password');
      }
    } catch (error) {
      console.log(error);
      setError('Invalid Email or Password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Login</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={text => {
                handleCheckEmail(text);
              }}
              placeholder=""
              value={email}
              style={{width: '100%'}}
            />
          </View>
          {!emailValidity ? <Text style={styles.errorStyle}>{error}</Text> : ''}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <TextInput
              secureTextEntry={ispasswordShown}
              style={{width: '100%'}}
              onChangeText={text => {
                handleCheckPassword(text);
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
                <Icon name="eye-slash" size={24} color={COLORS.primary} />
              ) : (
                <Icon name="eye" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
          {!passwordValidity ? (
            <Text style={styles.errorStyle}>{error}</Text>
          ) : (
            ''
          )}
        </View>

        <View style={styles.formFooter}>
          {/* <BouncyCheckbox
            size={25}
            fillColor={COLORS.primary}
            iconStyle={{borderRadius: 4}}
            text="remember me"
            textStyle={{textDecorationLine: 'none', marginHorizontal: 0}}
            unfillColor="#FFFFFF"
            innerIconStyle={{borderWidth: 2, borderRadius: 4}}
            onPress={()=> setChecked(!checked)}
          /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword}>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        style={styles.loginBtn}
        title="Login"
        filled
        onpress={handleSubmit}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerSpan}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headertitle: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: '35%',
  },
  form: {
    marginTop: 100,
    marginHorizontal: 15,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorStyle: {
    textAlign: 'right',
    color: COLORS.warning,
    fontWeight: '500',
    marginTop: 2,
  },
  prefix: {
    color: COLORS.black,
    fontSize: 16,
    opacity: 0.5,
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgetPassword: {
    color: COLORS.primary,
    fontSize: 16,
    opacity: 0.8,
    fontWeight: '400',
    justifyContent: 'flex-end',
  },
  loginBtn: {
    marginTop: 240,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: COLORS.black,
    fontSize: 16,
  },
  footerSpan: {color: COLORS.primary, fontSize: 16},
});
