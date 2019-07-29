import React,{Fragment,useState} from "react"
import {createProfile} from "../../actions/profile"
import {connect} from "react-redux"
import {Link,withRouter} from "react-router-dom"
const Createprofile =({createProfile,history}) =>{
    const[formData,setFormData] =useState({
        status:'',
        company:'',
        location:'',
        website:'',
        skills:'',
        bio:'',
        githubusername:'',
        Twitter:'',
        LinkedIn:'',
        Instagram:'',
        github:''
    })
    const {
      status,
      company,
      location,
      website,
      skills,
      bio,
      githubusername,
      Twitter,
      LinkedIn,
      Instagram,
      github
    }= formData
    const[displaySocial,toggleSocial] =useState(false)
    const handleChange =(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit =(e)=>{
      const editvalue = true
      e.preventDefault()
      console.log("submitted")
      createProfile({formData,history,editvalue})
    }
    return(
        <Fragment>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>handleSubmit(e)}>
        <div className="form-group">
          <select name="status"  value={status}onChange={(e)=>handleChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={(e)=>handleChange(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value= {website}onChange={(e)=>handleChange(e)}/>
          <small className="form-text"
            >Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>handleChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e)=>handleChange(e)} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e)=>handleChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username
            </small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e)=>handleChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick ={()=>{toggleSocial(!displaySocial)}}type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocial ?<Fragment><div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="Twitter" value={Twitter} onChange={(e)=>handleChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="LinkedIn" value={LinkedIn} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="form-group social-input">
          <i className="fab fa-github fa-2x"></i>
          <input type="text" placeholder="Github URL" name="github" value={github} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="Instagram" value={Instagram} onChange={(e)=>handleChange(e)}/>
        </div></Fragment>: <Fragment></Fragment>}
        
        <input type="submit"  className="btn btn-primary my-1" />
        <p className="btn btn-light my-1" ><Link to="/dashboard" >Go Back</Link></p>
      </form>
            </Fragment>
    )
}


export default connect(null,{createProfile})(withRouter(Createprofile))