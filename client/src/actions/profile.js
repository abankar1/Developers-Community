import axios from "axios"
import {setAlert} from "./alert"
import {PROFILE_ERROR,GET_PROFILE,GET_PROFILES,UPDATE_PROFILE,CLEAR_PROFILE, DELETE_ACCOUNT,GET_REPOS} from "./types"

//GET profile of a user
export const getProfile=()=>async dispatch =>{
    try{
        const res= await axios.get("/profile/me")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }

    catch(err){
        const errors =err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })

    }

}

 //GET all profiles
 export const getAllProfiles=()=>async dispatch =>{
     dispatch({
         type:CLEAR_PROFILE
     })
    try{
        const res= await axios.get("/profile")
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    }

    catch(err){
        const errors =err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })

    }

}

//GET profile by ID
export const getProfilebyId=(userid)=>async dispatch =>{
    console.log("getprofilebyId executed" , userid)
   try{
       const res= await axios.get(`/profile/${userid}`)
       dispatch({
           type:GET_PROFILE,
           payload:res.data
       })
   }
   catch(err){
       const errors =err.response.data.errors
       if(errors){
           errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
       }
       dispatch({
           type:PROFILE_ERROR,
           payload: {msg:err.response.statusText,status:err.response.status}
       })

   }

}

//Create or Update profile
export const createProfile =({formData,history,edit=false})=>async dispatch =>{
    console.log("action",formData)
    try{
    const config={
     headers:{
         'Content-Type': 'application/json'
     }
    }
 const res =await axios.post("/profile/me",formData,config)
 console.log("response from axios",res)
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
    
    dispatch(setAlert(edit? 'Profile Updated':'Profile Created','success'))
    if(!edit){
        history.push("/dashboard")
    }
    }
 catch(err){
    console.log("error",err)
     const errors =err.response.data.errors
     console.log("errors",errors)
     if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg:err.response.statusText,status:err.response.status}
    })
 }

}

//Add experience
export const addExperience =({formData,history}) => async dispatch=>{
    console.log("experience form data",formData)
    try{
    const config={
     headers:{
         'Content-Type': 'application/json'
     }
    }
 const res =await axios.put("/profile/experience",formData,config)
 console.log("response from axios",res)
    dispatch({
        type:UPDATE_PROFILE,
        payload:res.data
    })
    dispatch(setAlert('Experience added','success'))
    history.push("/dashboard")
    }
 catch(err){
     const errors =err.response.data.errors
     if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg:err.response.statusText,status:err.response.status}
    })
 }

}

//Add Education
export const addEducation =({formData,history}) => async dispatch=>{
    try{
    const config={
     headers:{
         'Content-Type': 'application/json'
     }
    }
 const res =await axios.put("/profile/education",formData,config)
 console.log("response from axios",res)
    dispatch({
        type:UPDATE_PROFILE,
        payload:res.data
    })
    dispatch(setAlert('Education added','success'))
    history.push("/dashboard")
    }
 catch(err){
     const errors =err.response.data.errors
     if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg:err.response.statusText,status:err.response.status}
    })
 }

}

//DELETE Experience
export const deleteExperience = (id) => async dispatch =>{
    try{
        const res = await axios.delete(`/profile/experience/${id}`)
        dispatch(
            {
                type:UPDATE_PROFILE,
                payload: res.data
            }
        )
        dispatch(setAlert('Experience Deleted','success'))
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }

}
//DELETE Exducation
export const deleteEducation = (id) => async dispatch =>{
    try{
        const res = await axios.delete(`/profile/education/${id}`)
        dispatch(
            {
                type:UPDATE_PROFILE,
                payload: res.data
            }
        )
        dispatch(setAlert('Education Deleted','success'))
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }

}

//Delete Account & Profile
export const deleteAccount = () => async dispatch =>{
    if(window.confirm("Delete operation would remove all your data & It cannot be undone!!"))
    try{
         await axios.delete(`/profile`)
        dispatch(
            {
                type:CLEAR_PROFILE,
            }
        )
        dispatch({
            type:DELETE_ACCOUNT
        })
        dispatch(setAlert("Your Account Deleted permanently"))
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }

}

//GET github repos
export const getGithubrepos = (username) => async dispatch =>{
    try{
        const res = await axios.delete(`/profile/github/${username}`)
        dispatch(
            {
                type:GET_REPOS,
                payload:res.data
            }
        )

    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }

}
