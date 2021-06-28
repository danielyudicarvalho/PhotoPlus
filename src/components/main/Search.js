import React, {useState} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');


export default function Search(props){
  const [users, setUsers] = useState([]);

  const fetchUsers = (search)=>{
    firebase.firestore()
    .collection('user')
    .where('name', '>=', search)
    .get()
    .then((snapshot)=>{
      let users = snapshot.docs.map(doc=>{
        const data = doc.data();
        const id = doc.id
        return {id, ...data}
      })
      setUsers(users);
    })
  }


  return(
    <View>
      <TextInput placeholder='digite aqui...' onChangeText={(search)=>fetchUsers(search)}/>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item})=>{
          <TouchableOpacity
            onPress={()=>props.navigation.navigate("Profile",{uid:item.id})}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
          
        }}
      >
      </FlatList>
    </View>
  )
}