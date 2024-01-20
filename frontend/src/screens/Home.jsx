import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let date = moment().format('llll');
    setCurrentDate(date);
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.Date}>{`Today ${currentDate}`}</Text>
          <Text style={styles.name}>Amila Rathnayaka</Text>
        </View>
        <View style={styles.headerBtns}>
          <TouchableOpacity>
            <Icon name="" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    margin: 25,
  },
  header: {
    flexDirection: 'row',
  },
  headerTitleContainer: {
    flexDirection: 'column',
  },
  Date: {
    color: COLORS.black,
    fontSize: 11,
  },
  name: {
    color: COLORS.black,
    fontSize: 24,
  },
  headerBtns: {},
});
