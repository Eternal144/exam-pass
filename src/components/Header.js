import React,{Component} from 'react';
import logo from '../icon/firstPage/cloud.png'
import menu from '../icon/firstPage/menu.png'
import '../CSS/header.css';
import HeaderFirstPage from './firstPage/HeaderFirstP';
import HeaderPersonal from './personal-center/HeaderPersonal';
import {Link} from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
        // const changeLogin = this.props;
        this.state = {
            data:null
        }
    }
    render(){
        return <div className="app-header">
            <div className="header-container">
                    <div className="header">
                        <img className="menu" src={menu} alt="menu" onClick={this.handleToggleLogin.bind(this)} />
                        <Link to = {{pathname:'/'}} >
                            <title>
                                <img className="App-logo" src={logo} alt="logo" />
                                <span id="studio">天外天<span className="studio-subtitle">题库</span></span>
                            </title>
                        </Link>
                    </div>
                {window.location.href.substr(22,8)==="personal" ? <HeaderPersonal/> : <HeaderFirstPage /> }
        </div>
        </div>;
    }

    handleToggleLogin(){
        if(this.props.changeLogin){
            this.props.changeLogin();
        }
    }

}
export default Header;