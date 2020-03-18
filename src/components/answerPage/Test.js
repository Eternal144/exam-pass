import React, {Component} from 'react';
import SubmitForSure from './SubmitForSure';
import FeedbackCard from './FeedbackCard';
import TestPage from './TestPage';
import '../../CSS/answer.css'
import collectN from '../../icon/mainIcon/collect.png';
import collect from '../../icon/mainIcon/collected.png';
import feedback from '../../icon/mainIcon/feedback.png';
import arrow from '../../icon/firstPage/unfold.png'
import {withRouter} from 'react-router-dom'
import LoadingAnimation from "../LoadingAnimation";

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackFlag: false,
            index: 0,
            arr:[],
            answerObj:[],
            choices:[[false,false,false,false]],
            height:{},
            fold:true,
            collectOrNot:false,
            rotate:{},
            submitFlag:false,
            projectName:"加载中",
            questions:null,
            submitData:null,
            done_num:0,
            time:null,
            date:null,
            sec:0,
            min:0,
            stylere:null,
        };
    }
    //存三个值是最好的
    // tick(){
    //     if(this.state.sec+1===60){
    //         this.setState({
    //             sec:0,
    //             min:this.state.min+1
    //         });
    //     }
    //      else {
    //         this.setState({
    //             sec: this.state.sec + 1
    //         })
    //     }
    // }

    getAnswerSigns(){
        var arr = [];
        let len = this.state.answerObj.length;
        for (let i = 1; i <= len; i++) {
            if(this.state.index === i-1){
                arr.push(<div className="answer-sign chooseStyle" onClick={this.jumpTo.bind(this)} id={i} key={i} >{i}</div>);
            }
            else if(this.state.answerObj[i-1] && this.state.answerObj[i-1].answer){
                arr.push(<div className="answer-sign doneStyle" onClick={this.jumpTo.bind(this)} id={i}  key={i} >{i}</div>);
            }
            else{
                arr.push(<div className="answer-sign" onClick={this.jumpTo.bind(this)} id={i}  key={i} >{i}</div>);
            }
        }
        return arr;
    }
    jumpTo(e){
        let a = parseInt(e.target.id)-1;
        this.setState({
            index:a,
        })
    }

    render() {
        //拿题不管是否收藏，那现在的点击添加就是添加
        let questions = this.state.questions;
        let index = this.state.index;
        let component = <div>
            <div className="card answer-card-container">
                <div className=" answer-card">
                    <div className="answer-process" style={this.state.stylere}>
                        { this.getAnswerSigns() }
                    </div>
                </div>
                <div className="arrow-container">
                    <img src={arrow} alt="arrow" className="answer-arrow" onClick={this.handleToggle.bind(this)} style={this.state.rotate} />
                </div>
            </div>
            {questions ? <TestPage question={questions[index]} index={index} //若index等于3，跳转3的choices过去
                                              recordAnswer={this.recordAnswer.bind(this)}
                                              choices={this.state.choices[index]} answer={true} /> : "加载中" }

            <div className="card process">
                <div className="process-prompt-container test-prompt-container">
                    <div className="process-prompt">
                        <span className="answer-process-number">答题进度 {index+1}/{ questions ? questions.length : "加载中"}</span>
                        <img  src={questions && questions[index].is_collected ? collect : collectN} alt="收藏" title="收藏" className="process-icon process-collect"
                              onClick={this.handleOnCollect.bind(this)}
                        />
                        <img src={feedback} alt="反馈" title="反馈" onClick={this.handleFeedBack.bind(this)} className="process-icon process-wrongAns"  />
                    </div>
                </div>
                <div className="clear"></div>
                <div className="answer-check-container">
                    <div className="answer-check">
                        <div className="answer-button-groups">
                            <button onClick={this.onClickPrev.bind(this)}>上一题</button>
                            <button onClick={this.onClickNext.bind(this)} >下一题 </button>
                            <button onClick={this.onJudge.bind(this)} >交卷</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>;
        return (
            <div className="test">
                {this.state.feedbackFlag ? <FeedbackCard  feedBackClose={this.handleFeedBack.bind(this)} /> : null }
                {this.state.submitFlag ? <SubmitForSure permission={this.handleClose.bind(this)} courseOfId={questions[0].course_id}  projectName={this.state.projectName} date={this.state.date}
                    submitPara = {this.state.answerObj} done_num = {this.state.done_num} timeUsing = {this.state.min + "分" + this.state.sec + "秒"}  time = {this.state.time} len={this.state.questions.length}
                /> : null}
                <div className="card title test-container">
                    <div className="block"></div>
                    <h2 className="answer-title">{this.state.projectName}</h2>
                    <div className="toggle-container">
                        <span className="display-type">随机练习</span>
                        <span className="test-time">{this.state.min + "分" + this.state.sec + "秒"}</span>
                    </div>
                </div>
                {questions ? component :  <div className="answer-container"><LoadingAnimation /></div>}
            </div>
        )
    }

    componentWillUnmount (){
        clearInterval(this.interval)
    }

    componentDidMount(){
        //转化为时间

        if(!this.props.location.state){
            return;
        }
       //this.interval = setInterval(()=> this.tick(),1000);
        fetch("https://exam.twtstudio.com/api/course/" + this.props.location.state.course_id,{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(response => response.json())
            .then(courseData => {
                    fetch("https://exam.twtstudio.com/api/exercise/getQues/" + this.props.location.state.course_id,{
                        //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
                    })
                        .then(response => response.json())
                        .then(questionsData => {
                            // console.log(questionsData);
                            if(questionsData.message === "本课程没有题目或者没有本课程"){
                                alert("喔唷，本课程没有题目");
                                // this.myFunction();
                            }
                        else{
                            let arrAnswerObj = [];
                            questionsData.data.question.map((value,i)=>{
                                let oneAnswerObj = {};
                                oneAnswerObj.id = value.ques_id;
                                oneAnswerObj.answer = null;
                                oneAnswerObj.type = value.ques_type;
                                arrAnswerObj.push(oneAnswerObj)
                            });
                            this.setState({
                                projectName:courseData.data.course_name,
                                questions:questionsData.data.question, //这个questions单个题的数组
                                date:questionsData.data.timestamp,
                                answerObj:arrAnswerObj,
                                time:questionsData.data.time
                            })
                        }
                    });
            })
    }

//如果用户不点击呢？这个函数不触发，告诉父组件
    //arr是个大数组哦，存index对应的答案
    recordAnswer(answer) {
        //answer是个数组，answer已知当前index，更改答案，更改choices
        let LastArr = this.state.arr;
        //如果是更新答案
        if(this.state.arr[this.state.index]){
            LastArr.splice(this.state.index,1,answer)
        }
        else{
            LastArr[this.state.index] = answer;
            this.setState({
                done_num: this.state.done_num+1
            })
        }
        this.setState({
            arr:LastArr,
        });
        //[["A","B"],["A"],[],[],[]] 当前index是24，
            //要保存当前答案，发现，当前已经有一个对象了，只要把arr刷新即可。
        //第一种可能，一直顺利的做下去
       /* let nextDone = this.state.arr[this.state.index+1];*/

       //更新对象
        let answerToString = this.state.arr[this.state.index].join('');
        let oneObj={
            //这里是有问题的，arr会一直保存，不要你保存
            answer:answerToString,
        };
        let answerObjOfCopy = this.state.answerObj;
        answerObjOfCopy[this.state.index] = Object.assign({},this.state.answerObj[this.state.index],oneObj);

        //更新当前index的choices
        let arr = [false,false,false,false];
        let LastChoices = this.state.choices;
        answer.forEach(function (e) {
            arr[e.charCodeAt()-65] = true
        });
        LastChoices[this.state.index] = arr;

        this.setState({
            choices:LastChoices,
            answerObj: answerObjOfCopy,
        });//不管以前怎么样，你你在当前index做一道记录一道

    }

    onClickPrev() { //只要是点击了，就要记录改index下的choices值，跟前进后退没关系吧,按钮只是记录，如果发现上一题的的index的题没有chooice，则投入false
        let index = this.state.index - 1;
        if(index < 0){
            return;
        }
        // if(!this.state.arr[this.state.index-1]){
        //     let arr =  [false,false,false,false];
        //     let LastChoices = this.state.choices;
        //     LastChoices[this.state.index-1] = arr;
        //     this.setState({
        //         choices:LastChoices
        //     })
        // }
        this.setState({
            index: index,
        });
    }
    
    onClickNext() {
        let index = this.state.index + 1;
        if(index < 0){
            return;
        }
        this.setState({
            index: index,
        })
    }

    onJudge(){
       this.setState({
           submitFlag:true
       });
    }
    handleClose(){
        this.setState({
            submitFlag:false
        })
    }
    handleFeedBack(){
        this.setState({
            feedbackFlag:!this.state.feedbackFlag
        })
    }
    //拉答题卡
    handleToggle(){
        if(this.state.fold){ //只有在展开的时候记录
            let div = document.getElementsByClassName('answer-process')[0];
            this.height = div.clientHeight;
        }
        this.setState({
            fold:!this.state.fold
        });
        if(!this.state.fold){
            this.setState({
                stylere:{height:this.height},
                rotateStyle:{transform: 'rotate(0deg)'}
            });
        }
        else{
            this.setState({
                stylere:{height:'auto'},
                rotateStyle:{transform: 'rotate(180deg)'}
            })
        }
    };
    handleOnCollect(){
        //当前是收藏的，则取消
        let ques = this.state.questions;
        if(ques[this.state.index].is_collected){
            //取消题目
            this.collectData("deleteQues")
        }
        else{
            this.collectData("addQues")
        }
        ques[this.state.index].is_collected = !ques[this.state.index].is_collected;
        this.setState({
            questions:ques
        });
    }
    collectData(type){
        let formData = new FormData();
        formData.append("ques_type",this.state.questions[this.state.index].ques_type);
        formData.append("ques_id",this.state.questions[this.state.index].ques_id);
        // console.log(type);
        let url = "https://exam.twtstudio.com/api/special/"+type+"/"+0;
        fetch(url,{
            method: "POST",
            mode: "cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body: formData
        })
            .then()
            .then(data=>console.log("delete成功")
            )
    }
}


export default withRouter(Test) ;