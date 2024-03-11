import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity,} from 'react-native'
import React, { useState} from 'react'
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CameraScreen } from 'react-native-camera-kit';
import Button from '../components/Button';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const QRScan = ({navigation}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [data,setData]=useState('')

 

 const qrDataHandle=(event)=>{
  if(isScanning){
    
    setData(event.nativeEvent.codeStringValue)
   
  setIsScanning(false);
  }
 

  
  setTimeout(() => {
    setIsScanning(true);
  }, 5000);
 }
 
    const renderButton=()=>{
      return(
        <Button  style={styles.continueBtn}
        title="Continue"
        filled
        onpress={()=>(navigation.navigate('Home'))}></Button>
      )
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Scan the QR code</Text>
      </View>
      <View style={styles.cameraContainer}>
      <CameraScreen
      actions={undefined}
      onBottomButtonPressed={undefined}
      flashImages={ {
        
        on: require('../Assets/qr.png'),
        auto: require('../Assets/qr.png'),
      }}
      cameraFlipImage={require('../Assets/img1.png')} 
       cameraFlipImageStyle={{display:'none'}}
       captureButtonImage={require('../Assets/img1.png')} 
       captureButtonImageStyle={{display:'none'}}
       torchOnImage={require('../Assets/img1.png')} 
       torchOnImageStyle={{display:'none'}}
       
      torchOffImage={require('../Assets/img1.png')} 
      torchOffImageStyle={{display:'none'}}
       scanBarcode={isScanning}
       onReadCode={qrDataHandle}
       style={styles.camera}
  
  
/>
       

      </View>
      <View >
        <Text style={styles.subtext} >Align the QR code within the frame to start scanning</Text>
      </View>
      
      <View style={styles.qrContainer}>
        <TouchableOpacity >
        <MaterialIcon name='qrcode' size={40} color='black'/>
        </TouchableOpacity>
        <Text style={styles.flashertext}>{'Show QR'}</Text>
        
      </View>
      {data? renderButton():''}
    </SafeAreaView>
  )
  }


export default QRScan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 28, 
      },
      header: {
        flexDirection: 'row',
        margin:25,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      headertitle: {
        color: COLORS.black,
        
        width:150,
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: '35%',
      },
      cameraContainer: {
        height: 400,
        borderRadius: 16,
        overflow:'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      },
      camera: {
        flex: 1,
        width: '100%',
        
        
      },
      scanner:{
        
        height:300,
        marginTop:50,
        borderRadius:15,
      },
      subtext:{
         textAlign:'center',
         fontSize:16,
         fontWeight:'400',
         color:COLORS.subText,
         marginTop:40
      },
      continueBtn:{
          marginTop:20
      },
      qrContainer:{
        flexDirection:'column',
        alignItems:'center',
        marginTop:30,
        marginBottom:30
      }

})