import React,{Component} from 'react';

import firstP from '../../icon/personal/toStart.png'
import '../../CSS/header.css'
import {Link} from 'react-router-dom'

class HeaderPersonal extends Component{
    render(){
        return(
            <div>
                    <div className=" personal-header-container avter-container">
                        <img className="header-avter" src={firstP} alt="logo" />
                        <Link to={{pathname:'/'}}>
                            <title id="personal-header">返回首页</title>
                        </Link>
                    </div>
            </div>
        )
    }
}
export default HeaderPersonal;