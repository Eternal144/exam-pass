import React,{Component} from 'react'
import '../../CSS/personalCard.css'
import '../../CSS/personalUnfold.css'
import CollectCard from './CollectCard'
import LoadingAnimation from "../LoadingAnimation";
import FeedbackCard from '../answerPage/FeedbackCard';
import pic from '../../icon/personal/noData.png';
import feedIcon from '../../icon/mainIcon/feedback.png'
class PersonalApp extends Component{
    constructor(){
        super();
        this.state={
            data:null,
            feedbackFlag:false,
        }
    }
    getListOfCollect(){
        let arr= [];
        this.state.data.map((value,i)=>{
            arr.push(<CollectCard  data={value} key={i} />)
        });
        return arr;
    }
    render(){
        let data = this.state.data;
        let component = data&&data.length >0 ?
            <div>
                <div className="personal-wrong-title">
                    <span>收藏总题目数：{data ? data.length : "加载中"}</span>
                </div>
                {this.getListOfCollect()}
            </div> :
            <div className="noData-container">
                <div className="noData-words">暂时没有题目，快去刷题吧~</div>
                <div className="clear"></div>
                <img src={pic} className="noData" alt="no-data" />
            </div>;
        return(
            <div>
                {this.state.feedbackFlag ? <FeedbackCard/> : null}
                    {data ? component : <div style={{minHeight:"600px"}}><LoadingAnimation /></div>}
                    <div className="doubtful-container">
                    </div>
            </div>
        )
    }
    componentDidMount(){
        fetch("https://exam.twtstudio.com//api/special/getQues/0",{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data:data.data,
                });
            })
    }
}
export default PersonalApp;