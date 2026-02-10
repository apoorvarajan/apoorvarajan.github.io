import React from 'react'
import './playgroundStyles/playground.css'
import kiss from './playgroundAssets/kiss.gif'
import propose from './playgroundAssets/propose.gif'
class PlayGround extends React.Component<any,any> {
    constructor(props:any){
        super(props)
        this.state={
            noText:"No",
            cntNo:0,
            yes:false
        }
    }
    noClick=()=>{
        const {cntNo}=this.state
        const countMap = ['No','are you sure?','Really sure?','Think again!','Last chance','Surely Not?','You might regret this!','Give it another thought','Are you absolutely certain?','This could be a mistake','Have a heart','Don\'t be so cold','Change of heart?','Wouldn\'t you reconsider?','Is that your final answer?','You are breaking my heart ;(']
        let yesElem=document.getElementById('yes')
        let yesText = document.getElementById('yestext')
        if(yesElem!==null && yesText!==null){
            let w = parseInt(yesElem.style.width)
            let h = parseInt(yesElem.style.height)
            let l = parseInt(yesText.style.lineHeight)
            let f = parseInt(yesText.style.fontSize)
            yesElem.style.width=w+1+'em'
            yesElem.style.height=h+1+'em'
            yesText.style.lineHeight=l+1+'em'
            yesText.style.fontSize=f+1+'em'
            this.setState({
                cntNo:cntNo+1,
                noText:cntNo<15 ? countMap[cntNo+1] : countMap[15]
            })
        }
    }
    yesClick = () =>{
        this.setState({
            yes:true
        })
    }
    render(){ 
        const {noText,yes} = this.state
        return <div className='playground-wrap'>
                    {yes ? <div>
                        <img alt="fun-pic" src={kiss} height='400em'/>
                        <div className='yaay-yes'>
                            Yaaaay!!!
                        </div>
                    </div>:
                    <div>
                        <img alt="propose-pic" src={propose} height='400em'/>
                        <div className='val-q'> Will You be my Valentine?? </div>
                        <div className='ans-wrap'>
                            <div id="yes" className='yes-class' onClick={()=>this.yesClick()} style={{height:'5em',width:'5em'}}>
                                <div id='yestext' className='yes-text' style={{lineHeight:'5em'}}>
                                    Yes
                                </div>
                            </div>
                            <div>
                                <div className='no-class' onClick={()=>this.noClick()}>
                                    {noText}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
    }
}
export default PlayGround
