import React, {useState} from 'react';
import {View, Text, FlatList, TextInput} from 'react-native'
import firebase from 'firebase'
require ('firebase/firestore')

export default function Feed(){

  const [users, setUsers] = useState([])


  const fetchUsers = (search)=>{
    firebase.firestore()
    .collection('users')
    .where('name','>=', search)
    .get()
    .then((snapshot)=>{
      let users = snapshot.docs.map(doc=>{
        const data = doc.data
        const id = doc.id
        return {id, ...data}

      })
      setUsers(users)
    })

  }


  return(
    <View>
      <TextInput onChange={(search)=>fetchUsers(search)}/>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item})=>{
          <Text>{item.nome}</Text>
          
        }}
      />
    </View>
  )
}