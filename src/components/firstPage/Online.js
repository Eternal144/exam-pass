import React,{Component} from 'react';

import '../../CSS/online.css'
import logo from '../../icon/firstPage/online.png'
import unfold from '../../icon/firstPage/unfold.png'
import OnlineClasses from './OnlineClasses'

class Online extends Component{
    constructor(){
        super();
        this.state={
            classes:[],
            stylere:{},
            fold:true,
            rotateStyle:{}
        };
        this.height = 0;
    }
    render(){
        return(
            <div className="card online">
                <div className="online-container">
                    <div className="topInfo">
                        <img src={logo} className="list-logo" />
                        <span className="showTitle" >网课</span>
                    </div>
                    <div className="online-label" id="online-des"  style={this.state.stylere}>
                    { this.state.classes ?  this.state.classes.map((oneClass,i)=>
                        <OnlineClasses key={i} class={oneClass} data={this.props.data} />
                    ) : "加载中"}
                    </div>
                    <div className="online-unfold" onClick={this.handleToggle.bind(this)}>
                        <div id="online-words" >{this.state.fold ? "展开":"收起"}</div>
                        <img src={unfold} alt="unfold" style={this.state.rotateStyle}  className="online-arrow" />
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        fetch("https://exam.twtstudio.com/api/class/3")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    classes:data.data,
                })
            });

    }
    handleToggle(){
        //已得知是145应该保存
        if(this.state.fold){ //只有在展开的时候记录
            let div = document.getElementById('online-des');
            this.height = div.clientHeight;
        }
        this.setState({
            fold:!this.state.fold
        });
        if(!this.state.fold){
            this.setState({
                stylere:{height:this.height},
                rotateStyle:{transform: 'rotate(0deg)'}
            });
        }
        else{
            this.setState({
                stylere:{height:'auto'},
                rotateStyle:{transform: 'rotate(180deg)'}
            })
        }
    }
}
export default Online;