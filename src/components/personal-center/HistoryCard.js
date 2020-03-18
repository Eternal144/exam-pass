import React,{Component} from 'react';

class HistoryCard extends Component{
    getStartTime(){
        let date = new Date(this.props.data.timestamp*1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() :  date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes());
        return Y+M+D+" "+h+m;
    }
    //将分数转化为百分比
    getProcessOrGate(){
        let data = this.props.data;
        if(data.type==="1"){ //是随机检测
            return  "正确率"+data.score + "%"
        }
        else{
            return data.done_count + "/" + data.ques_count;
        }
    }
    render(){
        let data = this.props.data;

        return(
            <div className="report report-time history">
                <span >【{data.type === "0" ?  "刷题复习" : "随机练习"}】</span>
                <span >{data.course_name}</span>
                —
                <span className="complete-rate">{this.getProcessOrGate()}</span>
                <span className="history-time">{data ? this.getStartTime() : "加载中"}</span>
            </div>
        )
    }
}
export default HistoryCard
