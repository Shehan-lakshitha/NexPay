import React from 'react';
import {Text, View} from 'react-native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Toast = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        top: '20%',
        height: 90,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        position: 'absolute',
        shadowColor: COLORS.black,
        shadowOpacity: 0.4,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        elevation: 5,
      }}>
      <Icon name="exclamation" size={24} color={COLORS.white} />
      <View>
      <Text
        style={{
          marginLeft: 15,
          color: COLORS.white,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Passwords Mismatch
      </Text>
      <Text
      style={{
        marginLeft: 15,
        color: COLORS.white,
        fontSize: 15,
      }}>
        The passwords you entered do not match. Please try again.
      </Text>
      </View>
      
    </View>
  );
};

export default Toast;
