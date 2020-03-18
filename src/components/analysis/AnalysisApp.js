import React,{Component} from 'react';


import AnalysisCard from "./AnalysisCard";
import '../../CSS/answer.css'
import FeedbackCard from '../answerPage/FeedbackCard'
import {Link} from 'react-router-dom'
class AnalysisApp extends Component{
    constructor(){
        super();
        this.state={
            feedbackFlag:false,
            index:0,
            disAnsCard:false,
            ques_state:[],
        }
    }
    //渲染答题卡
    getAnswerSigns(){
        let arr = [];
        //获取了一个表示数据状态的arr；[]长度为25；
        //console.log(this.props.location.state);
        for (const [i,value] of this.props.location.state.all_ques_state.entries()){
            arr.push(
                value ? <div className="analysis-signs" key={i}>{i+1}</div> :
                    <div className="analysis-signs wrong-answer " key={i} >{i+1}</div>
                 );
        }

        return arr;
    }
    getQuesAnalysis(){
        let arr=[];
        let data = this.props.location.state;
        if(data.type){
            data.ques_data.map((value,i)=>{
                if(!(value.is_done && value.is_true))
                arr.push(<AnalysisCard data={value} index={i} course_id={data.course_id} feedBackJudge={this.handleFeedbackClose.bind(this)} />
                )
            });
        }
         else{
            data.ques_data.map((value,i)=>{
                arr.push(<AnalysisCard data={value} index={i} course_id={data.course_id} feedBackJudge={this.handleFeedbackClose.bind(this)} />
                )
            });
        }
        return arr
    }
    render(){
        let answerCard = <div className="analysis-answer-card-side answer-card-analysis">
            <div className="analysis-card-sign">
                {/*如果有25道题就好渲染，如果只有3道错题 一个length=25的arr index 测验完查看解析，没做和做错都是红 01000101001*/}
                {this.getAnswerSigns()}
            </div>
            <div className="answer-button-groups analysis ">
                <button className="report-button button-style">下一组<span className="disappear">练习</span></button>
            </div>
        </div>;
        return(
            <div>
                {this.state.feedbackFlag ? <FeedbackCard feedBackClose ={this.handleFeedbackClose.bind(this)} /> : null}
                <div className="card title analysis">
                    <div className="block"></div>
                    <h2>党课</h2>
                </div>
                <div className="analysis-answer-card-side disappear">
                    <div className="analysis-card-sign">
                        {/*如果有25道题就好渲染，如果只有3道错题 一个length=25的arr index 测验完查看解析，没做和做错都是红 01000101001*/}
                        {this.getAnswerSigns()}
                    </div>
                    <Link to={{
                        pathname:'/alternative/test',
                        state:this.props.location.state.course_id
                    }}>
                        <div className="answer-button-groups analysis ">
                            <button className="report-button button-style" id="nextExercise">下一组<span className="disappear">练习</span></button>
                        </div>
                    </Link>
                </div>
                {this.state.disAnsCard ? answerCard : null}
                {this.getQuesAnalysis()}
                <div className="mobile display" onClick={this.handleToggleCard.bind(this)}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <span>1/100</span>
                </div>
            </div>
        )
    }

    handleToggleCard(){
        this.setState({
            disAnsCard:!this.state.disAnsCard
        })
    }
    handleFeedbackClose(flag){
        this.setState({
            feedbackFlag:flag,
        });
    }
}
export default AnalysisApp;