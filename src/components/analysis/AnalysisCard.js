import React,{Component} from 'react';
import collectN from '../../icon/mainIcon/collect.png';
import collect from '../../icon/mainIcon/collected.png';
import feedback from '../../icon/mainIcon/feedback.png'
import '../../CSS/analysis-card.css'

class AnalysisCard extends Component{
    constructor() {
        super();
        this.state = {
            collected: false,
            added: false,
            ques_data: null

        };
    }
    getOptions(){
        let arr=[];
        this.state.ques_data.data.option.map((value,i )=>{  //将0 1 2 3，快速转化成A，B，C，D
            arr.push(<li className="analysis-choose">{String.fromCharCode(i+"A".charCodeAt(0))}.{value}</li>)
        });
        return arr;
    }
    getComponent(){
        let component = <div className="analysis-des">
            <span className="showTitle">本题答案：</span>
            <span className="analysis-finalAnswer">{this.state.ques_data.data.answer}</span>
            <span className="showTitle" >你的答案：</span>
            <span className="analysis-finalAnswer">{ this.props.data.answer===this.state.ques_data.data.answer ?  this.props.data.answer : <span>{this.props.data.answer}</span>}</span>

            <div className="analysis-icon-container">
                <img src={feedback} alt="反馈" title="反馈"  onClick={this.handleOnFeedBack.bind(this)}   className="process-icon process-wrongAns" />
                <img src={this.state.collected ? collect:collectN}  alt="收藏" title="收藏"  onClick={this.handleOnCollect.bind(this)}  className="process-icon process-collect" />
            </div>
            <div className="clear"></div>
        </div>;
        return component
    }
    render(){
        /*let ques_data = this.state.ques_data.ques;*/
        return(
            <div className="card analysis-card">
                <div className="analysis-card-container">
                    <div className="  analysis-question">
                        <span>【单选】{this.props.index+1}.{this.state.ques_data ?  this.state.ques_data.data.content : "加载中"}</span>
                        <ul className="analysis-question-des">
                            {this.state.ques_data ? this.getOptions() : "加载中"}
                        </ul>
                    </div>
                    {this.state.ques_data ? this.getComponent(): "加载中"}
                </div>
            </div>
        )
    }
    componentDidMount(){
        let data = this.props.data;
        let url = "https://exam.twtstudio.com/api/remember/getQuesById/"+this.props.course_id+"/"+data.ques_type+"/"+data.ques_id;
        fetch(url,{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(res=>res.json())
            .then(quesData=>{
                if(quesData.is_collected){
                    this.setState({
                        collected: true
                    })
                }
                if(quesData.is_mistake){
                    this.setState({
                        added: true
                    })
                }
                //我要一个依赖一个更新
                this.setState({
                    ques_data:quesData
                })
            })
    }
    handleOnCollect(){
        if(this.state.collected){
            //取消题目
            this.collectData("deleteQues",0)
        }
        else{
            this.collectData("addQues",0)
        }
        this.setState({
            collected:!this.state.collected
        });
    }
    collectData(type,tid){
        let formData = new FormData();
        formData.append("ques_type",this.state.ques_data.data.ques_type);
        formData.append("ques_id",this.state.ques_data.data.ques_id);
        formData.append("error_answer",this.props.data.answer);
        let url = "https://exam.twtstudio.com/api/special/"+type+"/"+ tid;
        fetch(url,{
            method:"POST",
            mode:"cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body:formData
        })
            .then()
            .then(data=>
                console.log(data)
            )
    }
    handleOnAdd(){
        if(this.state.added){
            //取消题目
            this.collectData("deleteQues",1)
        }
        else{
            this.collectData("addQues",1)
        }
        this.setState({
            added:!this.state.added
        });
    }
    handleOnFeedBack(){
        if(this.props.feedBackJudge){
            this.props.feedBackJudge(true)
        }
    }
}
export default AnalysisCard;