import React, {useState} from 'react';
import {View, TextInput, Image,Button } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

export default function Save(props){
  const [caption, setCaption] = useState("")

  const uploadImage = async ()=>{
    const uri = props.route.params.image;
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random.toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = snapshot =>{
      console.log(snapshot.bytesTransferred)
    }

    const taskCompleted = ()=>{
      task.snapshot.ref.getDownloadURL().then((snapshot)=>{
        savePostData(snapshot);
        console.log(snapshot)
      })
    }

    const taskError = snapshot=>{
      console.log(snapshot)
    }

    const savePostData = (downloadURL)=>{
      firebase.firestore().collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore().FieldValue.serverTimestamp()
      }).then((function(){
        props.navigation.popToTop()
      }))
    }

    task.on('state_changed', taskCompleted, taskProgress, taskError)
  

  return(
    <View style={{flex:1}}>
      <Image src={{uri:props.route.params.image}}></Image>
      <TextInput 
        placeholder='write a comment' 
        onChangeText={(caption)=> setCaption(caption)}/>
        <Button title='save' onPress={()=>uploadImage()}></Button>
    </View>
  )
}}
