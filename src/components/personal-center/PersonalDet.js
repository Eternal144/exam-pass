import React,{Component} from 'react'
import avatar from '../../icon/firstPage/avatar.png'
import iconCar from  '../../icon/personal/title/car.png'
import iconShip from  '../../icon/personal/title/spaceship.png'
import iconPlane from  '../../icon/personal/title/plane.png'
import iconRocket from  '../../icon/personal/title/rocket.png'
import iconCarriage from  '../../icon/personal/title/carriage.png'

class PersonalDet extends Component{
    constructor(){
        super();
        this.state={
            icon:iconCarriage
        }
    }
    shouldComponentUpdate(nextProps){
        return nextProps === this.props;
    }
    render(){
        return(
            <div className="personal-avatar-container">
                <div className="float-left">
                <img src={this.props.avatar_url&&this.props.avatar_url!=="https://i.twtstudio.com/uploads/" ? this.props.avatar_url : avatar} alt="头像" className="personal-avatar" />
                    <span>{this.props.name ? this.props.name : "用户名" }</span>
                </div>
                    <img className="designation" alt="title" src={this.state.icon} />
            </div>
        )
    }
    componentDidMount(){
        switch (this.props.iconName){
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
        }
    }
}
export default PersonalDet;