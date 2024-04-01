import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './URL'

const fetchBalance = ({id}) => {
    const [balance, setBalance] = useState(null);
    useEffect(()=>{
        const fetchBalance=async ()=>{
          try {
            const response = await axios.post(`${URL}/api/balance`, {
              id: id,
            });
            if (response) {
              setBalance(response.data.balance)
              
              
            }
            if(response.data.success===false){
              setBalance(0)
            }
          } catch (error) {
            console.log(error);
            
          }
        }
        fetchBalance()
      })
  return (
    balance
  )
}

export default fetchBalance

const styles = StyleSheet.create({})