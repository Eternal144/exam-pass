import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class ReportCard extends Component{
    constructor(){
        super();
        this.state={
            wrongAnsData:null,
            allAnsData:null,
            course_id:null
    }
    }
    getDesWords(){
        let data = this.props.data;
        let len = data.data.result.length;
        let doneNum = len-data.data.not_done_num;
        let rightNum = data.data.correct_num;
        let percentage = parseFloat(data.data.correct_num/len).toFixed(2)*100;
        return  "总体量"+ len +"题，共答题" + doneNum +"题，答对"+rightNum+"道，正确率"+ percentage + "%";
    }
    getStartTime(){
        let date = new Date(this.props.data.date*1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() ;
        return Y+M+D+h+m;
    }
    render(){
        return(
        <div className="card report-card">
                <div className="report-card-container">
                    <div className="report report-name">
                        <span className="showTitle ">练习名称：</span>
                        <span className="report-des">
                            {this.props.data ? this.props.data.projectName:"加载中"}
                            </span>
                    </div>
                    <div className="report report-time">
                        <span className="showTitle ">答题时间：</span>
                        <span className="report-des">
                            {this.props.data ? this.getStartTime() : "加载中"}
                            &nbsp; &nbsp;
                            {this.props.data ? this.props.data.timeUsing : "加载中"}
                            </span>
                    </div>
                    <div className="report report-current">
                        <span className="showTitle report-key">本次练习：</span>
                        <span className="report-des">
                            {this.props.data ? this.getDesWords() : "加载中"}
                            </span>
                    </div>

                    <div className="report-container">
                        {/*我需要data过去*/}
                        <div className="answer-check report-button-groups">
                            <div className="answer-button-groups ">
                                <button className="report-button " id="noMargin"><Link to={{pathname:"/alternative/test/report/analysis",
                                    state:this.state.allAnsData,  //传进去题目id数组，传进去题目所有题目，每个题目自己有选项 还要传进去用户的答案,留result
                                }}>全部解析</Link></button>
                                <button className="report-button"><Link to={{pathname:"/alternative/test/report/analysis",
                                    state:this.state.wrongAnsData, //传进去错题id数组，传进去所有题目状态数组
                                }}>错题解析</Link></button>
                                <button className="report-button">
                                <Link to={{pathname:'/alternative/test', state:{course_id:this.state.course_id}}}
                                    >下一组<span className="disappear">练习</span></Link></button>

                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        )
    }
    
    componentDidMount(){
        //获取数组哦 要遍历，用of or in 就好 filter获取状态数组，现在获取了吧
        // console.log(this.props.data);
        let resultArr = this.props.data.data.result;
        // console.log(resultArr);
        let ques_state = [];
        resultArr.map((value)=>{
            //value是个对象
            ques_state.push(value.is_done &&value.is_true)
        });
      /*  let wrongAnsAnalysis = this.props.data.data.result.filter((value)=>{
            return !(value.is_done && value.is_true)  });*/
      //
        let allAnsAnalysis = this.props.data.data.result;
        this.setState({
            wrongAnsData:Object.assign({}, {ques_data: allAnsAnalysis, all_ques_state: ques_state,course_id: this.props.data.course_id ,type:"ques_wrong"}),
            allAnsData:Object.assign({},{ques_data:allAnsAnalysis, all_ques_state: ques_state,course_id: this.props.data.course_id}),
            course_id:this.props.data.course_id
        })
    }
}
export default ReportCard;