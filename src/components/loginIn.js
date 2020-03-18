import React,{Component} from 'react';

import {Link} from 'react-router-dom';

class Header extends Component{
    constructor(){
        super();
        this.state = {
            data:null
        }
        /*this.toUrl = "http://exam.twtstudio.com/api/login" + "?from=" + window.location.href;*/
       /* this.toUrl = "//exam.twtstudio.com/api/login" + "?from=" + window.location.href;*/
    }
    render(){
        return (
        <div>
        <div>
            刷题贼NB
        </div>
    </div>
        )
    }
    componentWillMount(){
        // setInterval(()=>{
        //     console.log(window.location.href);
        // },4000);
        // let str = window.location.href.split("token=")[1];
        // let token = str.slice(0,str.length-1);
        // console.log(token);
        // console.log("ahhhaa");
        fetch("https://exam.twtstudio.com/api/login",{
            method:"GET",
            cors:"no-cors",
            // header:{
            //     'token':token,
            // },
        }
            );
        // setTimeout(()=>{
        //     console.log("跳到首页");
        //     this.props.history.push("/");
        // },5000)
        // ;

    }
    componentDidMount(){
    
        // fetch("https://exam.twtstudio.com/api/student",{
        //     method:"GET",
        //     cors:"no-cors"
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             data: data.data
        //         })
        //     })
    }
}
export default Header;