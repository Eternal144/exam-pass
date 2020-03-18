import React,{Component} from 'react'

import collect from '../../icon/personal/collect.png'
import wrongAns from '../../icon/mainIcon/wrong-sets.png'
import update from '../../icon/personal/upload.png'
import history from '../../icon/personal/history.png'
import PersonalDet from './PersonalDet'

class PersonalApp extends Component{
    constructor(){
        super();
        this.state=({
            consistentName:"personal-router",
            backName:"personal-router-back",
            historyS:true,
            collectS:false,
            wrongS:false,
            updateS:false,
            personalData:null,
        });
    }

    render(){
        let data = this.state.personalData;
        let getComponent = function(){
            if(data){
                return <div className="personal-info-media">
                        <a className="personal-title">
                            <span className="disappear">个人中心</span>
                        </a>
                        <PersonalDet iconName={data.title_name}  name={data.twt_name}  avatar_url={data.avatar_url}/>
                        <div className="personal-data">
                            <div className="personal-data-container"><span className="done-num">已练习科目数</span><span className="disappear">：</span><span>{data.course_count}</span></div>
                            <div className="personal-data-container"><span className="done-num">已练习题目数</span><span className="disappear">：</span><span>{data.done_count }</span></div>
                        </div>
                    </div>
            }

        };
        return(
            <div className="personal-side">
                {getComponent()}
                <div className="button-groups">
                        <div className={this.props.data[0] ? this.state.backName:this.state.consistentName}
                             onClick={()=>this.props.getRenderState ? this.props.getRenderState([1,0,0,0]) : null }  >
                            <div className="personal-router-container ">
                                <img className="personal-icon" src={history} alt="历史"/>
                                <span ><span className="disappear">练习</span>历史</span>
                            </div>
                        </div>

                        <div className={this.props.data[1] ? this.state.backName:this.state.consistentName}
                             onClick={()=>this.props.getRenderState ? this.props.getRenderState([0,1,0,0]) : null } >
                            <div className="personal-router-container">
                                <img className="personal-icon" src={collect} alt="收藏"/>
                                <span><span  className="disappear">我的</span>收藏</span>
                            </div>
                        </div>

                        <div className={this.props.data[2] ? this.state.backName:this.state.consistentName}
                             onClick={()=>this.props.getRenderState ? this.props.getRenderState([0,0,1,0]) : null } >
                            <div className="personal-router-container">
                                <img className="personal-icon" src={wrongAns} alt="错题"/>
                                <span ><span  className="disappear">我的</span>错题</span>
                            </div>
                        </div>

                        <div className={this.props.data[3] ? this.state.backName:this.state.consistentName}
                             onClick={()=>this.props.getRenderState ? this.props.getRenderState([0,0,0,1]) : null } >
                            <div className="personal-router-container" >
                                <img className="personal-icon" src={update} alt="上传"/>
                                <span ><span className="disappear">我的</span>上传</span>
                            </div>
                        </div>
                </div>
            </div>
    )
    }

    componentWillMount(){
        switch (this.props.target){
            case "history":{
                this.setState({
                    historyS:true,
                    collectS:false,
                    wrongS:false,
                    updateS:false,
                });
                break;
            }
            case "collect":{
                this.setState({
                    historyS:false,
                    collectS:true,
                    wrongS:false,
                    updateS:false,
                });
                break;
            }
            case "wrong":{
                this.setState({
                    historyS:false,
                    collectS:false,
                    wrongS:true,
                    updateS:false,
                });
                break;
            }
            case "upload":{
                this.setState({
                    historyS:false,
                    collectS:false,
                    wrongS:false,
                    updateS:true,
                });
                break;
            }
        }
    }
    componentDidMount(){
        fetch("https://exam.twtstudio.com/api/student",{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(response => response.json())
            .then(data => {
                this.setState((preStates,props)=>({
                    personalData:data.data
                })
                );
            });
    }
}
    export default PersonalApp;