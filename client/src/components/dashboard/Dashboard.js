import React,{Fragment,useEffect} from "react"
import {connect} from "react-redux"
import {Link} from"react-router-dom"
import {getProfile,deleteAccount} from "../../actions/profile"
import Spinner from "../layout/Spinner"
import Dashboardactions from "./Dashboardactions"
import Experience from "./Experience"
import Education from "./Education"
const Dashboard =({auth:{user},profile:{profile,isloading},getProfile,deleteAccount}) =>{
    useEffect(()=>{
        getProfile();
    },[getProfile])
    return( isloading && profile ===null ? <Spinner/> :<Fragment>
        <h1 className="large text-primary"> Dashboard</h1> 
        <p className="lead">
        <i className="far fa-smile"></i> Welcome {user && user.name}</p>
        { profile !==null ? <Fragment> 
            <Dashboardactions/>

            <Experience experiences={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
            <button className="btn btn-danger" onClick={()=>{deleteAccount()}}>
            <i className="fa fa-user-minus">Delete My Account</i>
                </button>
                </div>
        </Fragment>:<Fragment><p>You haven't created a profile. Create One and add info</p>
        <Link to ="/create_profile" className="btn btn-primary"> Create Profile</Link></Fragment>}
        </Fragment>
        
    )
    }

const mapStateToProps = state =>({
   auth: state.auth,
   profile: state.profile
})
export default connect(mapStateToProps,{getProfile,deleteAccount})(Dashboard)
