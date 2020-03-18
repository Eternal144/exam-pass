import React,{Component} from 'react';

import icon from '../../icon/mainIcon/circle.png'
import arrow from '../../icon/mainIcon/arrow.png'
import {Link} from 'react-router-dom'
import '../../CSS/party.css'

class PartyChoose extends Component{
    constructor(){
        super();
        this.state={
            arrData:[],
        }
    }
    componentWillMount(){
        if(!this.props.location.state){
            this.props.history.push("/");
        }
    }
    componentDidMount(){
        if(!this.props.location.state){
            return;
        }
        fetch('https://exam.twtstudio.com/api/class/2')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let arr = [];
                let classes = data.data;
                for(let i=0;i<classes.length;i++){
                    arr.push(
                        <Link to={{pathname:'/alternative',state:i+2}} >
                            <div className="party-container" title={classes[i].course_name} >
                            <img src={icon} className="party-sign" alt="标记"  />
                            {classes[i].course_name}
                            <img src={arrow} className="party-arrow disappear" alt="箭头" />
                        </div></Link>
                    )
                }
                this.setState({
                    arrData:arr,
                })
            })
    };
    render(){
        let projectName = this.props.location.state;
        let component = projectName ? <div>
            <div className="card title">
                <div className="block"></div>
                <h2>{this.props.location.state}</h2>
            </div>
            <div className="card party">
                <span className="showTitle">选择课程</span>
                {this.state.arrData}
            </div>
        </div> : null;
        return(
            <div>
            {component}
            </div>
        )
    }
}
export default PartyChoose;