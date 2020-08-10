import React,{useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {Button,Confirm, Icon,Popup} from 'semantic-ui-react'
import {FETCH_POSTS_QUERY} from '../util/graphql'
const DeleteButton =({postId,commentId,callback,comment})=>{
     const [confirmOpen,setConfirmOpen]= useState(false);
     const mutation = commentId? DELETE_COMMENT_MUTATION:DELETE_POST_MUTATION  

     const [deleteItem]= useMutation(mutation,{
        update(proxy,result){
            setConfirmOpen(false);
            console.log(commentId)
            if(!commentId){
            const data= proxy.readQuery({
                 query: FETCH_POSTS_QUERY
             })
             data.getPosts= data.getPosts.filter(p=>p.id !== postId)
             proxy.writeQuery({query:FETCH_POSTS_QUERY,data})
            }
             if(callback) callback();
            } ,
    variables:{
         postId,
         commentId
     }
})
    return(
        <>
               <Popup
       inverted
       content={commentId? 'Delete comment': 'Delete post'}
       trigger={
        <Button as="div" color="red" 
        floated="right"
        onClick={()=> setConfirmOpen(true)}>
          <Icon name="trash" style={{margin:0}}/>
        </Button>}/>
        <Confirm
        open={confirmOpen}
        onCancel={()=> setConfirmOpen(false)}
        onConfirm={deleteItem}/>
        </>
        )
 }

 const DELETE_POST_MUTATION=gql`
 mutation deletePost($postId:ID!){
     deletePost(postId:$postId)
 }
`

const DELETE_COMMENT_MUTATION= gql`
mutation deleteComment($postId:ID!, $commentId:ID!){
    deleteComment(postId:$postId,commentId:$commentId){#
    id
    comments{
        id username createdAt body
    }
    commentCount
    }
}`

 export default DeleteButton