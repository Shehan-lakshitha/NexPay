import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './URL';

const fetchHistory = ({id,balance}) => {
    const [history, setHistory] = useState(null);
    useEffect(()=>{
        const fetchHistory=async ()=>{
          try {
            const response = await axios.post(`${URL}/api/paymenthistory`, {
              id: id,
            });
            if (response) {
              setHistory(response.data.payments)
               
            }
          } catch (error) {
            console.log(error);
            
          }
        }
        fetchHistory()
  
      },[balance]) 
  return (
 history
  )
}

export default fetchHistory

const styles = StyleSheet.create({})