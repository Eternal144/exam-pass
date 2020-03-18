import React, {Component} from 'react';
import '../../CSS/altnative.css'

class Title extends Component{
    render(){
        return(
            <div className="card title">
                <div className="block"></div>
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}
export default Title;