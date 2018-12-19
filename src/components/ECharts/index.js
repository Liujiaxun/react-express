import React,{Component} from 'react';
import {gradientColor} from '../../assets/js/fun'
import echarts from 'echarts';
import PropTypes from 'prop-types'
let index = 0;
class Echarts extends Component{

    constructor(props){
        super(props);
        this.state = {
            index,
            chart:[],
        };
        props.getChilds(this);
    }

    componentDidMount(){
        this.changeView(2);
    }
    changeView(s=0){
        let Chart = echarts.init(document.getElementById('Echart'+this.props.propsId));
        let option = this.props.option;
        for(let i=0;i<option.series.length?option.series.length:0;i++){
            if(!option.series[i].itemStyle && option.series[i].type === 'bar'){
                option.series[i].itemStyle ={
                    color: (item) =>{
                        let colors = gradientColor('#9acb9f','#ff4653',50);
                        return colors[item.dataIndex]
                    }
                }
            }
        }
        Chart.setOption(option);
        window.onresize = function (){
            Chart.resize();
        }
    }
    render(){
        const {propsId} = this.props;
        return (
            <div  ref='onRef' id={'Echart'+propsId} style={{width:this.props.width,overflow
            :'hidden',height:this.props.height,margin:'0 auto'}}>
            </div>
        )
    }
}
Echarts.propTypes = {
    propsId:PropTypes.string,
    getChilds:PropTypes.func
}
export default Echarts;