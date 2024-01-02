import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export default function App() {


  const [test, setTest] = useState("")
  const holidayCollectionRef = collection(db, "TEST");

  useEffect(()=>{
    const getTest = async () => {
      try {
        const data = await getDocs(holidayCollectionRef)
        
      setTest(data.docs[0])
      } catch (err) {
        console.error(err)
      }
    }
    getTest()
  }, [])

  return (
    
    <View style={styles.container}>
      <Text>{test}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
