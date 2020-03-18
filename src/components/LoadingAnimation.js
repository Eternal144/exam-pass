import React,{Component} from 'react';
import '../CSS/LoaingAni.css'

class LoaingAnimation extends Component{
    render(){
        return(
            <div className="lds-ellipsis">
            <div></div><div></div><div></div><div></div></div>
        )
    }
}

export default LoaingAnimation;