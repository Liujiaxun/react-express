import React, { Component } from 'react';
import { Icon, Popconfirm} from 'antd';
import './panel.styl';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShrink:false,
            fullScreen:false
        }
    }   

    getChilds = (childThis) => {
        this.children = childThis;
    }

    setShrink = () => {
        const isShrink = !this.state.isShrink;
        this.setState({
            isShrink
        })
        this.children && this.children.changeView();
    }

    setFullScreen = () =>{
        const fullScreen = !this.state.fullScreen;
        this.setState({
            fullScreen
        });
        console.log(this.children);
        this.children && this.children.changeView();
    }
    render() {
        const { title,Children } = this.props;
        return (
            <div className={this.state.fullScreen ? 'panel fullScreen' : 'panel'}>
                <div className='panel-header' >
                    <div className='panel-title'>
                        {title}
                    </div>
                    <div className='panel-tool'>
                        {/* <span>
                            <strong><Icon type='redo' className='rego' /></strong>
                        </span> */}
                        {
                            !this.state.isShrink?
                                <span onClick={this.setFullScreen}>
                                    <Icon type={ !this.state.fullScreen ?'arrows-alt':'shrink'} />
                                </span>:''
                        }
                        {
                            !this.state.fullScreen ?
                            <span onClick={this.setShrink}><Icon type={this.state.isShrink ? 'plus' : 'minus'} /></span>:''
                        }
                        <Popconfirm placement="topRight" title='你确认关闭这个面板吗' okText="Yes" cancelText="No">
                            <span>
                                <Icon type='close' />
                            </span>
                        </Popconfirm>
                    </div>
                </div>
                <div className={this.state.isShrink ? 'panel-content isShrink':this.state.fullScreen ?'panel-content fullScreen':'panel-content'} >
                    <div className='panel-body'>
                        {Children?<Children getChilds={this.getChilds}  />:''}
                    </div>
                </div>
            </div>
        );
    }
}



export default Panel;