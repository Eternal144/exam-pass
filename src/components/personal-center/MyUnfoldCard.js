import React,{Component} from 'react'
import TwT from '../../icon/personal/tiantian.jpg'
import code from '../../icon/personal/QR-code.jpg'
import '../../CSS/personalCard.css'
import '../../CSS/personalUnfold.css'
class UpUnfoldCard extends Component{
    render(){
        return(
        
            <div className="upload-img-container">
                        <div className="upload-container">
                        <p>上传功能暂未开放，如有批量题目需上传分享，请加入群<span>738068756</span>与管理员进行联系~</p>
                            <img src={TwT} alt="天外天萌娃" className="upload-icon"/>
                            <img src={code} alt="二维码" className="upload-icon" />
                            </div>
                        </div>
                       
        )
    }
}
export default UpUnfoldCard;