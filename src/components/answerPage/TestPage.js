import React,{Component} from 'react';
import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';


class TestPage extends Component{
    constructor() {
        super();
        this.state = {
            reFlag: false,
            feedbackFlag: false,
            chooseSelect: '加载中',
        }
    }

    render(){
        return(
            <div className="test">
                { parseInt(this.props.question.ques_type) === 1 ?
                <MultipleQuestion content={this.props.question.content} options={this.props.question.option} index={this.props.index}
                                  recordAnswerTo={this.recordAnswer.bind(this)} choices={this.props.choices}
                                answer = {this.props.answer}
                />
                :
                <SingleQuestion content={this.props.question.content} options={this.props.question.option} index={this.props.index} 
                            choices={ this.props.choices }  recordAnswerTo={this.recordAnswer.bind(this)}
                                answer = {this.props.answer}
                />
                }
            </div>
        )
    }

    recordAnswer(choice) {
            this.props.recordAnswer(choice);

    }
}
export default TestPage;