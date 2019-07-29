import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"
import {connect}from "react-redux"
import {deleteEducation} from "../../actions/profile"
const Education = ({education,deleteEducation})=> {
    const education_history = education.map(edu=>(
        <tr key={edu.id}>
        <td>{edu.schoolname}</td >
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">{edu.major}</td>
        <td><Moment format='YYYY-MM'>
        {edu.from}
            </Moment> -{
                edu.to == null ? ('Now'):(
                        <Moment format='YYYY-MM'>{edu.to}
                            </Moment>
                    )
            }
        </td>
        <td>
            <button className="btn btn-danger" onClick={()=>{
                deleteEducation(edu.id)
            }}>Delete</button>
            </td>
            </tr>
    ))
    return (
        <Fragment>
        <h2 className="my-2"> Education</h2>
        <table className="table">
        <thead>
            <tr>
                <th>Schoolname</th>
                <th className="hide-sm">Degre</th>
                <th className="hide-sm">Major</th>
                <th className="hide-sm">Years</th>
                <th className="hide-sm"></th>
            </tr>
            </thead>
            <tbody>{education_history}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
education: PropTypes.array.isRequired,
deleteEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteEducation})(Education)
