import React,{Component} from 'react';

import Online from './Online'
import Others from './Others'
import Party from './Party'
import Personal from './Personal'
import Review from './Review'
import Situation from "./Situation";
import LoaingAnimation from '../LoadingAnimation'
import'../../CSS/index.css'


class App extends Component{
    constructor(){
        super();
        this.state={
            data:null,
            login: null, //登上了就是true，不然就是false
        }
    }
    render(){
        let data = this.state.data;
        let login = this.state.login;
        let component = <div>
            <Personal data={data} />
            <Review data={data}  code={login ? login : null } />
            <Party data={data} />
            <Situation data={data} />
            <Online data={data} />
            <Others />
        </div>;
        return(
            <div className="app">
                {this.state.login || this.state.data ? component : <LoaingAnimation />}
            </div>
        )
    }

    componentDidMount(){ //不判断了，只会记录下标了
        fetch("https://exam.twtstudio.com/api/student",{
            // credentials: "include",
            method: "GET",
            //headers:{'Authorization':'Bearer{eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY0MywiaXNzIjoiaHR0cHM6Ly9vcGVuLnR3dHN0dWRpby5jb20vYXBpL3YxL2F1dGgvdG9rZW4vZ2V0IiwiaWF0IjoxNTQ0MjcxODcyLCJleHAiOjE1NDQ4NzY2NzIsIm5iZiI6MTU0NDI3MTg3MiwianRpIjoiek5qbU5FR055Y3V6SVB1NiJ9.CqKbDpFac13CiSfJ6Q4XW5cx7LW9xv_KS2yZLJSGVww}'},
            cors: "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                if(data.error_code === 1000){
                    this.setState({
                        login:1000,
                    })
                }
                this.setState({
                    data:data.data,
                })
            })
    }
}
export default App;