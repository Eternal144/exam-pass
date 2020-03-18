import { Route,Switch,BrowserRouter as Router } from "react-router-dom";
import Main from './Main';
import Media from './Media';
import error from './error'
import React,{ Component } from 'react'
import Login from './loginIn'; 
import firstPage from './firstPage/App';
import Header from './Header';
import Footer from "./firstPage/Footer";
import PersonalMain from "./personal-center/PersonalMain";

class SwitchRouter extends Component{
    constructor(props) {
        super(props);
        this.state={
            media: false,
            flag: false
        };
    }
    render(){
        return(
            <div style={{width:"100%"}}>
                <Media flag={this.state.media} />
                <div className="mainPage-container" id={this.state.media ? "media-slide" : "media-back"}>
                <Header changeLogin={this.handleToggle.bind(this)} />
                    <Switch >
                        <Route exact path="/" component={firstPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/personal" component={PersonalMain}/>
                        <Route path="/alternative" component={Main} />
                        <Route component={error} />
                    </Switch>
                <Footer />
                </div>
            </div>
        )
    }

    handleToggle(){
        this.setState({
            media: !this.state.media,
        })
    }
}
export default SwitchRouter;