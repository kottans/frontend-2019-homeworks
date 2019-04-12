import React, {Component} from "react";

class Image extends Component{

    state = {
        apiUrl:''
    };

    render(){
        return(
        <div className='hello' style={{color:'red', backgroundColor:'yellow'}}>
            <h3>Creation time: {(new Date()).toLocaleTimeString() }</h3>
        </div>
    )
    }

}

export default Image;


