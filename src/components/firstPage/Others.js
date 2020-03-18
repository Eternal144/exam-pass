import React,{Component} from 'react';
import logo from '../../icon/firstPage/more.png'

class Others extends Component{
    handleLogin=()=>{
        window.location.href='https://exam.twtstudio.com/api/login';
    };
    render(){
        return(
            <div className="card list others" onClick={this.handleLogin}>
                <div className="list-container">
                    <div className="list-left">
                        <img src={logo} alt="logo" className="list-logo" />
                        <span className="showTitle">其他科目</span>
                        <span className="describe">敬请期待</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Others;