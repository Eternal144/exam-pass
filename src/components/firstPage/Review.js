import React,{Component} from 'react';
import logo from '../../icon/firstPage/review.png'
import '../../CSS/list.css'
import {Link} from 'react-router-dom'

class Review extends Component{
    constructor(){
        super();
        this.state={
            course_id:null,
            answerObj:null,
            routerOfData:null
        }
    }
    handleLogin=()=>{
        if(!this.props.data){
            window.location.href='https://exam.twtstudio.com/api/login';
        }
    };
    render(){
        function getType (a) {
            switch (a){
                case "0":{
                    return "单选";
                }
                case "1":{
                    return "多选";
                }
                case "2":{
                    return "判断";
                }
                default:
                    return "加载中"
            }
        }
        const data = this.props.data;
        let component =  this.props.code || !this.props.data.current_course_index ? <div className="newHistory">
                <span className="describe">当前记录为空，快来刷题吧~</span>
            </div>
            : <div className="newHistory"><span className="describe">{data.current_course_name}--{getType(data.current_ques_type)}</span>
                <div className="list-right">
                    <span className="list-numbers">{data.current_course_done_count}/{data.current_course_ques_count}</span>
                    <div className="button-container"><Link to={{
                        pathname:"/alternative/answer", state:this.state.routerOfData}}>
                        <button className="exam-button go-on">继续</button></Link>
                        <button className=" exam-button give-up">放弃</button>
                    </div>
                </div>
            </div>;

        return(
            <div className="card list">
                <div className="list-container" onClick={this.handleLogin}>
                    <div className="list-left-spe">
                        <img className="list-logo-spe" src={logo} alt="logo" />
                        <div className="review-words" >
                        <span className="showTitle">最近复习</span>
                            {component}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let data = this.props.data;
        if(data){
            let AnsObjOfCopy = {
                course_id:null,
                index:null,
                type:null,
                answer_string:null,
            };
            AnsObjOfCopy.answer_string = data.current_course_write_string;
            AnsObjOfCopy.index = data.current_course_index;
            AnsObjOfCopy.type = data.current_ques_type;
            AnsObjOfCopy.course_id = data.current_course_id;
            this.setState({
                routerOfData: AnsObjOfCopy
            })
        }
    }
}
export default Review;