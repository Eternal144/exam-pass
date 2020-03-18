import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class OnlineClasses extends Component{
    handleLogin=()=>{
        window.location.href='https://exam.twtstudio.com/api/login';
    };
    render(){
        let component = this.props.data ?
            <Link to={{pathname:'/alternative',state:this.props.class.course_id}}>
                <button className="exam-button label-button">{this.props.class.course_name}</button>
            </Link> :
            <button className="exam-button label-button" onClick={this.handleLogin}>{this.props.class.course_name}</button>
        return(
            <div className="class-container">
                {this.props.class ? component
                    : "加载中"}
            </div>
                )
    }
}
export default OnlineClasses;