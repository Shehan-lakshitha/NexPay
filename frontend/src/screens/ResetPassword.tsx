import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import COLORS from '../constants/colors';

type RootStackParamList = {
  Home: undefined;
  ResetPassword: undefined;
  ForgetPassword: undefined;
  Register: undefined;
  LogIn: undefined;
};

type ResetPasswordProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ResetPassword'>;
};

const ResetPassword = ({navigation}: ResetPasswordProps) => {
  const [ispasswordShown, setIsPasswordShown] = useState(true);
  const [ispasswordShownConfirm, setIsPasswordShownConfirm] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset password</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <TextInput
              secureTextEntry={ispasswordShown}
              onChangeText={() => {}}
              placeholder=""
              style={{width: '90%'}}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!ispasswordShown)}
              style={styles.show}>
              {ispasswordShown == true ? (
                <Icon name="eye-slash" size={24} color={COLORS.primary} />
              ) : (
                <Icon name="eye" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            at least 9 characters, containing a letter and a number
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Re-enter password</Text>
          <View style={styles.input}>
            <TextInput
              secureTextEntry={ispasswordShownConfirm}
              style={{width: '90%'}}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShownConfirm(!ispasswordShownConfirm)}
              style={styles.show}>
              {ispasswordShownConfirm == true ? (
                <Icon name="eye-slash" size={24} color={COLORS.primary} />
              ) : (
                <Icon name="eye" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.ConfirmBtn}
          title="Confirm"
          filled
          onpress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerTitle: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: '20%',
  },
  form: {
    margin: 15,
    marginTop: 100,
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
  show: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  subText: {
    fontSize: 12,
    marginVertical: 5,
    color: COLORS.black,
  },
  btnContainer: {
    marginVertical: 250,
  },
  ConfirmBtn: {
    margin: 15,
  },
});
