import React, {Component} from 'react'

class MultipleQuestion extends Component{
    // componentDidUpdate(){
    //     let clear = document.getElementsByTagName("input");
    //     for (let i = 0; i < clear.length; i++) {
    //         let choices = this.props.choices ? this.props.choices : [false,false,false,false];
    //         clear[i].checked = choices[i];
    //     }
    // }
    componentDidMount(){
        let clear = document.getElementsByTagName("input");
        for (let i = 0; i < clear.length; i++) {
            clear[i].checked = this.props.choices ? this.props.choices[i] : false;
        }
    }
    // shouldComponentUpdate(nextProps){
    //     return this.props.index !== nextProps.index||this.props.answer !== nextProps.answer ;
    // }
    
    displayOptions(answerFlag, index){
        let component;
        if(answerFlag){
            component = <label>
            <div className="ques-chooses"  onClick={this.recordAnswer.bind(this)}>
                <input className="item"
                       key={ this.props.index } type="checkbox" name="A" />
                <span className="option">
            </span>
                <span className="choose-describe" >{this.props.options[index]}</span>
            </div>
        </label>
        }
        else{
            component = <div className="ques-chooses"  >
                <li><span>{String.fromCharCode(index + 'A'.charCodeAt(0))}</span>{this.props.options[index]} </li>
            </div>
        }
        return component;
    }

    render(){
        return(
            <div className="card question-card">
                <div className="ques-describe">
                    <span>【多选】{ this.props.index+1 }. {this.props.content}</span>
                </div>
                <form>
                    {this.displayOptions(this.props.answer,0)}
                    {this.displayOptions(this.props.answer,1)}
                    {this.displayOptions(this.props.answer,2)}
                    {this.displayOptions(this.props.answer,3)}
                </form>
            </div>
        )
    }
    recordAnswer() {
        let item1 = document.getElementsByClassName("item");
        let answer = [];
        for (let i = 0; i<4; i++){
            if(item1[i].checked){
                switch(i){
                    case 0:
                        answer.push("A");
                        break;
                    case 1:
                        answer.push("B");
                        break;
                    case 2:
                        answer.push("C");
                        break;
                    case 3:
                        answer.push("D");
                        break;
                    default:break;
                }
            }
        }
        if(this.props.recordAnswerTo){
            this.props.recordAnswerTo(answer);
        }
    }
}
export default MultipleQuestion;
