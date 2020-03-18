import React,{Component} from 'react';

import close from '../../icon/mainIcon/close.png';
import {Link} from 'react-router-dom'

class SubmitForSure extends Component{
    constructor(){
        super();
        this.state={
            submitData:null
        }
    }
    render(){
        return(
            <div className="card submit">
                <img src={close} alt="close" className="submit-close" onClick={this.handleOnClose.bind(this)} />
                <div className="clear"></div>
                <div className="submit-container">
                <span>本次练习共{this.props.len}题，您已完成{this.props.done_num}题，确认提交？</span>
                <div className="submitCard-buttons">
                    <button onClick={this.handleOnClose.bind(this)} >继续做题</button>
                    <Link to={{
                        pathname:'/alternative/test/report',
                        state:this.state.submitData  //有什么办法让他先setState，再切换路由
                    }}> <button id="submit-twt" >交了交了</button></Link>
                    <div className="clear"></div>
                </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        fetch("https://exam.twtstudio.com/api/exercise/getScore/"+this.props.courseOfId+ "/" + this.props.time , {
            method:"POST",
            mode:"cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body:JSON.stringify(this.props.submitPara)
        })
            .then( res => res.json())
            .then( data =>{
                // 跳到报告和解析页面要把所有的数据传过去 需要一个课程id
                let obj = Object.assign({},{projectName:this.props.projectName,date:this.props.date, course_id:this.props.courseOfId,timeUsing:this.props.timeUsing},data);
                //console.log(obj);
                    this.setState({
                        submitData:obj,
                    });
            }
            )
            .catch(function (e) {
                console.log("fetch fail");
            })
    }

    handleOnClose(){
        if(this.props.permission){
            this.props.permission(false)
        }
    }
}
export default SubmitForSure;