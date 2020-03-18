import React,{Component} from 'react';
import logo from '../../icon/firstPage/policy.png'
import {Link} from 'react-router-dom'

class Situation extends Component{
    handleLogin=()=>{
            window.location.href='https://exam.twtstudio.com/api/login';
    };
    render(){
        let content =
            <div className="list-left">
                <img src={logo} alt="logo" className="list-logo" />
                <span className="showTitle">形势与政策</span>
            </div>;
        let component = this.props.data ? <Link to={{
                pathname:'/alternative',
                state:1}}>
                <div className="list-container">
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
export default Situation;