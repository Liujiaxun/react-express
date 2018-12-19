import React,{Component} from 'react';
import {Row,Col,Spin,Icon,Timeline,Card,} from 'antd'
import {rnd} from '../../assets/js/fun'
import Panel from '../panel/panel'
import Echart from '../ECharts'
const {Meta} = Card;
const Bar = (props) => {
    let xLineData = () => {let x=[];for(let i=1;i<=50;i++){x.push(i)};return x;}
        let yData = ()=>{let y=[];for(let i=1;i<=50;i++){y.push(rnd(1,100))};return y;}
        let option = {
            backgroundColor: '#00263c',
            grid:{
                x:'35px',
                y:'20px',
                x2:'0px',
                y2:'25px'
            },
            xAxis: {
                type: 'category',
                data: xLineData(),
                axisLabel : {
                    fontFamily:'微软雅黑',
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                splitLine:{show: false},//去除网格线
                type: 'value',
                axisLabel : {
                    fontFamily:'微软雅黑',
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [{
                data: yData(),
                type: 'bar',
                barWidth: 15,
                barGap:'5%',/*多个并排柱子设置柱子之间的间距*/
                barBorderRadius: [5, 5, 0, 0] 
            }]
        };
    return (
            <Echart type='bar' width='1000px' height='200px' option={option} title='工作内容完成图' getChilds={props.getChilds} propsId='Bar'/>
    )
}
const Line = (props) => {
    let data = [];
    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI;
        let r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
    }
    let option = {
        polar: {
            center: ['50%', '54%']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {
            min: 0
        },
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
        }],
        animationDuration: 2000
    };
    return (
            <Echart type='line' width='300px' height='300px' option={option} propsId='line' getChilds={props.getChilds}/>
    )
}

const Projecttimeline = (props) =>{
    return (
        <div style={{width:'100%',padding:'10px',overflow:'hidden'}}>
            <Timeline>
                <Timeline.Item color="green">项目初步规划 2018-12-15</Timeline.Item>
                <Timeline.Item color="green">项目初步建立 2018-12-18</Timeline.Item>
                <Timeline.Item color="red">
                <p>整体很粗糙需要进一步改善 1</p>
                <p>未使用redux，flux，dva，router 相关 2</p>
                <p>还未准备响应式，目前只能是pc端 3 2018-12-18</p>
                </Timeline.Item>
                
            </Timeline>
        </div>
    )
}

const User = (props) => {
    let userPhoto = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    return (
        <Card
            hoverable
            cover={<img alt="example" src={userPhoto} />}
        >
            <Meta
            title="Europe Street beat"
            description="www.instagram.com"
            />
        </Card>
    );
}
class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading:true
        };
    }
    componentWillMount (){
        this.props.refresh(this);
        this.refresh();
    }
    refresh = () =>{
        let self = this;
        this.setState({
            loading:true
        });
        setTimeout(function(){
            self.setState({
                loading:false
            });
            console.log('刷新了');
        },1000)
    }
    render () {
        return (
            <div style={{padding:'0 10px'}}>
                <Spin spinning={this.state.loading} style={{width:'100%'}}>
                    <Row gutter={20}>
                        <Col xs={{ span: 24 }} lg={{ span: 6}}>
                            <div className='indexCard one'>
                            <h2>565</h2>
                                <h5>qq</h5>
                                <Icon type="qq" className='qq' spin />
                                <Icon type="qq" style={{fontSize:'100px',position:"absolute",bottom:'-30px',opacity:.8,right:0,color:'#cbbdee'}} />
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span:6}}>
                            <div className='indexCard two'>
                            <h2>565</h2>
                                <h5>wechat</h5>
                                <Icon type="wechat" className='wechat' spin />
                                <Icon type="wechat" style={{fontSize:'100px',position:"absolute",bottom:'-30px',opacity:.8,right:0,color:'#b8e5b1'}} />

                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 6}}>
                            <div className='indexCard three'>
                            <h2>565</h2>
                                <h5>apple</h5>
                                <Icon type="apple" className='apple' spin />
                                <Icon type="apple" style={{fontSize:'100px',position:"absolute",bottom:'-30px',opacity:.8,right:0,color:'#f4ab9f'}} />

                            </div>
                        </Col>
                        <Col xs={{ span: 24  }} lg={{ span: 6}}>
                            <div className='indexCard four'>
                                <h2>565</h2>
                                <h5>github</h5>
                                <Icon type="github" className='github' spin />
                                <Icon type="github" style={{fontSize:'100px',position:"absolute",bottom:'-30px',opacity:.8,right:0,color:'#9dd7ed'}} />
                            </div>
                        </Col>
                    </Row>
                    <div className="line"></div>
                    <Row gutter={24}>
                        <Col md={{span:24}}>
                            <Panel title='面板1' Children = {Bar} />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col sm={{span:24}} md={{span:8}}>
                            <Panel title='面板3' Children = {Line} />
                        </Col>
                        <Col sm={{span:24}} md={{span:8}}>
                            <Panel title='工作内容' Children = {Projecttimeline} />
                        </Col>
                        <Col sm={{span:24}} md={{span:8}}>
                            <Panel title='面板5' Children = {User} />
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }

}


export default Main;