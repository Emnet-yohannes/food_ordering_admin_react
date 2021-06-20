import React, { useState, useEffect } from 'react'
import Navigation from './Components/Navigation/Navigation'
import Login from './Components/Login/Login'
import Signup from "./Components/Signup/SIgnup"
import ref from './firebase/firebase'
import { BrowserRouter as Router, Link, Switch ,Redirect} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import {AuthProvider} from './Auth/Auth'
import PrivateRoute from './Auth/PrivateRoute'
// import { FirestoreProvider } from "@react-firebase/firestore";

const App = () => {

  return (

    <Router>
    <AuthProvider>
      <div style={{display:"flex"}}>

        {/* <Navigation routes={routes}/> */}
        {/* {orders.map((order)=>(
        <h1>
            {order.food_name}
        </h1>
      ))} */}
 
      <Route path="/login" exact strict component={Login}/>
      <Route path="/signup" exact strict component={Signup}/>
      <PrivateRoute path="/admin" component={Navigation} />
      <Route exact path="/" render={() => (<Redirect to="/admin/dashboard" />)} />

      </div>
    </AuthProvider>
    </Router>

  )
}

export default App
