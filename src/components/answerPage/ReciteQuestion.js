import React, {Component} from 'react'

class ReciteQuestion extends Component{
    render(){
        return(
            <div className="card question-card">
                <div className=" quse-describe">
                    <span>【单选】 党章规定，（）在中央委员会全体会议期间，行驶中央委员会的职权</span>
                </div>
                        <div className="ques-chooses"  >
                            <span className="choose-describe recite-choose" >A.&nbsp;常务委员会</span>
                        </div>
                <div className="ques-chooses"  >
                    <span className="choose-describe recite-choose" >B.&nbsp;常务委员会</span>
                </div>
                <div className="ques-chooses"  >
                    <span className="choose-describe recite-choose" >C.&nbsp;常务委员会</span>
                </div>
            </div>
        )
    }
}
export default ReciteQuestion;
