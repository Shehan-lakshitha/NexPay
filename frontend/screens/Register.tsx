import React from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Register = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 22,
          marginTop: 22,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '500',
            color: COLORS.black,
            alignSelf: 'center',
          }}>
          Register
        </Text>
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
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
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
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    width: '100%',
                  }}
                />
              </View>
            </View>
          </View>
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
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '100%',
                }}
              />
            </View>
          </View>
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
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '100%',
                }}
              />
            </View>
          </View>
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
                placeholder="Enter your phone no."
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: '80%',
                  height: '100%',
                }}
              />
            </View>
          </View>
        </View>
        <Button title = 'Register' filled 
        style ={{
          marginTop: 72,

        }}/>
      </View>
    </SafeAreaView>
  );
};

export default Register;
