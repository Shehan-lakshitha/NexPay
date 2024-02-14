import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions,Image } from 'react-native';
import moment from 'moment';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle } from 'react-native-svg';



const { width, height } = Dimensions.get('window');

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let date = moment().format('llll');
    setCurrentDate(date);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
           
        <View style={styles.balanceBox}>
          {/* React Native equivalent for the Android RelativeLayout */}
          <View
            style={{
              width: width - 48, // Adjust the width as needed
              height: height / 6, // Adjust the height as needed
              marginLeft: 24,
              marginTop: 114,
              backgroundColor: '#8A86EA', // Adjust the background color as needed
              borderRadius: 12, // Adjust the border radius as needed
              marginLeft: 0,
            }}
          >
            
            <Text style={styles.balanceText}> Add your card</Text>
            <Text style={styles.balanceText2}>Link your credit/debit cart to make transactions.</Text>
            <View style={styles.imageContainer}>
       
            
                          <Icon name="plus" size={20} style={styles.Icon} />
                          <Icon name="bell" size={20} style={styles.Icon2} />
    
      <View style={styles.imageContainer}>
            <Image
        source={require("../assets/img1.png")}
        style={styles.image}
      />
        <View style={styles.imageContainer1}>
      <Image
        source={require("../assets/1.png")}
        style={styles.image2}
      />
      </View>
     
     </View>
      </View>
          </View>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.date}>{`Today ${currentDate}`}</Text>
          <Text style={[styles.name, { fontWeight: 'bold' }]}>Amila Rathnayaka</Text>
        </View>
        <View style={styles.imageContainer2}>
            <Image
        source={require("../assets/3.png")}
        style={styles.image3}
      />
      
        <View style={styles.headerBtns}>
          <TouchableOpacity>
            {/* You need to provide a valid icon name and import the Icon component */}
            {/* For example: <Icon name="your-icon-name" size={24} color={COLORS.black} /> */}
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <View
      style={{
        width: width - 300,
        height: height / 11,
        marginLeft: 24,
        marginTop: 40, // Adjust the marginTop to provide space between the two boxes
        backgroundColor: '#8A86EA',
        borderRadius: 12,
        marginLeft: 0,
        
      }}
    >
      <Text style={styles.boxText1}> Add credit</Text>
      <Image
        source={require("../assets/1.png")}
        style={styles.boximage1}
      />
      <Image
        source={require("../assets/wallet.png")}
        style={styles.boximage11}
      />
      </View>
      
      <View
      style={{
        width: width - 300,
        height: height / 11,
        
        marginTop: -79, // Adjust the marginTop to provide space between the two boxes
        backgroundColor: '#8A86EA',
        borderRadius: 12,
        marginLeft: 127,
        
      }}
    >
      <Text style={styles.boxText2}> Transfer</Text>
      <Image
        source={require("../assets/1.png")}
        style={styles.boximage1}
      />
      <Image
        source={require("../assets/transfer.png")}
        style={styles.boximage11}
      />
      </View>
      <View
      style={{
        width: width - 300,
        height: height / 11,
        marginTop: -80, // Adjust the marginTop to provide space between the two boxes
        backgroundColor: '#8A86EA',
        borderRadius: 12,
        marginLeft: 253,
        
      }}
    >
       <Text style={styles.boxText3}> History</Text>
       <Image
        source={require("../assets/1.png")}
        style={styles.boximage1}
      />
       <Image
        source={require("../assets/history.png")}
        style={styles.boximage11}
      />
      
      </View>
      <View style={styles.headerTitleContainer1}> 
  <Text style={[styles.services, { fontWeight: 'bold' }]}>Services</Text>
  <View style={styles.line} />
</View>
<View style={styles.headerTitleContainer1}> 
<View style={styles.bill11}>
  <Image
    source={require("../assets/Vector.png")}
    style={styles.bill}
  />
</View>
<View style={styles.mobile1}>
  <Image
    source={require("../assets/mobile.png")}
    style={styles.mobile}
  />
</View>
<View style={styles.rewards1}>
  <Image
    source={require("../assets/award.png")}
    style={styles.rewards}
  />
</View>
<View style={styles.check1}>
  <Image
    source={require("../assets/balance.png")}
    style={styles.check}
  />
</View>
</View>
<View style={styles.servicestextContainer1}>
  <Text style={[styles.servicestext, ]}>bill{'\n'}payment</Text>
  <Text style={[styles.servicestext2, ]}>Mobile{'\n'}top up</Text>
  <Text style={[styles.servicestext3, ]}>Rewards</Text>
  <Text style={[styles.servicestext4, ]}>Check{'\n'}balance</Text>
  </View>


  <View style={styles.headerTitleContainer1}> 
  <Text style={[styles.services, { fontWeight: 'bold' }]}>Recent transactions</Text>
  <View style={styles.line} />
</View>

<View style={{
  width: 420,
  height: 113,
  borderRadius: 40,
  backgroundColor: '#8A86EA', 
  marginLeft: -30,
  marginTop: 150,
}}>
 <Image
        source={require("../assets/1.png")}
        style={styles.footer}
      />
      <Image
        source={require("../assets/qr.png")}
        style={styles.qr}
      />
</View>

<View style={styles.picContainer}>
<Image
        source={require("../assets/home.png")}
        style={styles.footer1}
      />
      <Image
        source={require("../assets/stock-price.png")}
        style={styles.footer2}
      />
      <Image
        source={require("../assets/wallet1.png")}
        style={styles.footer3}
      />
      <TouchableOpacity
  onPress={() => {
    // Add the functionality you want when the button is pressed
    console.log('Button pressed');
  }}
  style={styles.footer4}
>
  <Image
    source={require("../assets/user.png")}
    
  />
</TouchableOpacity>
</View>
    </SafeAreaView>
    

  );
}


const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  header: {
    flexDirection: 'row',
  },
  balanceBox: {
    flex: 1,
  },

  balanceText: {
    fontFamily: 'Euclid Circular A',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 30,
    color: '#FCFEFF',
    fontWeight: 'bold',
    paddingTop: 30,
    marginLeft:40,
  },

  balanceText2: {
    fontFamily: 'Euclid Circular A',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    color: '#FCFEFF',
    paddingTop: 10,
    marginLeft:45,
    width:200,
  },

  boxText1: {
    fontFamily: 'Euclid Circular A',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 30,
    color: '#FCFEFF',
    fontWeight: 'bold',
    paddingTop: 30,
    marginLeft:9,
  },

  boxText3: {
    fontFamily: 'Euclid Circular A',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 30,
    color: '#FCFEFF',
    fontWeight: 'bold',
    paddingTop: 30,
    marginLeft:25,
  },

  boxText2: {
    fontFamily: 'Euclid Circular A',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 30,
    color: '#FCFEFF',
    fontWeight: 'bold',
    paddingTop: 30,
    marginLeft:16,
  },
  headerTitleContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the start of the container (top)
    marginLeft: -175,
  },
  servicestextContainer1: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the start of the container (top)
    marginLeft: 10,
    paddingTop: 30,
   
  },
  date: {
    color: COLORS.black,
    fontSize: 11,
  },
  image: {
    width: 90, // Set your desired width
    height: 90, // Set your desired height
    borderRadius: 25,
  },
  image2: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height
    borderRadius: 25,
  },
  image3: {
    width: 25,           // Set your desired width
    height: 25,          // Set your desired height
    borderRadius: 25,
  },
  boximage1: {
    width: 50,           // Set your desired width
    height: 50,          // Set your desired height
    marginLeft: 30,
    marginTop: -85,
    
  },
  bill: {
      width: 30,           // Set your desired width
      height: 30,          // Set your desired height
  },
  mobile: {
    width: 30,           // Set your desired width
    height: 30,  
  },
 rewards: {
    width: 30,           // Set your desired width
    height: 30,
  },
  check: {
     width: 30,           // Set your desired width
     height: 30,   
    
  },
  boximage11: {
    width: 27,           // Set your desired width
    height: 27,          // Set your desired height
    marginLeft: 40,
    marginTop: -40,
    
  },
  footer: {
    width: 80,           // Set your desired width
    height: 80,          // Set your desired height
    marginLeft: 180,
    marginTop: -50,
  },
  footer1: {
    width: 30,           // Set your desired width
    height: 30,          // Set your desired height
    marginLeft: 0,
    marginTop: -90,
  },
  footer2: {
    width: 30,           // Set your desired width
    height: 30,          // Set your desired height
    marginLeft:90,
    marginTop: -30,
  },
  footer3: {
    width: 30,           // Set your desired width
    height: 30,          // Set your desired height
    marginLeft:230,
    marginTop: -30,
  },
  footer4: {
    width: 30,           // Set your desired width
    height: 30,          // Set your desired height
    marginLeft:320,
    marginTop: -30,
  },
  qr: {
    width: 50,           // Set your desired width
    height: 50,          // Set your desired height
    marginLeft: 195,
    marginTop: -60,
  },
  Icon: {
    marginLeft: 325,
    marginTop: -80,
    color: '#8A86EA',  // Black color
    zIndex: 1,
  },
  Icon2: {
    marginLeft: 340,
    marginTop: -150,
    color: '#000000', 
    

  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  imageContainer1: {
    position: 'absolute',
    bottom: 100,
    right: 15,
    },
  imageContainer2: {
    position: 'absolute',
    bottom: 230,
    right: 35,
  },
  bill11: {
    position: 'absolute',
    bottom: -75,
    right: 295,
    borderColor: '#8A86EA',
    borderWidth: 2, // Adjust the border width as needed
    borderRadius: 12, // Adjust the border radius as needed
    padding: 13,
  },
  mobile1: {
    position: 'absolute',
    bottom: -75,
    right: 195,
    borderColor: '#8A86EA',
    borderWidth: 2, // Adjust the border width as needed
    borderRadius: 12, // Adjust the border radius as needed
    padding: 13,
  },
  rewards1: {
    position: 'absolute',
    bottom: -75,
    right: 95,
    borderColor: '#8A86EA',
    borderWidth: 2, // Adjust the border width as needed
    borderRadius: 12, // Adjust the border radius as needed
    padding: 13,
  },
  check1: {
    position: 'absolute',
    bottom: -75,
    right: 0,
    borderColor: '#8A86EA',
    borderWidth: 2, // Adjust the border width as needed
    borderRadius: 12, // Adjust the border radius as needed
    padding: 13,
  },
  
  name: {
    color: '#32313A',
    fontSize: 24,
  },
  services: {
    fontFamily: "Euclid Circular A",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 600,
    color: '#32313A',
    marginTop: 20,
    marginLeft: 0,
  },
  servicestext: {
    color: '#32313A', // Assuming COLORS is a variable defined elsewhere
    fontSize: 15,
    marginTop: 45,
    marginLeft: -300,
    textAlign: 'center',
  },
  servicestext2: {
    color: '#32313A', // Assuming COLORS is a variable defined elsewhere
    fontSize: 15,
    marginTop: -39,
    marginLeft: -100,
    textAlign: 'center',
  },
  servicestext3: {
    color: '#32313A', // Assuming COLORS is a variable defined elsewhere
    fontSize: 15,
    marginTop: -40,
    marginLeft: 100,
    textAlign: 'center',
  },
  servicestext4: {
    color: '#32313A', // Assuming COLORS is a variable defined elsewhere
    fontSize: 15,
    marginTop: -20,
    marginLeft: 290,
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#8A86EA',   
  },
  headerBtns: {},
});
