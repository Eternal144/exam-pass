import React,{Component} from 'react';
import logo from '../../icon/firstPage/party.png'
import {Link} from 'react-router-dom'
class Party extends Component{
    handleLogin=()=>{
        if(!this.props.data){
            window.location.href='https://exam.twtstudio.com/api/login';
        }
    };
    render(){
        let content =
                <div className="list-left">
                    <img src={logo} alt="logo" className="list-logo" />
                    <span className="showTitle">党课</span>
                </div>;
        let component = this.props.data ? <Link to={{pathname:'/alternative/party',state:'党课'}}>
                <div className="list-container" >
                    {content}
                </div>
            </Link> :
                <div className="list-container" onClick={this.handleLogin}>
                    {content}
                </div>;
        return(
            <div className="card list">
                {component}
            </div>
        )
    }
}
export default Party;