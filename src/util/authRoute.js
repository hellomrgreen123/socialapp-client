import React, {useContext} from 'react'

import {Route,Redirect} from 'react-router-dom'
import {AuthContext} from '../components/Context/auth'
const AuthRoute= ({component:Component,...rest}) =>{
    const {user} =useContext(AuthContext)
    console.log(user)
    console.log('user')
    return(
        <Route
        {...rest}
        render={props=>
        user?<Redirect to="/"/>: <Component{...props}/>
    }/>
    )
}

export default AuthRoute
