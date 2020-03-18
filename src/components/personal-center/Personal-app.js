import React,{Component} from 'react';
import Header from "./HeaderPersonal";
import Footer from "../firstPage/Footer";
import PersonalCard from './PersonalCard';
import Feedback from './Feedback'
import History from './MyHistoryUnfold';
import Collect from './MyCollectUnfold';
import Wrong from './MyWrongUnfold';
import Upload from './MyUnfoldCard'

class Personal extends Component{
    constructor(props){
        super(props);
        this.state={
            stateArr:[1,0,0,0]
        };
        this.map = new Map([[0,"History"],[1,"Collect"],[2,"Wrong"],[3,"Upload"]])
    }
    getComponent(){
        for(let i = 0; i < 4; i++){
            if(this.state.stateArr[i]){
                let component = this.map.get(i);
                switch (component){
                    case "History":
                        return <History />;
                        break;
                    case "Collect":
                        return <Collect />;
                        break;
                    case "Wrong":
                        return <Wrong />;
                        break;
                    case "Upload":
                        return <Upload />;
                        break;
                    default :
                        return "噢哟,出错了"
                }
            }
        }
    }
    handleGetRendering(arr){
        this.setState({
            stateArr:arr
        })
    }
    render(){
        
        // 当前状态是什么
        return(
            <div>
                <Feedback />
                <div className="personal-center">
                    <PersonalCard data={this.state.stateArr} getRenderState={this.handleGetRendering.bind(this)} />
                    <div className="personal-unfold-container" >
                    {this.getComponent()}
                    </div>
                </div>
            </div>
               
        )
    }
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                stateArr: this.props.location.state,
            })
        }
    }
}
export default Personal;