import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [ispasswordShown, setIsPasswordShown] = useState(true);
  const navigation = useNavigation();

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
          <View style={styles.input}>
            <TextInput
              secureTextEntry={ispasswordShown}
              style={{width: '100%'}}
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

            onPress={isChecked => {}}

          />
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
        onpress={() => navigation.navigate('Home')}
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
