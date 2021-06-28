import React from 'react';
import {View,Button} from 'react-native';


export default function Landing({navigation}){
  return(
    <View style={{flex:1, justifyContent:'center'}}>
      <Button title='Register' onPress={()=>navigation.navigate("Resgister")}/>
      <Button title='Login' onPress={()=>navigation.navigate("Login")}/>
    </View>
  )
}