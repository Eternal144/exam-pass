import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../CSS/error.css'

class error extends Component{
    render(){
        return(
            <div id="da-wrapper" className="fluid">
            <div id="da-content">
            <div className="da-container clearfix">
            	<div id="da-error-wrapper">
                   	<div className="da-error-pin">

                    </div>
                    <div id="da-error-code">
                    	error <span>404</span>                    </div>
                	<h1 className="da-error-heading">哎哟喂！</h1>
                    <h1  className="da-error-heading">页面让狗狗叼走了！</h1>
                    <div id="toPage">
                        <Link to="/" style={{color:"burlywood"}}>
                        回到首页
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default error;