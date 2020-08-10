import React,{useReducer,createContext} from 'react'
import jwtDecode from 'jwt-decode'


const initialState={
    user:null
}
if(localStorage.getItem('jwtToken')){
 const decodedtoken = jwtDecode(localStorage.getItem('jwtToken'))
    if(decodedtoken.exp *1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    }
    else{
            initialState.user= decodedtoken;
        }
}

const AuthContext = createContext({
    user:null,
    login:(userData)=>{},
    logout:()=>{}
})

const authReducer=(state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user:action.payload,
                
            }
            
    case 'LOGOUT':
            return{
                ...state,
                user:null
            }
            default:
                return state
    }

}
const AuthProvider= props=>{
    const [state,dispatch]= useReducer(authReducer, initialState)
    const  login  = (userData)=>{
        localStorage.setItem("jwtToken",userData.token)
        dispatch({
            type:'LOGIN',
            payload:userData
        })
        console.log(userData)
    }
    const logout=(userData)=>{
        localStorage.removeItem("jwtToken")
        dispatch({type:'LOGOUT'})
    }
    console.log(state.user)
    return(
        <AuthContext.Provider
        value={{user:state.user,login,logout}}
        {...props}/>
    )
}

export {AuthContext, AuthProvider}