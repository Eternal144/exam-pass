import React, {Component} from 'react';
import TestPage from './TestPage';
import FeedbackCard from './FeedbackCard'
import collectN from '../../icon/mainIcon/collect.png';
import collect from '../../icon/mainIcon/collected.png';
import feedback from '../../icon/mainIcon/feedback.png'
import arrow from '../../icon/firstPage/unfold.png'
import goTo from '../../icon/mainIcon/arrow.png'
import {withRouter} from 'react-router-dom'

import '../../CSS/answer.css'
import LoadingAnimation from "../LoadingAnimation";

class Answer extends Component{
    constructor(){
        super();
        this.state={
            feedbackFlag:false,
            collected:false,
            courseName:"加载中",
            index:0,
            styleHere:{},
            displayAns:[],
            choices:[[false,false,false,false]],
            fold:true,
            rotate:{},
            arr:[],
            arrayOfIds:null,
            questions:[],
            fetchFlag:[],
            ques_type:null,
            doneNum:0,
            AnswerNotRecite:true,
            styleDis:{
                display:"block"
            },
            styleButton:null,
            targetString:null
        };
    }
    stringResolve(){
        let str = this.props.location.state.answer_string; //fb
        let m = new Map([['0',"0000"],['1',"0001"],['2',"0010"],['3',"0011"],['4',"0100"],['5',"0101"],['6',"0110"],['7',"0111"],
            ['8',"1000"],['9',"1001"],['a',"1010"],['b',"1011"],['c',"1100"],['d',"1101"],['e',"1110"],['f',"1111"]]);
        let targetSring = "";
        if(str){
            for (let i = 0; i < str.length; i++){
                targetSring += m.get(str.slice(i,i+1));
            }
        }
        this.setState((preStates,props)=>({
                targetString:targetSring
        })
        );
    }

    getAnswerSigns(){
        let index = this.state.index;
        let string = this.state.targetString;
        let arrOfAns = this.state.arr;
        //当前课程有记录的话则
        let arr = [];
        if(this.state.arrayOfIds){
            if(string){ //如果有的话，只显示这个样式，且如果用户不答题的话，样式不改变。用户一旦答题，样式改变 已做 作对
                for (let i = 1; i <= this.state.arrayOfIds.length; i++) {
                    if(index === i-1){ //当前选中
                        arr.push(
                            <div className="answer-sign chooseStyle" onClick={this.jumpTo.bind(this)} id={i} key={i} >{i}</div>
                        );
                    }
                    //没有做，一开始的默认状态
                    else if (arrOfAns[i-1] && (arrOfAns[i-1].join('')) === this.state.questions[i-1].data.answer){
                        arr.push(<div className="answer-sign doneStyle" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>)
                    } //做错了：做题了，不满足上面的 || 没做题，且返回字符串为0
                    else if(!arrOfAns[i-1] && parseInt(string[i-1])){
                        arr.push(<div className="answer-sign lastDoneStyle" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>)
                    }
                    //做对的： 做了题且作对了
                    else if(arrOfAns[i-1]){
                        arr.push(<div className="answer-sign wrongStyle" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>);
                    }
                    else{
                        arr.push(<div className="answer-sign" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>);
                    }
                }
            }
            else{
                for (let i = 1; i <=this.state.arrayOfIds.length;i++) {
                    if(index === i-1){
                        arr.push(
                            <div className="answer-sign chooseStyle" onClick={this.jumpTo.bind(this)} id={i} key={i} >{i}</div>
                        );
                    }
                    else if(arrOfAns[i-1] && (arrOfAns[i-1].join(''))===this.state.questions[i-1].data.answer ){//用字符串比较的
                        arr.push(<div className="answer-sign doneStyle" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>);
                    }
                    else if(arrOfAns[i-1] ){
                        arr.push(<div className="answer-sign wrongStyle" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>);
                    }
                    else{
                        arr.push(<div className="answer-sign" onClick={this.jumpTo.bind(this)} id={i} >{i}</div>);
                    }

                }
            }
        }
        return arr;
    }

    render(){
        let questions = this.state.questions;
        let type = this.state.ques_type;
        let index = this.state.index;
        let disPlay = questions && questions[this.state.index] ? <a>
            <span className="final-answer">{ questions[this.state.index].data.answer === (this.state.arr[this.state.index] ? this.state.arr[this.state.index].join('') : null
            )
             ?
                "正确" : <span style={{color:'red'}}>错误</span>}</span>
            <span className="final-describe">本题答案: </span>
            <span className="final-answer">{questions[this.state.index].data.answer}</span>
            <span className="final-describe" >你的答案: </span>
            <span className="final-answer">{this.state.arr[this.state.index] ? this.state.arr[this.state.index] : "无" }</span>
        </a> : "加载中";

        let component = questions[this.state.index] ? <div>
            <div className="card answer-card-container" >
                <div className=" answer-card"  >
                    <div className="answer-process" style={this.state.styleHere} >
                        { this.getAnswerSigns() }
                    </div>
                    <div className="arrow-container">
                        <img src={arrow} alt="arrow" className="answer-arrow" onClick={this.handleToggle.bind(this)} style={this.state.rotate} />
                    </div>
                </div>
            </div>
            {<TestPage question={questions[this.state.index].data } index={this.state.index} //若index等于3，跳转3的choices过去
                       recordAnswer={this.recordAnswer.bind(this)} choices={this.state.choices[this.state.index]} answer = {this.state.AnswerNotRecite}  key={this.state.index} /> }
            <div className="card process">
                <div className="recite-container">
                    {this.state.AnswerNotRecite ? null :
                        <div className="recite-des">
                            <span className="showTitle">本题答案:<span className="recite-final">{questions[this.state.index].data.answer }</span></span>
                        </div>
                    }
                    <div className="process-prompt-container">
                        <div className="process-prompt">
                            <span className="answer-process-number">答题进度 {this.state.index + 1}/{this.state.arrayOfIds.length}</span>
                            <img src={questions[this.state.index].data.is_collected ? collect:collectN} alt="收藏" title="收藏"
                                 onClick={this.handleOnCollect.bind(this)}
                                 className="process-icon process-collect" />
                            <img src={feedback} alt="反馈" title="反馈"
                                 onClick={this.handleOnFeedBack.bind(this)}
                                 className="process-icon process-wrongAns" />
                        </div>
                    </div>
                </div>
                <div className="answer-check-container mobile-recite">
                    <div className="answer-check">
                        <div className="space" style={this.state.styleDis}></div>
                        {(parseInt(type) !== 1 && this.state.arr[index]) || (parseInt(type) === 1 && this.state.displayAns[this.state.index]&&this.state.AnswerNotRecite)
                            ? disPlay : null }
                        <div className="answer-button-groups recite-button-group">
                            {this.state.AnswerNotRecite&&parseInt(type)===1 ? <button onClick={this.handleDisAns.bind(this)}>查看对错</button> : null}
                            <button  onClick={this.handleLast.bind(this)}>上一题</button>
                            <button onClick={this.handleNext.bind(this)}  id="next-button" style={this.state.styleButton} >下一题</button>
                            <button onClick={this.toggleMode.bind(this)} id="check-answer" >{this.state.AnswerNotRecite ? "背题模式" : "答题模式"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;
        return(
            <div>
                {this.state.feedbackFlag ? <FeedbackCard feedBackClose ={this.handleFeedbackClose.bind(this)} /> : null}
                <div className="card title">
                    <div className="block"></div>
                    <h2 className="answer-title">{this.state.courseName}</h2>
                    <div className="toggle-container">
                    <span className="display-type">顺序练习-答题模式</span>
                    <div className="toggle-ans-type display" onClick={this.toggleMode.bind(this)}>
                        <span>{this.state.AnswerNotRecite ? "背题模式" : "答题模式"}</span>
                        <img className="answer-go" alt={goTo} src={goTo} />
                    </div>
                    </div>
                </div>
                {this.state.questions&&this.state.questions[this.state.index] ? component : <div className="answer-container"><LoadingAnimation /></div> }
            </div>
        )
    }

    //数组重置，单个管理，点击了就出现，再次点击就是刷新，但还是true
    handleDisAns(){
        let LastDis = this.state.displayAns;
        LastDis[this.state.index] = true;
        this.setState({
            displayAns: LastDis,
            styleDis: {
                display: "none"
            }
        });
    }

    recordAnswer(answer) {
        console.log(this.state.questions);
        let LastArr = this.state.arr;
        let index = this.state.index;
        //如果是更新答案
        if(this.state.arr[index]){
            LastArr.splice(this.state.index,1,answer)
        }
        else{
            LastArr[index] = answer;
            this.setState({
                doneNum: this.state.doneNum + 1
            })
        }
        this.setState({
            arr:LastArr,
        });
        //这里只需要用数组记录  //这里只需要一个记录答案的数组 arr = [[A],[B],[A,B,C]]
        //更新当前index的choices
        let arr = [false,false,false,false];
        let LastChoices = this.state.choices;
        answer.forEach(function (e) {
            arr[e.charCodeAt()-65] = true
        });
        LastChoices[index] = arr;
        this.setState({
            choices:LastChoices,
        });
        this.ansPost(index)
    }

    ansPost(index){ //标记用户背题，在答题情况下，点击查看就触发，在背题情况下，切换到该题就触发。
        let formData = new FormData();
        formData.append("ques_type",this.state.ques_type);
        formData.append("course_id",this.props.location.state.course_id);
        formData.append("index",index);
        fetch("https://exam.twtstudio.com/api/remember/current_course/write",{
            method:"POST",
            mode:"cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body:formData
        })
            .then(response => response.json())
            .then(data => {
            })
    }



    jumpTo(e){ //上来给你一个9
        let a = (typeof e === "number") ? e : parseInt(e.target.id)-1;
        if(this.state.fetchFlag[a]){
            this.setState({
                index:a,
            });
           this.indexMark(a,"从jump过去标记的，而且说这道题已经拿过了");
        }
        else{
            this.fetchData(a);
        }
        if(!this.state.AnswerNotRecite){
            this.ansPost(a);
        }
    }
    indexMark(index,message){ //标记index，触发西效果为切换到该题就触发 跳转也不及时
        let formData = new FormData();
        let ques_id = this.state.questions[index].data.ques_id;
        let ques_type = this.state.questions[index].data.ques_type;
        formData.append("course_id",this.props.location.state.course_id);
        formData.append("ques_type",ques_type);
        formData.append("ques_id",ques_id);
        formData.append("index",index);
        let url = "https://exam.twtstudio.com/api/remember/mark";
        fetch(url,{
            method:"POST",
            mode:"cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body:formData
        })
            .then(response => response.json())
            .then(data => {
            })
    }

    loopOfFetch(start,end,index){
        // console.log("这里可以来flag");
        let arrOfQues = this.state.questions;
        let num = 0;
        // console.log(this.state.fetchFlag[index]);
        let copyFetchFlag = this.state.fetchFlag;
        for( let i = start; i < end; i++){
            ((e)=> {
                let url = "https://exam.twtstudio.com/api/remember/getQuesById/" +
                    this.props.location.state.course_id +"/" + this.state.ques_type + "/" + this.state.arrayOfIds[e];
                fetch(url,{
                    //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
                })
                    .then(res => res.json())
                    .then(dataOfContent => {
                        arrOfQues[e] = dataOfContent;
                        num++;
                        copyFetchFlag[e] = true;
                        if(num === 9){
                            this.setState((preState,props)=>({
                                questions:arrOfQues,
                                fetchFlag:copyFetchFlag,
                                index:index
                            }));

                            setTimeout(()=>{ this.indexMark(index,"从loop过去标记的，这道题还没有拿过，因为没有拿过，所以比较方，特定给它做了个延时"
                            );},1000)
                        }
                    })
            })(i)
        }
    }

    fetchData(index){
        //给我index 23  最多只有26个id
        let quotient = parseInt(index/10);
        if(this.state.arrayOfIds.length/10 === quotient){
            this.loopOfFetch(quotient*10,this.state.arrayOfIds.length,index)
        }
        else{
            this.loopOfFetch(quotient*10,(quotient+1)*10,index)
        }

    }
    handleLast(){
        let index = this.state.index - 1;
        if(index < 0){
            return;
        }
        this.toggleIndex(index);
        if(!this.state.AnswerNotRecite){
            this.ansPost(index);
        }
    }
    
    toggleIndex(index){
        // 在还没有获取数据的时候index，要凉凉
        if(!this.state.fetchFlag[index]){
            this.fetchData(index)
        }else{
            this.setState({
                index:index
            });
            this.indexMark(index,"拿到了数据过去的");
        }
    }
    //当前是9 触发这个函数就要fetch，且要fetch10个
    //如果当前是 10-18，则没有问题

    handleNext(){ //标记背了，如果作对了，那还是传对的
        let index = this.state.index + 1;
        if(index >= this.state.arrayOfIds.length){
            return;
        }
        this.toggleIndex(index);
        if(!this.state.AnswerNotRecite){
            this.ansPost(index);
        }
    }
    handleFeedbackClose(){
        this.setState({
            feedbackFlag:false,
        });
    }
    myFunction(){
        this.props.history.push("/");
    }
    componentWillMount(){
        if(!this.props.location.state){
            this.props.history.push("/");
        }
    }
    componentDidMount(){
        // 应该是从记录开始做起的,
        //原来是个数组，index0是课程id 1的题目类型
        if(!this.props.location.state){
            return;
        }
        fetch("https://exam.twtstudio.com/api/course/"+this.props.location.state.course_id,{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(res=>res.json())
            .then(data=>{
                    this.setState({
                        courseName: data.data.course_name,
                    });
                    let url = "https://exam.twtstudio.com/api/remember/getAllId/"+ data.data.id +"/"+ this.props.location.state.type;
                        fetch(url,{
                            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
                        })
                            .then(res=>res.json())
                            .then(dataOfId=>{
                                if(dataOfId.message === "没有题目") {
                                    alert("喔唷，此课程无题目");
                                    this.myFunction();
                                }
                                else{ //有题的情况下，根据index来渲染题目
                                    this.setState((preState,props)=>({
                                        ques_type:this.props.location.state.type,
                                        arrayOfIds:dataOfId.data
                                    }));
                                    //还没有获取题目哦，初始化应该获取题目
                                    this.jumpTo(parseInt(this.props.location.state.index));
                                }
                            }
                            );
            }
            )
            .catch(function (e) {
                console.log("fetch fail");
            });
        //将所处的index传给后台
        this.stringResolve();
    }
    handleToggle(){   
        //如果不是折叠的话 
        if(this.state.fold){ //只有在展开的时候记录
            let div = document.getElementsByClassName('answer-process')[0];
            this.height = div.clientHeight;
        }
        if(!this.state.fold){
            //确保回到首行
            this.setState({
                styleHere:{height:this.height},
                rotate:{transform: 'rotate(0deg)'}
            });
            
        }
        else{ //这是展开
            if(this.state.arrayOfIds.length>60)
            this.setState({
                styleHere:
                    {   height:'150px',
                        overflow:'none',
                        overflowY:'scroll',
                    },
                });
                else{
                    this.setState({
                        styleHere:{height:'auto'},
                })
            }
            this.setState({
                rotate:{transform: 'rotate(180deg)'}
            })
        }
        this.setState({
            fold:!this.state.fold
        });
    }
    toggleMode(){
        let div = document.getElementsByClassName('app-header')[0];
        let clientWidth = div.clientWidth;
        if(this.state.AnswerNotRecite && (clientWidth<=450)){
            this.setState({
                styleButton:{
                    marginLeft:"20px"
                }
            })
        }
        //从答题跳到背题，直接显示答案，故直接post
        if(this.state.AnswerNotRecite){
            this.ansPost(this.state.index);
        }
        this.setState({
            AnswerNotRecite:!this.state.AnswerNotRecite
        })
    }
    handleOnFeedBack(){
        this.setState({
            feedbackFlag:!this.state.feedbackFlag
        })
    }
    //true 就是收藏，false就是collect
    collectData(type){
        let formData = new FormData();
        formData.append("ques_type",this.state.ques_type);
        formData.append("ques_id",this.state.arrayOfIds[this.state.index]);
        let url = "https://exam.twtstudio.com/api/special/"+type+"/"+0;
        fetch(url,{
            method: "POST",
            mode: "cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body: formData
        })
            .then()
            .then(
                
            )
    }
    handleOnCollect(){
        let ques = this.state.questions;
        if(ques[this.state.index].data.is_collected){
            this.collectData("deleteQues")
        }
        else{
            this.collectData("addQues")
        }
        ques[this.state.index].data.is_collected = !ques[this.state.index].data.is_collected;
        this.setState({
            questions:ques
        });
    }
}
export default withRouter(Answer);