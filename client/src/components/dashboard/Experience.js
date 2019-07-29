import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"
import {connect}from "react-redux"
import {deleteExperience} from "../../actions/profile"
const Experience = ({experiences,deleteExperience})=> {
    const experience = experiences.map(exp=>(
        <tr key={exp.id}>
        <td>{exp.companyname}</td >
        <td className="hide-sm">{exp.title}</td>
        <td><Moment format='YYYY-MM'>
        {exp.from}
            </Moment> -{
                exp.to == null ? ('Now'):(
                        <Moment format='YYYY-MM'>{exp.to}
                            </Moment>
                    )
            }
        </td>
        <td>
            <button className="btn btn-danger" onClick={()=>{
                deleteExperience(exp.id)
            }}>Delete</button>
            </td>
            </tr>
    ))
    return (
        <Fragment>
        <h2 className="my-2"> Experience</h2>
        <table className="table">
        <thead>
            <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th className="hide-sm">Years</th>
            </tr>
            </thead>
            <tbody>{experience}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
experiences: PropTypes.array.isRequired,
deleteExperience:PropTypes.func.isRequired
}

export default connect(null,{deleteExperience})(Experience)
