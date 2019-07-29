import React,{Fragment} from "react"
import spinner from "./loading_spinner.gif"

const Spinner =()=>{
    return(
    <Fragment>
        <img alt="loading.." src={spinner} style={{width:'200px',height:'200px',margin:'auto',display:'block'}}/>
        </Fragment>
    )
}

export default Spinner