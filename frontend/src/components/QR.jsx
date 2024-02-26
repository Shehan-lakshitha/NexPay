
import React from 'react'
import QRCode from "react-native-qrcode-svg";
import COLORS from '../constants/colors';
const QR = ({value}) => {
  
  
  return (
    <>
      <QRCode
       value={value}
       size={240}
       logo=''
       color='black'
       backgroundColor={COLORS.white}
       onError={(error)=>{console.log(error)}}
      
      ></QRCode>
      
    </>
  )
}

export default QR

