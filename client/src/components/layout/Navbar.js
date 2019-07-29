import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logoutUser} from "../../actions/auth"
const Navbar=({isAuthenticated,logoutUser})=>{
    return(
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/"><i className="fas fa-code"></i> Developers Community</Link>
    </h1>
    { isAuthenticated ? 
      <ul>
      <li><Link to="/dashboard">
      <i className="fas fa-user"/>
      <span>Dashboard</span>
      </Link></li>
      <li><Link to="/profiles">Developers</Link></li>
      <li><a onClick={logoutUser} href="/">
      <i className="fas fa-sign-out-alt"/>
      <span className="hide-sm">Logout</span></a>
      </li>
      </ul> 
      : 
     <ul>
     <li><Link to="/profiles">Developers</Link></li>
     <li><Link to="/register">Register</Link></li>
     <li><Link to="/login">Login</Link></li>
     </ul>
      }
    </nav>
    )
}

const  mapStateToProps =(state)=>({
  isAuthenticated : state.auth.isAuthenticated
 })
export default connect(mapStateToProps,{logoutUser})(Navbar)
