import React,{Component} from 'react';

import '../../CSS/personalCard.css';
import '../../CSS/personalUnfold.css';
import RemoveForSure from './RemoveForSure';
import WrongCard from  './WrongCard';
import pic from '../../icon/personal/noData.png'
import LoadingAnimation from '../LoadingAnimation'
class MyWrongUnfold extends Component{

    constructor(){
        super();
        this.state={
            removeDis:false,
            data:null,
            ques_type:null,
            ques_id:null,
            length:null,
            deleteIndex:0
        }
    }
    getListOfWrongAns(){
        let arr= [];
        this.state.data.map((value,i)=>{
            arr.push(<div className="child" key={i} ><WrongCard  data={value} index={i} removeDisplay={this.handleToggleDis.bind(this)} /></div>)
        });
        return arr;
    }
    render(){
    let data = this.state.data;
    let length = this.state.length;
    let component = data && length > 0 ? <div>
        <div className="personal-wrong-title">
            <span>错误总题目数：{length}</span>
        </div>
        <div className="father">
            {this.getListOfWrongAns()}
        </div>
        </div> :
        <div className="noData-container">
            <div className="noData-words">暂时没有题目，快去刷题吧~</div>
            <div className="clear"></div>
            <img src={pic} className="noData" alt="no-data" />
        </div>;
        return(
            <div>
                {this.state.removeDis ?<div><RemoveForSure index={this.state.deleteIndex} ques_type={this.state.ques_type} ques_id={this.state.ques_id} removeDisplay={this.handleToggleDis.bind(this)} /></div>
                 : null}
                {this.state.data ? component : <div style={{minHeight:"600px"}}><LoadingAnimation /></div>}
            <div>
            </div>
            </div>
        )
    }

    handleToggleDis(index,flag,ques_type,ques_id){ //父元素控制的数据给子元素‘
        //console.log(index);
        if(flag === 1){
            this.setState({
                ques_type:ques_type,
                ques_id:ques_id,
                removeDis:true,
                deleteIndex:index,
            });
            //this.setBlur();
        }
        else if (flag === 0 || flag === 2){
            this.setState((preStates,props)=>({
                removeDis: false
        }));
            //this.removeBlur();
        }
        //获取index
       if(flag === 2){ //就是做一个动画把这个组件移走
           //把列表的特定index的去掉
           //childNodes[index].style.opacity='0';
           //setTimeout(()=>fatherNode.removeChild(childNodes[index]),500);
           //把当前列表里的数据重置,为啥子index没有重置呀
           let data = this.state.data;
           let copyData = data.filter((value,i)=>i!==index);
           this.setState({
                length:this.state.length-1,
                data:copyData
           })
        }
    }
    // getBlurArr(){
    //     let arr = [];
    //     arr.push(document.getElementsByClassName("personal-center")[0]);
    //     arr.push(document.getElementsByClassName("app-header")[0]);
    //     arr.push(document.getElementsByClassName("footer")[0]);
    //     return arr;
    // }
    // setBlur(){
    //     let arr = this.getBlurArr();
    //     for (let i = 0; i < 3; i++){
    //         arr[i].style.webkitFilter = "blur(2px)";
    //     }
    // }
    // removeBlur(){
    //     let arr = this.getBlurArr();
    //     for (let i = 0; i < 3; i++){
    //         arr[i].style.webkitFilter = "none";
    //     }
    // }
    componentWillMount(){
        fetch("https://exam.twtstudio.com//api/special/getQues/1",{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data:data.data,
                    length:data.data.length
                });
            });
    }
}
export default MyWrongUnfold;