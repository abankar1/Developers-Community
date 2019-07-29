import React,{Fragment,useState} from "react"
import {connect} from "react-redux"
import {addEducation} from "../../actions/profile"
import {withRouter} from "react-router-dom"
const Addeducation =({addEducation,history})=>{
    const [formData,setFormData] =useState({
            schoolname:'',
            location:'',
            from:'',
            current:false,
            to:'',
            degree:'',
            major:'',
    })
    const [toDateDisabled, toggletoDate] =useState(false)
    const {
        schoolname,
        location,
        from,
        current,
        to,
        degree,
        major,
    } =formData
    const handleChange=(e)=> setFormData({...formData,[e.target.name]:e.target.value})
    return(
        <Fragment>
            <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>{
        e.preventDefault()
        addEducation({formData,history})
      }}>
        <div className="form-group">
          <input type="text" placeholder="* School name" name="schoolname" value={schoolname} onChange={e=> handleChange(e)}required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="location" name="location" value={location} onChange={e=> handleChange(e)}required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={e=> handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="*Major" name="major" value={major} onChange={e=> handleChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date *</h4>
          <input type="date" name="from" value={from} onChange={e=> handleChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked ={current} value={current} onChange={e=> {setFormData({...formData, current:!current});toggletoDate(!toDateDisabled)}}/> Current School</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} disabled ={toDateDisabled? 'disabled':''}onChange={e=> handleChange(e)}/>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
            </Fragment>
    )
}

export default connect(null,{addEducation})(withRouter(Addeducation))