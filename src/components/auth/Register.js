import React, {Component} from 'react';
import {View, Text, Button,TextInput} from 'react-native'
import firebase from 'firebase';

class Register extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:'',
      password:'',
      name:''
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp(){
    const {name, password, email } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid).set({name,email})
      console.log(result)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  render(){
    return(
      <View>
          <TextInput placeholder='name' onChangeText={(name)=>this.setState({name})}/>
          <TextInput placeholder='email' onChangeText={(email)=>this.setState({email})}/>
          <TextInput placeholder='password' secureTextEntry={true} onChangeText={(password)=>this.setState({password})}/>
          <Button title='signUp' onPress={()=>this.onSignUp()}/>
      </View>
    )
  }
}

export default Register