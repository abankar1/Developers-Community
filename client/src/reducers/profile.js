import { GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE,UPDATE_PROFILE, GET_PROFILES,GET_REPOS } from "../actions/types";

const initialState ={
    profile:null,
    profiles:[],
    repos:[],
    isloading:true,
    error:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_PROFILE:
        console.log("getprofile reducer",action.payload)
        return{
            ...state,
            profile:action.payload,
            isloading:false
        }
        case GET_PROFILES:
        return{
            ...state,
            profiles:action.payload,
            isloading:false
        }
        case UPDATE_PROFILE:
        return{
            ...state,
            profile:action.payload,
            isloading:false
        }
        case PROFILE_ERROR:
        return{
            ...state,
            error:action.payload.statusText,
            isloading:false
        }
        case CLEAR_PROFILE:
        return{
        ...state,
        profile:null,
        repos:[],
        isloading:false
        }
        case GET_REPOS:
        return{
        ...state,
        repos:action.payload,
        isloading:false
        }
        default:
        return state
    }
}