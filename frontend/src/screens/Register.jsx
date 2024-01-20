import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const Register = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 22,
          marginTop: 22,
        }}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Icon name="chevron-left" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: -28,
              fontSize: 22,
              fontWeight: '500',
              color: COLORS.black,
              alignSelf: 'center',
            }}>
            Register
          </Text>
        </View>

        {/* Name section */}
        <View
          style={{
            marginTop: 22,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 32,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: COLORS.black,
                }}>
                First Name
              </Text>
              <View
                style={{
                  width: 170,
                  height: 48,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  borderRadius: 8,
                }}>
                <TextInput
                  keyboardType="default"
                  placeholder="Enter first name"
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: COLORS.black,
                }}>
                Last Name
              </Text>
              <View
                style={{
                  width: 170,
                  height: 48,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  borderRadius: 8,
                }}>
                <TextInput
                  keyboardType="default"
                  placeholder="Enter last name"
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    width: '100%',
                  }}
                />
              </View>
            </View>
          </View>

          {/* Email section */}
          <View
            style={{
              marginBottom: 32,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: COLORS.black,
              }}>
              Email address
            </Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 8,
              }}>
              <TextInput
                keyboardType="email-address"
                placeholder="Enter email address"
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '100%',
                  paddingLeft: 10,
                }}
              />
            </View>
          </View>

          {/* NIC section */}
          <View
            style={{
              marginBottom: 32,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: COLORS.black,
              }}>
              NIC Number
            </Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 8,
              }}>
              <TextInput
                keyboardType="numeric"
                placeholder="Enter NIC number"
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '100%',
                  paddingLeft: 10,
                }}
              />
            </View>
          </View>

          {/* Phone Number section */}
          <View
            style={{
              marginBottom: 32,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: COLORS.black,
              }}>
              Phone Number
            </Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 8,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder="+94"
                keyboardType="numeric"
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '12%',
                  height: '100%',
                  marginLeft: 10,
                }}
              />
              <TextInput
                placeholder="Enter phone no."
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '80%',
                  height: '100%',
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 16,
                color: COLORS.black,
              }}>
              If you have an accout{' '}
              <Text
                style={{
                  color: COLORS.primary,
                }}
                onPress={() => navigation.navigate('LogIn')}>
                Login
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 96,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              marginBottom: 8,
            }}>
            by register, you accept our Terms and conditions
          </Text>
          <Button
            onpress={() => navigation.navigate('CreatePassword')}
            title="Register"
            filled
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
