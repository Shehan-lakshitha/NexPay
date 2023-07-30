import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.input}>
            <Text style={styles.prefix}>+94</Text>
            <TextInput
              keyboardType="number-pad"
              onChangeText={() => {}}
              placeholder=""
              style={{width: '100%'}}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />
        </View>

        <View style={styles.formFooter}>
          <BouncyCheckbox
            size={25}
            fillColor={COLORS.primary}
            iconStyle={{borderRadius: 4}}
            text="remember me"
            textStyle={{textDecorationLine: 'none', marginHorizontal: 0}}
            unfillColor="#FFFFFF"
            innerIconStyle={{borderWidth: 2, borderRadius: 4}}
            onPress={(isChecked: boolean) => {}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword}>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button style={styles.loginBtn} title="Login" filled onpress={() => {}} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
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
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 28,
  },
  title: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 40,
  },
  form: {
    margin: 25,
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
  prefix: {
    color: COLORS.black,
    fontSize: 16,
    opacity: 0.5,
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgetPassword: {
    color: COLORS.primary,
    fontSize: 16,
    opacity: 0.8,
    fontWeight: '400',
  },
  loginBtn: {
    margin: 30,
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
