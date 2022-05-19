/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Post from './Post'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../firebase'

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => 
         onSnapshot(query(collection(db,'posts'), orderBy('timestamp', 'desc')), snapshot => {
          setPosts(snapshot.docs)
         })  
    , [db])

  return (
    <div>
      {posts.map((post) => (
        <Post 
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />    
        ))}
    </div>
  )
}

export default Posts