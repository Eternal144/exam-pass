import React,{Component} from 'react';
import Personal from './Personal-app' 
import{Route} from 'react-router-dom';

class Main extends Component{
    //适配移动端的登出,和首页，个人中心
    render(){
        return (
            <div>
                <Route path="/personal"  component={Personal} />
            </div>
        )
    }

}
export default Main;