import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

export default function ForgetPassword() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forget password</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.sub}>
          You can change your password for security reason or reset it if you
          forget it.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.btnContainer}>
        <Button

          onpress={() => navigation.navigate('CreatePassword')}
          style={styles.continueBtn}
          title="Continue"
          filled

        />
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
  },
  headerTitle: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: '20%',
  },
  subContainer: {
    marginVertical: 65,
    marginHorizontal: 45,
  },
  sub: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 25,
    marginHorizontal: 15,
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
  btnContainer: {
    marginVertical: 300,
  },
  continueBtn: {
    margin: 15,
  },
});
