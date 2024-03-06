import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,useColorScheme,ScrollView,Image, Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { URL } from '../constants/URL';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary,launchCamera} from 'react-native-image-picker';
import axios from 'axios'
import { useRoute } from '@react-navigation/native';
import QR from '../components/QR';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const route = useRoute();
  const {data}=route.params
  
  const colorScheme = useColorScheme();

  
  const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const [unFold,setUnFold]=useState(true)
  const [imagePath, setImagePath] = useState(null);
  
 const showMore=()=>{
    setUnFold(!unFold)
 }

 
    const fetchImg=async ()=>{
      try {
        const response = await axios.get(`${URL}/api/display/${data._id}`);
        
    
        setImagePath(response.data.imagePath.replace(/\\/g, '/'))
        
      } catch (error) {
        console.log(error)
      }
     }

     useEffect(()=>{
  
      fetchImg()
      
    },[data._id])

 const imgEdit=()=>{
  const options={
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  }
  launchImageLibrary(options,(response)=>{
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      
      
      uploadImg(imageUri)
    }
  })
  
 }

 handleCameraLaunch = () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      
      uploadImg(imageUri);
    }
  });
}


 const uploadImg=async (image)=>{
  const formData= new FormData()
  
  const fileType = image.split('/').pop().split('.').pop()
  formData.append('image', {
    uri: image,
    type: `image/${fileType}`,
    name: image.split('/').pop()
});

 formData.append('_id',data._id)
 try {
    const response= await axios.post(`${URL}/api/upload`,formData,
    {headers: {
     'Content-Type': 'multipart/form-data',
   },})
   
  if(response.data.message == 'success'){
        fetchImg()
  }


 } catch (error) {
   console.log(error)
 }

}

const handleButtonPress = () => {

Alert.alert(
  'Upload your image',
  'Maximum image resolution 2000*2000px',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Choose from Library',
      onPress: () => {
        imgEdit()
        
      },
    },
    {
      text: 'Take photo',
      onPress: () => {
        handleCameraLaunch()
      },
    },
  
  ],
  { cancelable: false }
);
};

const signOut = () => {
  AsyncStorage.setItem('isLoggedIn', '');
  AsyncStorage.setItem('token', '');
  navigation.navigate('GetStartedScreen');
}

return (
     <ScrollView >
    <SafeAreaView style={[styles.Container,{backgroundColor}]}>
      <View style={styles.subContainer}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()}>
          <Icon name="sign-out" size={24} color={COLORS.black}/>
      </TouchableOpacity>
      
    </View>
    <View style={styles.userContainer}>
      
          <View style={unFold? styles.usercon:styles.unfold}>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{`${data.firstName} ${data.lastName}`}</Text>
            <Text style={styles.textNum}>{data.phoneNumber}</Text>
          </View>
            {unFold? '':<View style={ styles.qrStyles}><QR value={data._id}/></View>}
           {unFold? '': <View style={styles.subtextcon}>
              <Text style={styles.subtext}>Scan this for receiving transactions</Text>
            </View>}
          <TouchableOpacity style={styles.imgEdit} onPress={handleButtonPress}><Icon name="pencil-square-o" size={36} color={COLORS.white} /></TouchableOpacity>
          <View style={styles.shape1}></View>
          <View style={unFold ? "":styles.shape2}></View>
          <TouchableOpacity style={styles.showMore}><Text style={styles.showText} onPress={showMore}>{unFold? 'Show QR':'Hide QR'}</Text></TouchableOpacity>
          </View>
          <View style={[styles.profile,{backgroundColor}]}>
              <View style={styles.imgContainer}><Image source={{ uri: `${URL}/${imagePath}` }} style={styles.img}></Image></View>
          </View>
          
          

      </View>
      <View style={styles.tabContainer}>
      <View style={[styles.tabRow,{backgroundColor}]}>
        <View style={styles.tabtab}>
          <View style={styles.tab}>
          <TouchableOpacity  >
            <Icon name="pencil-square-o" size={40} color={COLORS.purple} />
            </TouchableOpacity>
          </View>
          <Text style={styles.tabText}>Edit profile</Text>
          </View>
        <View style={styles.tabtab}><View style={styles.tab}>
          <TouchableOpacity ><Icon name="lock" size={40} color={COLORS.purple} /></TouchableOpacity>
          </View>
          <Text style={styles.tabText}>Security</Text>
          </View>
        <View style={styles.tabtab}>
          <View style={styles.tab}>
            <TouchableOpacity >
              <Icon name="question-circle-o" size={40} color={COLORS.purple} />
              </TouchableOpacity>
              </View>
              <Text style={styles.tabText}>Help</Text>
              </View>
        
      </View>
      <View style={[styles.tabRow,{backgroundColor}]}>
        <View style={styles.tabtab}>
          <View style={styles.tab}>
            <TouchableOpacity ><Icon name="gift" size={40} color={COLORS.purple} /></TouchableOpacity>
            </View>
            <Text style={styles.tabText}>Offers & Rewards</Text>
            </View>
      <View style={styles.tabtab}>
        <View style={styles.tab}>
          <TouchableOpacity >
            <Icon name="sign-out" size={40} color={COLORS.purple} />
            </TouchableOpacity>
            </View>
            <Text style={styles.tabText}>Logout</Text>
            </View>
            </View>
      </View>
      </View>
    </SafeAreaView>
    </ScrollView> 
    
  );
}
const styles = StyleSheet.create({
  Container: {
     
    flex:1,
    
  },
  subContainer:{
      margin:25
  },
  header: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  userContainer:{
      flex:1,
      marginTop:50,
      position:"'relative'"
      
  },
  usercon:{ 
      height: 230,
      borderRadius:25,
      backgroundColor:COLORS.purple,
      overflow:"hidden"
  },
  textContainer:{
    marginTop:100,
    zIndex:100,
    gap:3
  },
  textName:{
    
    textAlign:'center',
   
    
    fontSize:25,
    fontWeight:'600',
    color:COLORS.white
    
  },
  textNum:{
    textAlign:'center',
    
    fontSize:15,
    fontWeight:'400',
    color:COLORS.white
  },
  profile:{
      borderRadius:75,
      height:130,
      width:130,
      position:"absolute",
      left:"31%",
      top:-50
      
      
  },
  imgEdit:{
    position:'absolute',
    top:15,
    left:15
  },
  imgContainer:{
      borderRadius:75,
      height:110,
      width:110,
      position:"absolute",
      left:"8%",
      top:10,
      overflow:'hidden',
      backgroundColor:"#C3ACD0",
     
  },
  img:{
      height:110,
      width:110,
      resizeMode:"cover"
  },
  shape1:{
      position:"absolute",
      right:-10,
      top:-20,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 60,
      
  
  transform: [{ rotate: '45deg' }],
      height:150,
      width:150,
      backgroundColor:COLORS.low_purple,
      opacity:0.7,
  },
  qrStyles:{
      margin:50,
      marginTop:18,
      marginBottom:0,
      zIndex:100,
      display:'hidden'

  },
  qrHidden:{
    display:'hidden'
  },
  subtextcon:{
    marginTop:10,
    zIndex:100,
    marginBottom:10
  },
  subtext:{
    textAlign:'center',
    color:COLORS.low_grey,
    fontWeight:'400',
    fontSize:16
  },
  shape2:{
      position:"absolute",
      left:-15,
      bottom:-15,
      borderTopLeftRadius:180,
      borderTopRightRadius: 80,
      borderBottomRightRadius:180,
      
      
  
  transform: [{ rotate: '15deg' }],
      height:200,
      width:120,
      backgroundColor:COLORS.low_purple,
      opacity:0.7,
  },
  showMore:{
      position:"absolute",
      justifyContent:"center",
      alignItems:"center",
      bottom:15,
      borderRadius:25,
      left:"35%",
      height:35,
      width:100,
      backgroundColor:COLORS.white,
      elevation:5
  },
  showText:{
      color:COLORS.black,
      fontWeight:"600"
  },
  unfold:{
      height: 510,
      borderRadius:25,
      backgroundColor:COLORS.purple,
      overflow:"hidden"
  },
  tabContainer:{marginTop:80,marginBottom:95},
  tabtab:{
   flexDirection:"column",
   alignItems:"center",
   gap:5
  },
  tabRow:{
    
    backgroundColor:"white",
    flexDirection:"row",
    justifyContent:"flex-start",
    gap:22,
    marginTop:15
  },
  tab:{
      
      borderWidth:2,
      borderRadius:15,
      padding:20,
      borderColor:COLORS.purple,
      width:80,
      height:80,
      justifyContent:"center",
      alignItems:"center",
      
      
      
  },
  tabText:{
      color:COLORS.black,
      fontWeight:"500",
      textAlign:"center",
      width:100
  }
});
