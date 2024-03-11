import { useState } from "react";

const [secret, setSecret] = useState('');
const [err,setErr]=useState('')
const [secretValidity,setSecretValidity]=useState(true)
const [mail, setmail] = useState('');
const [mailValidity,setMailValidity]=useState(true)
export const checkValidPassword=(value)=>{
    const minLength = 8; 
    const uppercaseRegex = /[A-Z]/; 
    const lowercaseRegex = /[a-z]/; 
    const digitRegex = /[0-9]/; 
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; 

    
   if(value.length >= minLength && uppercaseRegex.test(value) && lowercaseRegex.test(value) && digitRegex.test(value) && specialCharRegex.test(value)){
    setSecretValidity(true)
    setSecret(value)

   }else{
    setSecretValidity(false)
    setErr('Weak Password')
   }
   return {secret,err,secretValidity}
  }


export const checkValidEmail = (text) => {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    setmail(text);
    if (emailRegex.test(text)) {
        
        setMailValidity(true);
        setmail(text)
    } else {
        setMailValidity(false) 
        setErr('Invalid Email') 
    }
    return {mailValidity,mail,err}
};