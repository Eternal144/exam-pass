import React,{Component} from 'react';
import avatar from '../../icon/firstPage/avatar.png'
import iconCar from  '../../icon/personal/title/car.png'
import iconShip from  '../../icon/personal/title/spaceship.png'
import iconPlane from  '../../icon/personal/title/plane.png'
import iconRocket from  '../../icon/personal/title/rocket.png'
import iconCarriage from  '../../icon/personal/title/carriage.png'
import {Link} from 'react-router-dom'
import '../../CSS/personal.css'

class Personal extends Component{
    constructor(props){
        super(props);
        this.state= {
            icon: iconCarriage,
    }
    }
    handleLogin=()=>{
        window.location.href='https://exam.twtstudio.com/api/login';
};
    render(){
        const data = this.props.data;
        let component = data ?
            <div>
                <div className="personal-container">
                    <Link to={{pathname:'/personal'}}>
                        <img src={data.avatar_url!=="https://i.twtstudio.com/uploads/" ? data.avatar_url : avatar} alt="avter" className="personal-avter"  /></Link>
                    <Link to={{pathname:'/personal'}}><div className="personal-info">
                        <h3>{data.twt_name}</h3>
                        <span className="grade myself">用户等级 1</span>
                    </div>
                    </Link>
                    <img src={this.state.icon} alt="title" className="personal-designation" />
                    <div className="clear"></div>
                </div>
                <div className="info-container">
                    <div className="my-collection">
                        <Link to={{
                            pathname:'/personal',
                            state:[0,1,0,0]
                        }}>
                            <span className="number">{data.collect_count}</span>
                            <span className="myself">我的收藏</span>
                        </Link>
                    </div>
                    <div className="my-collection">
                        <Link to={{
                            pathname:'/personal',
                            state:[0,0,1,0]
                        }}>
                            <span className="number">{data.error_count}</span>
                            <span className="myself">我的错题</span>
                        </Link>
                    </div>
                    <div className="my-collection">
                        <Link to={{
                            pathname:'/personal',
                            state:[1,0,0,0]
                        }}>
                            <span className="number">{data.done_count}</span>
                            <span className="myself">练习历史</span>
                        </Link>
                    </div>
                </div>
            </div>
            : //我是真的不会写登录判断哭唧唧
            <div>
                <div className="personal-container" onClick={this.handleLogin}>
                        <img src={avatar} alt="avatar" className="personal-avter"  />
                    <div className="personal-info">
                        <h3>用户名</h3>
                        <span className="grade myself">用户等级 1</span>
                    </div>
                    <img src={this.state.icon} alt="title" className="personal-designation" />
                    <div className="clear"></div>
                </div>
                <div className="info-container">
                    <div className="my-collection" onClick={this.handleLogin}>
                            <span className="number">0</span>
                            <span className="myself">我的收藏</span>
                    </div>
                    <div className="my-collection" onClick={this.handleLogin}>
                            <span className="number">0</span>
                            <span className="myself">我的错题</span>
                    </div>
                    <div className="my-collection" onClick={this.handleLogin}>
                            <span className="number">0</span>
                            <span className="myself">练习历史</span>
                    </div>
                </div>
            </div>;
        return(
            <div className="card personal">
                {component}
            </div>
        )
    }
    componentDidMount(){
        if(this.props.data){
            switch (this.props.data.title_name){
                case "刷题小汽车":{
                    this.setState({
                        icon:iconCar,
                    });
                    break;
                }
                case "刷题小飞机":{
                    this.setState({
                        icon:iconPlane,
                    });
                    break;
                }
                case "刷题小火箭":{
                    this.setState({
                        icon:iconRocket,
                    });
                    break;
                }
                case "刷题小飞船":{
                    this.setState({
                        icon:iconShip,
                    });
                    break;
                }
                default:{

                }
            }
        }

    }
}
export default Personal