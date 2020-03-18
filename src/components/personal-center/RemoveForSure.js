import React,{Component} from 'react';
import close from '../../icon/mainIcon/close.png'
import '../../CSS/answer.css'

class SubmitForSure extends Component{
    handleOnclick(){
        if(this.props.removeDisplay){
            this.props.removeDisplay(this.props.index,0)
        }
    }
    handleRemove(){
        let formData = new FormData();
        // 查看删除的元素是否是用户点击的那个元素
        formData.append("ques_type",this.props.ques_type);
        formData.append("ques_id",this.props.ques_id);
        let url = "https://exam.twtstudio.com/api/special/deleteQues/1";
        fetch(url,{
            method:"POST",
            mode:"cors",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            body:formData
        })
            .then()
            .then(()=>{
                    if(this.props.removeDisplay){  // 分 0是普通false 1是true 2执行了任务，关闭窗口
                        this.props.removeDisplay(this.props.index,2)
                    }
            }
            );
    }
    render(){
        return(
            <div className="card submit">
            <img src={close} alt="close" className="submit-close" onClick={this.handleOnclick.bind(this)} />
            <div className="clear"></div>
            <div className="submit-container">
            <span>确定将本题移出错题本？</span>
            <div className="submitCard-buttons">
                    <button onClick={this.handleOnclick.bind(this)} >我再想想</button>
                    <button onClick={this.handleRemove.bind(this)} >我会做啦</button>
                <div className="clear"></div>
            </div>
            </div>
        </div>

        )
    }

}
export default SubmitForSure;