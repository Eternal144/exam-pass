import React,{Component} from 'react';
import close from '../../icon/mainIcon/close.png'
import code from '../../icon/personal/QR-code.jpg'
import '../../CSS/feedback.css'

class FeedbackCard extends Component{
    handleOnclick(){
        if(this.props.feedBackClose){
            this.props.feedBackClose(false)
        }
    }
    render(){
        return(
            <div className="card submit feedback">
                <img src={close} alt="close" className="submit-close" onClick={this.handleOnclick.bind(this)} />
                <div className="feedback-container">
                    <div className="feedback-words-container">
                        <p className="showTitle">答案有误？</p>
                        <p className="showTitle">加入天外天用户群</p>
                        <p className="showTitle">进行反馈</p>
                        <p><span className="showTitle">群号：</span>
                            <span className="feedback-number">738068756</span></p>
                    </div>
                    <img src={code} alt="二维码" className="feedback-code" />
                </div>
            </div>
        )
    }
}
export default FeedbackCard;