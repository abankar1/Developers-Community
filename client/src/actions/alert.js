import {ALERTS,REMOVE_ALERT} from "./types"
import uuid from "uuid"

export const setAlert=(msg,alertType)=>dispatch=>{
 const id =uuid.v4()
 dispatch({
     type:ALERTS,
     payload:{msg,alertType,id}
 })

 setTimeout(()=>{
  dispatch({type:REMOVE_ALERT,payload:id})
},4000)
}