import React,{Component} from 'react';

import avtar from '../icon/firstPage/avatar-round.png';
import '../CSS/media.css';
import{Link} from 'react-router-dom';

class Media extends Component{
    //适配移动端的登出,和首页，个人中心
    constructor(){
        super();
        this.state={
            data:null
        }
    }
    render(){
        let data = this.state.data;
        let component = data ?
            <div>
                <div className="media-userName">
                    <Link to="/">
                    <img src={avtar} className="media-avatar" />
                    <span>{data.twt_name}</span>
                    </Link>
                </div>
                <ul className="media-menu">
                    <li className="media-list" style={{color:"black"}} onClick={this.handleLogout.bind(this)}>登出</li>
                    <Link to="/"><li className="media-list">首页</li></Link>
                    <Link to="/personal"><li className="media-list">个人中心</li></Link>
                </ul>
            </div>
                :
            <div>
                <div className="media-userName">
                    <img src={avtar} className="media-avatar" />
                    <span>用户名</span>
                </div>
                <ul className="media-menu">
                    <li className="media-list" style={{color:"black"}} onClick={this.handleLogin.bind(this)}>登录</li>
                </ul>
            </div>;

        return (
            <div className="media-container" id={this.props.flag ? "unfold" : "fold"}>
                {component}
            </div>
        )
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
export default Media;