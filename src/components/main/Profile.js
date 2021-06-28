import React,{useState, useEffect} from 'react';
import firebase from 'firebase'
require('firebase/firestore')
import {connect} from 'react-redux'
import {StyleSheet,View, Text, Image, FlatList, Button} from 'react-native';

function Profile(props){
  const [userPosts, setUserPost] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)


  const Follow = ()=>{
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowing')
    .doc(props.routes.params.uid)
    .set({})

  }

  const unFollow = ()=>{
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowing')
    .doc(props.routes.params.uid)
    .delete()

  }
  useEffect(()=>{
    const {currentUser, posts} = props

    if(props.route.params.uid == firebase.auth().currentUser.uid){
        setUser(currentUser)
        setUserPost(posts)
    }else{
      firebase.firestore()
      .collection('user')
      .doc(props.route.params.uid)
      .get()
      .then((snapshot)=>{
        if(snapshot.exists){
          setUser(snapshot.data)
        }else{
          console.log('does not exists')
        }
      })

      firebase.firestore()
      .collection('posts')
      .doc(props.route.params.uid)
      .collection('userPosts')
      .orderBy('creation','asc')
      .get()
      .then((snapshot)=>{
        let posts = snapshot.docs.map(doc=>{
          const data = doc.data();
          const id = doc.id
          return{id,...data}
        })
        setUserPost(posts)
      })
    }

    if(props.following.indexOf(props.routes.params.uid) > -1){
      setFollowing(true)
    }
  },[props.routes.params.uid, props.following])

  if(user==null) return <View/>
  
  return(
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>
          {user.name}
        </Text>
        <Text>
          {user.email}
        </Text>

        {props.routes.params.uid !== firebase.auth().currentUser.uid ? ( 
        <View>
          {following?(
            <Button 
              type='Following'
              onPress={()=>unFollow()}
            />
          ):(
            <Button 
              type='UnFollowing'
              onPress={()=>Follow()}
            />
          )}
        </View>
        ) : null}

      </View>
      <View style={styles.containerGallery}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={userPosts}
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
  posts:store.userState.posts,
  following:store.userState.following
})

export default connect(mapStateToProps,null)(Profile)