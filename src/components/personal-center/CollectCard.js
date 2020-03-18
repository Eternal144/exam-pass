import React,{Component} from 'react';

import icon from '../../icon/personal/square.png';
import collected from '../../icon/mainIcon/collected.png';
import collectNot from '../../icon/mainIcon/collect.png'

class WrongCard extends Component{
    constructor(){
        super();
        this.state={
            styleHere:null,
            collected:true
        }
    }
    render(){
        let data = this.props.data;
        console.log(data);
        return(
            <div className="personal-wrong-card">
                <div className="wrong-title-container">
                    <img className="wrong-icon" src={icon} alt="小方块" />
                    <span>{data.course_name}——{this.getQuesType()}</span>
                </div>
                <div className="wrong-des">
                    <p>{data.content}</p>
                    {data ? this.getOptions() : "加载中" }
                </div>
                <div className="wrong-media">
                    <span>题目答案：{data.answer}</span>
                    <img className=" wrong-main-icon wrong-collect" title="取消收藏" onClick={this.handleOnCollect.bind(this)}
                         src={this.state.collected ? collected : collectNot } alt="收藏" />
                </div>
            </div>
        )
    }
    getQuesType(){
        if(this.props.data.ques_type === "0"){
            return "单选"
        }
        if(this.props.data.ques_type === "1"){
            return "多选"
        }
        if(this.props.data.ques_type === "2"){
            return "判断"
        }
    }

    getOptions(){
        let arr = [];
        this.props.data.option.map((value,i)=>{
            arr.push(<span style={this.state.styleHere} >{String.fromCharCode(i + "A".charCodeAt(0))} {value}</span>)
        });
        return arr;
    }
    componentDidMount(){
        let flag =  this.props.data.option.some((value)=>{
            return value.length > 6;
        });
        if(flag){
            this.setState({
                styleHere:{
                    display:"block"
                }
            })
        }
    }
    handleOnCollect(){
        //当前是收藏的，则取消
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
        formData.append("ques_type",this.props.data.ques_type);
        formData.append("ques_id",this.props.data.ques_id);
        let url = "https://exam.twtstudio.com/api/special/"+type+"/"+ tid;
        fetch(url,{
            method:"POST",
            mode:"cors",
            //headers:{},
            body:formData
        })
            .then()
            .then(
                data=>console.log(data)
            )
    }

}
export default WrongCard;
