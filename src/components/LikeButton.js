import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Button, Label, Icon,Popup} from 'semantic-ui-react'
const LikeButton=({user,post:{id,likeCount,likes}})=>{
    const [liked,setLiked] =useState(false)
 useEffect(()=>{
     if(user && likes.find(like=>like.username===user.username)){
             setLiked(true)
     }else{
         setLiked(false)
     }
 },[user,likes]
 )
 const [likePost]= useMutation(LIKE_POST_MUTATION,{
     variables:{postId:id}
 })
 const likeButton = user ?(
     liked?
     (       <Popup
        content="Like post"
        inverted
        trigger={
    <Button color="teal">
     <Icon name="heart" />
        </Button>}/>):(       <Popup
       content="Unlike post"
       inverted
       trigger={
        <Button color="teal" basic>
    <Icon name="heart" />
  </Button>}/>)
   ):(       <Popup
    content="Like post"
    inverted
    trigger={
    <Button as={Link} to='/login' color="teal" basic>
<Icon name="heart" />
    </Button>}/>)
 
 return (
    <Button as="div" labelPosition="right" onClick={likePost}>
    {likeButton}
    <Label basic color="teal" pointing="left">
      {likeCount}
    </Label>
  </Button>
    
 )
}

const LIKE_POST_MUTATION=gql`
    mutation likePost($postId:ID!){
        likePost(postId:$postId){
            id
            likes{
                id username
            }
            likeCount

        }
    }
`
export default LikeButton