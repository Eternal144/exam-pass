import React,{Component} from 'react';
import '../../CSS/personalCard.css'
import '../../CSS/personalUnfold.css'
import HistoryCard from './HistoryCard';
import pic from '../../icon/personal/noData.png'
import {Link} from 'react-router-dom'
import LoadingAnimation from "../LoadingAnimation";

class PersonalApp extends Component{
    constructor(props){
        super(props);
        this.state={
            arr:null,
            index:0,
            media:1,
            message:null
        };
        this.resize = this.resize.bind(this);
    }
    //返回pathname和state
    getLink(value){
        if(value.type === "1"){ //是测验
            return {
                pathname:'/alternative/test',
                state:{
                    course_id:value.course_id,
                }
            }
        }
        else{
            return {
                pathname:'/alternative/answer',
                state:{
                    course_id:value.course_id,
                    type:value.ques_type,
                    index:value.done_index,
                }
            }
        }
    }
    //8个一组，跳的第几页渲染第几个数组的数据，哈哈哈哈我真是太聪明了
    // groupDivide(data){
    //     if(data){
    //         let arrOfCopy = [];
    //         let numOfGroups = parseInt( data.length/8 ) +1;
    //         //分组
    //         let i = 0;
    //         while(i!==numOfGroups){
    //             arrOfCopy[i] = [];
    //             i++;
    //         }
    //         data.map((value,i)=>{
    //             let group = parseInt(i/8);
    //             arrOfCopy[group].push(value)
    //         });
    //         this.setState({
    //             arr:arrOfCopy
    //         })
    //     }
    // }

    getHistoryCard(){ //这里可以通过resize判断
        let arr = [];
        let flag = this.resize();
        if (flag && this.state.arr){
            this.state.arr.map((value,i)=>{
                arr.push(<Link to={this.getLink(value)}  key={i}><HistoryCard data={value} key={i}/></Link>)
            });
        }
        else{
            let m = 0;
            for (let i = 0; i < this.state.arr.length; i++){
                arr.push(<Link to={this.getLink(this.state.arr[i])} key={i} ><HistoryCard data={this.state.arr[i]} /></Link>)
                m++;
            }
        }
        return arr;
    }
    //button arr 最多存80个
    // getButton(){
    //     let arr = [];
    //     this.state.arr.map((value,i)=>{
    //         if(this.state.index === i){
    //             arr.push(<button className="report-button button-style history-menu-index menu-choose"   onClick={this.handleChangeIndex.bind(this)} key={i} id={i}>{i+1}</button>)
    //         }
    //         else{
    //             arr.push(<button className="report-button button-style history-menu-index"  onClick={this.handleChangeIndex.bind(this)} key={i} id={i}>{i+1}</button>)
    //         }
    //     });
    //     return arr;
    // }
    render(){
        let component = this.state.arr && this.state.arr.length >0  ? this.getHistoryCard() :
            <div className="noData-container">
                <div className="noData-words">暂时没有题目，快去刷题吧~</div>
                <div className="clear"></div>
                <img src={pic} className="noData" alt="no-data" />
            </div>;
        return(
            <div>
                <div className="history-unfold-container" id="history-container">
                    {this.state.arr ? component : <div style={{minHeight:"600px"}}><LoadingAnimation /></div>}
                </div>
                {/*<div className="answer-button-groups analysis history-menu-container disappear ">*/}
                    {/*<button className="report-button button-style history-menu" onClick={this.handleOnLast.bind(this)}>上一页</button>*/}
                    {/*{this.state.arr ? this.getButton() : "加载中"}*/}
                    {/*<button className="report-button button-style history-menu" onClick={this.handleOnNext.bind(this)}>下一页</button>*/}
                {/*</div>*/}
            </div>
        )
    }
    screenChange() {
        window.addEventListener('resize', this.resize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize(){
        let div = document.getElementById('history-container');
        let  clientWidth = div.clientWidth;
        console.log(clientWidth);
        if(clientWidth > 350){ // 大于650这样渲染
           return 1;
        }
        else{
            return 0;
        }
    }
    componentDidMount(){
        fetch("https://exam.twtstudio.com//api/student/history",{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    arr:data.data
                });
            });
        this.screenChange();
    }
    // handleOnLast(){
    //     if(this.state.index ===0 ){
    //         alert("前面没记录啦")
    //     }
    //     else{
    //         this.setState({
    //             index: this.state.index - 1
    //         })
    //     }
    // }
    // handleOnNext(){
    //     if(this.state.index !== this.state.arr.length-1){
    //         this.setState({
    //             index: this.state.index + 1
    //         })
    //     }
    //     else{
    //         alert("后面没记录啦")
    //     }
    // }

    // handleChangeIndex(e){
    //     this.setState({
    //         index:parseInt(e.target.id)
    //     })
    // }

}
export default PersonalApp;