import React,{Component} from 'react';
import '../../CSS/footer.css'
import logo from '../../icon/firstPage/cloud.png'
class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <div className="footer-container">
                    <span id="copyright" >©2000-2018 &nbsp;TwT  &nbsp;Studio &nbsp;<span className="disappear">/</span>&nbsp;<div className="footer-words"><a id="index">津ICP备05004358号-12</a>/津教备0767号</div></span>
                <img src={logo} className="cloud" alt="cloud" />
                </div>
            </div>
        )
    }
}
export default Footer;