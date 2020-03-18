import React,{Component} from 'react';
import ReportCard from "./ReportCard";
import '../../CSS/report.css'

class ReportApp extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        if(!this.props.location.state){
            this.props.history.push("/");
        }
    }

    render(){
        let projectName = this.props.location.state;
        let component = projectName ? <div>
            <div className="card title">
                <div className="block"></div>
                <h2>刷题报告</h2>
            </div>
            <ReportCard data={this.props.location.state} />
        </div> : null;
        return(
            <div>
                {component}
            </div>
        )
    }
}
export default ReportApp;