import React,{Component} from 'react';
import {Row,Col,Spin,Icon} from 'antd'
import Panel from '../panel/panel'
import echarts from 'echarts';
const Pie = (props) => {
    let s = document.getElementById('pic');
    //   let myChart = echarts.init(document.getElementById(s));
        // 绘制图表
        // myChart.setOption({
        //     tooltip: {},
        //     xAxis: {
        //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // });
    return (
        <div id='pic'>1</div>
    )
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
            <div style={{padding:'0 10px 65px 10px'}}>
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
                            <Panel title='面板1' Children = {Pie} />
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }

}


export default Main;