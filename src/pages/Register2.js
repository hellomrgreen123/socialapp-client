import react,{useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
const Register =(props)=>{
    const [errors,setErrors]=useState({})
    const [username,setUsername]=useState('') 
    const [email,setEmail]=useState('') 
    const [password,setPassword]=useState('') 
    const [confirmPassword,setConfirmPassword]=useState('') 

    const [addUser,{loading }] = useMutation(REGISTER_USER,{
        update(_,data){
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            console.log(errors)
        },
        variables:{
            username:username,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }
    }
    )
    const onSubmit=(e)=>{
        e.preventDefault();
        addUser;
    }
    return (

        <div>
        <form onSubmit={onSubmit} noValidate className={loading? "loading":''}>
            <input placeholder={'username'} 
            value={username }
            onChange={(e)=>setUsername(e.target.value)}
            error={errors.username? true:false}
            />
            <input placeholder={'email'} 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            error={errors.email? true:false}/>
            <input placeholder={'password'} 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            error={errors.password? true:false}/>
            
            <input placeholder={' confirm password'} 
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            error={errors.confirmPassword? true:false}
            />

        </form>
      {Object.keys(errors).length>0 &&(
            <div className="ui error message">
            <ul className="list">
                {Object.values(errors).map(value=>(
                    <li key={value}>{value}</li>
                ))}
            </ul>
        </div>
      )}
        </div>
    )
}

const REGISTER_USER= gql`
    mutation register($username:String{
        $username:String!
        $emaii:String!
        $password:String!
        $confirmPassword:String!
    }{
        register(
            registerInput:{
                username:$username
                email:$email
                password:$password
                confirmPassword:$confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`