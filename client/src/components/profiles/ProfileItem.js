import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

const ProfileItem = ({profile:{
    user:{_id,name,avatar},
    status,
    company,
    location,
    skills
}}) => {
    return (
        <Fragment>
        <div className="profile bg-light">
          <img
            className="round-img"
            src={avatar}
            alt="Avatar"
          />
          <div>
            <h2>{name}</h2>
            <p>{status} at {company && <span>company</span>}</p>
            <p>{location}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
          </div>
          <ul>
              {skills.length>0 ? (skills.map((skill,index)=>(
                  <Fragment key ={index}>
                   <li className="text-primary">
                   <i className="fas fa-check"></i> skill
                 </li>
                 </Fragment>
              ))) :
              <Fragment>
             <li className="text-primary">
              <i className="fas fa-check"></i> skills
            </li> 
            </Fragment>
            }
          </ul>
        </div>
        </Fragment>
    )
}

ProfileItem.propTypes = {
profile:PropTypes.object.isRequired
}

export default ProfileItem
