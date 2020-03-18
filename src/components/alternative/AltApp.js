import React,{Component} from 'react';
import Title from './Title';
import exercise from '../../icon/mainIcon/random.png'
import arrow from '../../icon/mainIcon/arrow.png'
import test from '../../icon/mainIcon/order.png'
import circle from '../../icon/mainIcon/cicle2.png'
import {Link,withRouter} from 'react-router-dom'
import '../../CSS/altnative.css'


class AltApp extends Component{
    constructor(){
        super();
        this.myRef = React.createRef();
        this.state={
            data:null,
            typeAndSingleId:{},
            typeAndMulId:{},
            typeAndJudgeId:{},
        };
    }
    render(){
        let data = this.state.data;
        return(
            <div className="app" ref="app">
                <Title title = {data ? data.course_name : null} />
                <div className="card pattern">
                    <div className="alternative-pattern-container">
                        <h3 className="alternative-pattern">
                            刷题模式
                        </h3>
                        <Link to={{pathname:'/alternative/test', state:{course_id:this.props.location.state}}}  >
                            <div className="pattern-exercise-card" >
                                <div className="pattern-type-container">
                                <img src={exercise} alt="exercise" className="pattern-icon" />
                                <span className="pattern-words">测试练习</span>
                                </div>
                                <img src={arrow} alt="test" className="alter-arrow disappear" />
                            </div>
                        </Link>
                        <div className="pattern-test-card">
                            <div className="alter-menu">
                                {<img src={test} alt="exercise" className="pattern-icon" />}
                                <span className="pattern-words">刷题复习</span>
                            </div>
                            <Link to={{pathname:'/alternative/answer',state:this.state.typeAndSingleId }}>
                                <div className="alt-type alt">
                                    <div className="alt-words">
                                        <img alt="circle" className="circle" src={circle} />
                                    <span className="pattern-type">单选题</span>
                                        <span>{data ? data.single_done_count + "/" + data.single_num : "加载中"}</span>
                                    </div>
                                    <img src={arrow} alt="test" className="alter-arrow disappear" />
                                </div>
                            </Link>
                            <Link to={{pathname:'/alternative/answer',state:this.state.typeAndMulId }}>
                                <div className="alt-type alt">
                                    <div className="alt-words">
                                        <img alt="circle" className="circle" src={circle} />
                                        <span className="pattern-type">多选题</span>
                                        <span>{data ? data.multi_done_count + "/" + data.multi_num : "加载中"}</span>
                                    </div>
                                    <img src={arrow} alt="test" className="alter-arrow disappear" />
                                </div>
                            </Link>
                            <Link to={{pathname:'/alternative/answer',state:this.state.typeAndMulId}}>
                                <div className="alt-type">
                                    <div className="alt-words">
                                        <img alt="circle" className="circle" src={circle} />
                                        <span className="pattern-type">判断题</span>
                                        <span>{data ? data.decide_done_count + "/" + data.decide_num : "加载中"}</span>
                                    </div>
                                    <img src={arrow} alt="test" className="alter-arrow disappear" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

    componentWillMount(){
        if(!this.props.location.state){
            this.props.history.push("/");
        }

        //获取了课程的id
    }
    componentDidMount(){
        // console.log(this.refs.app);
        // this.refs.app.scrollTop = 0;
        window.scrollTo(0,0)
        if(!this.props.location.state){
            return;
        }
        fetch('https://exam.twtstudio.com/api/course/'+this.props.location.state,{
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data:data.data,
                    typeAndSingleId:{
                        course_id:this.props.location.state,
                        type:0,
                        index:data.data.single_ques_index
                    },
                    typeAndMulId:{
                        course_id:this.props.location.state,
                        type:1,
                        index:data.data.multi_ques_index
                    },
                    typeAndJudgeId:{
                        course_id:this.props.location.state,
                        type:2,
                        index:data.data.decide_done_index
                    },
                })
            });
    }

}
export default withRouter(AltApp);