import React,{Component} from 'react';
import Alternative from './alternative/AltApp';
import Answer from './answerPage/Answer';
import Test from './answerPage/Test';
import ReactApp from './report/ReportApp';
import AnalysisApp from './analysis/AnalysisApp';
import PartyChoose from './party/PartyChoose';
import{Route, Switch} from 'react-router-dom';

class Main extends Component{

    render(){
        return (
            <div>
                <div className="page-container">
                <Switch>
                    <Route exact path="/alternative" component={Alternative} />
                    <Route path="/alternative/party" component={PartyChoose} />
                    <Route path="/alternative/answer" component={Answer} />
                    <Route exact path="/alternative/test" component={Test} />
                    <Route exact path="/alternative/test/report" component={ReactApp} />
                    <Route path="/alternative/test/report/analysis" component={AnalysisApp} />
                </Switch>
                </div>
            </div>
        )
    }
    componentWillMount(){
        fetch("https://exam.twtstudio.com/api/student",{
            credentials: "include",
            method: "GET",
            cors: "no-cors"
        })
            .then(response => response.json())
            .then(data=>{
                if(!data.data){
                    window.location.href='https://exam.twtstudio.com/api/login'
                }
            })
    }
}
export default Main;