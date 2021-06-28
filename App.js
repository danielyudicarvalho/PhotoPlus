import * as firebase from 'firebase';
import "firebase/firestore";
require('firebase/auth');
require('firebase/app')
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './src/redux/reducer';
import thunk from 'redux-thunk';
import Login from './src/components/auth/Login';
import LandingScreen from './src/components/auth/Landing';
import Register from './src/components/auth/Register';
import Add from './src/components/main/Add';
import Main from './src/components/Main';
import Save from './src/components/main/Save';

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAlm3c8GJ4j4KJb32N3yj4k8bmrhW6y3nw",
  authDomain: "photo-76371.firebaseapp.com",
  databaseURL: "https://photo-76371-default-rtdb.firebaseio.com",
  projectId: "photo-76371",
  storageBucket: "photo-76371.appspot.com",
  messagingSenderId: "157159573286",
  appId: "1:157159573286:web:106f2f6ae2172e051a23e7",
  measurementId: "G-7N4BM5SLW2"
}

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      logged:false,
      loaded:false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          logged:false,
          loaded:true,
        })
      }else{
        this.setState({
          logged:true,
          loaded:true
        })
      }
    })
  }
  render(){
    const {loaded, logged} = this.state;

    if(!loaded){
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    if(!logged){
      return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Landing'>
              <Stack.Screen name='Landing' component={LandingScreen}></Stack.Screen>
              <Stack.Screen name='Register' component={Register}></Stack.Screen>
              <Stack.Screen name='Login' component={Login}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer> 
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Main'>
              <Stack.Screen name='Main' component={Main}></Stack.Screen>
              <Stack.Screen name='Add' component={Add} navigation={this.props.navigation}></Stack.Screen>
              <Stack.Screen name='Save' component={Save} navigation={this.props.navigation}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer> 
      </Provider>
      
    )
    
  }
  
}
export default App
