import React,{useState} from 'react';
import {connect} from 'react-redux'
import {StyleSheet,View, Text, Image, FlatList} from 'react-native';

function Profile(props){
  const [userPost, setUserPost] = useState([])
  const [User, setUser] = useState(null)
  const {currentUser, posts} = props;
  
  console.log()
  return(
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>
          {currentUser.name}
        </Text>
        <Text>
          {currentUser.email}
        </Text>
      </View>
      <View style={styles.containerGallery}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            renderItem={({item})=>(
              <View style={styles.containerImage}>
                  <Image
                    style={styles.image}
                    source={{uri:item.downloadURL}}
                  />
              </View>
              
            )}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:40
  },
  containerInfo:{
    margin:20
  },
  containerGallery:{
    flex:1
  },
  image:{
    flex:1,
    aspectRatio:1/1
  },
  containerImage:{
    flex:1/3
  }
})

const mapStateToProps = (store)=>({
  currentUser:store.userState.currentUser,
  posts:store.userState.posts
})

export default connect(mapStateToProps,null)(Profile)