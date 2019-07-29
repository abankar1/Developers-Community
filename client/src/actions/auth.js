import axios from "axios"
import {CLEAR_PROFILE,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from "./types"
import {setAlert} from "./alert"
import setAuthToken from "../../src/util/setAuthtToken"

//REGISTER USER
export const registerUser=({name,email,password}) => async dispatch =>{
  const config={
      headers:{
          'Content-Type':'application/json'
      }
  }
  const body =JSON.stringify({name,email,password})
  try{

  const res =await axios.post("/users/",body,config)
  const token = await res.data
  await dispatch({type:REGISTER_SUCCESS,payload:token})
  await dispatch(loadUser())
  }
  catch(err){
      const errors = err.response.data.errors
      if(errors){
          errors.forEach(error=>dispatch(setAlert(error.msg,'Registration failed')))
      }
    dispatch({
        type:REGISTER_FAIL
    })
  }
}
 
//check for loggedIn user
export const loadUser=()=>async dispatch =>{
 if(localStorage.token){
  setAuthToken(localStorage.token)
 }
 try{
     const resp = await axios.get("/auth")
     dispatch({
         type:USER_LOADED,
         payload :resp.data
     })
 }
 catch(err){
  dispatch({
      type:AUTH_ERROR
  })
 }
}

//Login User
export const loginUser=({email,password}) => async dispatch =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body =JSON.stringify({email,password})
    try{
  
    const res =await axios.post("/auth/",body,config)
    await dispatch({type:LOGIN_SUCCESS,payload:res.data})
    await dispatch(loadUser())
    }
    catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'LOGIN failed')))
        }
      dispatch({
          type:LOGIN_FAIL
      })
    }
  }
  
  //logout User
  export const logoutUser =() =>async dispatch =>{
     await  dispatch({
          type:LOGOUT,
      })
     await  dispatch({
          type:CLEAR_PROFILE
      })
  }