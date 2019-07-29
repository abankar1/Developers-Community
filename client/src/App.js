import React,{useEffect} from 'react';
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import{BrowserRouter as Router,Route,Switch} from "react-router-dom"
import "./App.css"
import {Provider} from "react-redux"
import store from "./store"
import AlertMessage from "./components/layout/alert"
import {loadUser} from "./actions/auth"
import setAuthToken from './util/setAuthtToken';
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "../src/components/Routing/PrivateRoute"
import CreateProfile from "../src/components/profile-form/Createprofile"
import Editprofile from "../src/components/profile-form/Editprofile"
import Addexperience from "../src/components/profile-form/Addexperience"
import Addeducation from "../src/components/profile-form/Addeducation"
import Profiles from "../src/components/profiles/Profiles"
import Profile from "../src/components/profileDashboard/Profile"
if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <Router>
      <Navbar/>
      <Route exact path ="/" component={Landing}/>
      <section className="container">
      <AlertMessage/>
      <Switch>
      <Route exact path ="/login" component={Login}/>
      <Route exact path ="/register" component={Register}/>
      <Route exact path="/profiles" component={Profiles}/>
      <Route exact path="/profile/:id" component={Profile}/>
      <PrivateRoute exact path ="/dashboard" component={Dashboard}/>
      <PrivateRoute exact path ="/create_profile" component={CreateProfile}/>
      <PrivateRoute exact path ="/edit_profile" component={Editprofile}/>
      <PrivateRoute exact path ="/add_experience" component={Addexperience}/>
      <PrivateRoute exact path ="/add_education" component={Addeducation}/>
      </Switch>
      </section>
      </Router>
      </Provider>
  );
}

export default App;
