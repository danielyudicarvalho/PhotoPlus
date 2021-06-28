import React, {Component} from 'react';
import firebase from 'firebase'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser, fetchUserPosts, fetchUserFollowing} from '../redux/action/index';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from './main/Feed';
import Profile from './main/Profile';
import Search from './main/Search';


const EmptyScreen = ()=>{
  return(null)
}

const Tab = createMaterialBottomTabNavigator()

class Main extends Component{

  componentDidMount(){
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();

  }

  render(){
    const {currentUser} = this.props;
    return(
      <Tab.Navigator initialRoute='Feed' labeled={false}>
          <Tab.Screen name='Feed' component={Feed} 
              options={{tabBarIcon:({color})=>
              (<MaterialCommunityIcons name='home' color={color} size={26}/>)}}/>

          <Tab.Screen name='Search' component={Search} navigation={this.props.navigation} 
              options={{tabBarIcon:({color})=>
              (<MaterialCommunityIcons name='magnify' color={color} size={26}/>)}}/>
      
          <Tab.Screen
             listeners={({navigation})=>({
               tabPress:event=>{
                 event.preventDefault();
                 navigation.navigate("Add")
               }
             })}
            name='MainAdd' component={EmptyScreen} 
            options={{tabBarIcon:({color,size})=>
              (<MaterialCommunityIcons name='account-circle' color={color} size={26}/>)}}/>

          <Tab.Screen
                listeners={({navigation})=>({
                  tabPress:event=>{
                    event.preventDefault();
                    navigation.navigate('Profile',{uid:firebase.auth().currentUser.uid})
                  }
                })}
               name='Profile' component={EmptyScreen} 
              options={{tabBarIcon:({color})=>
              (<MaterialCommunityIcons name='plus-box' color={color} size={26}/>)}}/>

      </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store)=>({
  currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch)=> bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)