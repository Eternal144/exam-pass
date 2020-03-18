import React,{Component} from 'react';
import code from '../../icon/personal/QR-code.jpg';
import feedback from '../../icon/mainIcon/feedback-gray.png';

class Feedback extends Component{
    constructor(){
        super();
        this.state={
            display:false
        }
    }
    handleToggle(){
        this.setState({
            display:!this.state.display,
        })
    }
    render(){
        let component = <div className="feedback-card-container">
            <div className="word-left">
                <p>题目有误？</p>
                <p>是否加群反馈？</p>
            </div>
            <img style={{height:"90px"}} src={code}/>
        </div>;
        return(
            <div>
                {this.state.display ? component : null}
            <div className="feedback-fixed" onClick={this.handleToggle.bind(this)} >
                <img style={{height:"40px"}} src={feedback} />
            </div>
            </div>
        )
    }
}
export default Feedback;

