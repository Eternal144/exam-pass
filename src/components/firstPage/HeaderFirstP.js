import React,{Component} from 'react';

import "es6-promise"
import "isomorphic-fetch"
import avter from '../../icon/firstPage/avatar-round.png'
import '../../CSS/header.css';
import {Link} from 'react-router-dom';

class HeaderFirstP extends Component{
    constructor(){
        super();
        this.state = {
            data:null
        }
    }
    getMark(){
        let component = null;
        let data = this.state.data;
        if(data){
            component = <div>
                <Link to="/personal"><img className="header-avter" src={avter} alt="logo" /></Link>
                <div className="user-name">
                <Link to={{pathname:'/personal'}}><title id="idName" className="login">
                  { data ?  data.twt_name : "用户名"}
                   </title></Link>
                  <span className="login" onClick={this.handleLogout.bind(this)}>登出</span>
                </div>
            </div>
        }
        else component = <div onClick={this.handleLogin.bind(this)}>
            <img className="header-avter" src={avter} alt="logo" />
            <span className="login" >登录</span>
        </div>;
        return component;
    }
    render(){
        return <div className="avter-container">
                  {this.getMark()}
              </div>;
    }
    componentDidMount(){
        fetch("https://exam.twtstudio.com/api/student",{
            method:"GET",
            cors:"no-cors"
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data.data
                })
            })
    }
    handleLogin(){
        window.location.href='https://exam.twtstudio.com/api/login'
    }
    handleLogout(){
        fetch("https://exam.twtstudio.com/api/logout",{
            method:"GET",
            cors:"no-cors"
        })
            .then(response => response.json())
            .then(data => {
                window.location.href='https://exam.twtstudio.com/';
            })
    }
}
export default HeaderFirstP;