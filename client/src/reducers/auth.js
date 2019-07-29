import {REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, DELETE_ACCOUNT} from "../actions/types"
const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated : false,
    isloading : true,
    user:null
}

export default function(state=initialState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
        localStorage.setItem('token',action.payload)
        return{
            ...state,
            token:action.payload,
            isAuthenticated:true,
            isloading:false
        }
        case REGISTER_FAIL:
        localStorage.removeItem('token')
        return{
            ...state,
            token:null,
            isAuthenticated:false,
            isloading:true
        }
        case USER_LOADED:
        return{
            ...state,
            isAuthenticated:true,
            isloading:false,
            user: action.payload
        }
        case AUTH_ERROR:
        return{
            ...state,
            token:null,
            isAuthenticated:false,
            isloading:true
        }
        case LOGIN_SUCCESS:
        localStorage.setItem('token',action.payload)
        return{
            ...state,
            token:action.payload,
            isAuthenticated:false,
            isloading:false
        }
        case LOGIN_FAIL:
        return {
            ...state,
            token:null,
            isAuthenticated:false,
            isloading:true
        }
        case LOGOUT:
        case DELETE_ACCOUNT:
        localStorage.removeItem('token')
        return {
            ...state,
            token:null,
            isAuthenticated:false,
            isloading:true
        }
        default:
        return state
    }

}