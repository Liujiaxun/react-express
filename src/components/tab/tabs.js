import React, { Component } from 'react';
import { Tabs } from 'antd'
import Components from '../component';
const TabPane = Tabs.TabPane;
class RouterTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: props.activeKey,
            allChildsFun:{}
        }
    }
    componentDidMount() {
        this.props.onRef(this);
    }

    onChange = (activeKey) => {
        this.state.allChildsFun[activeKey] && this.state.allChildsFun[activeKey].refresh();
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    onTabClick = (activeKey = 'index') => {
        this.setState({
            activeKey
        });
    }
    refresh = (childThis) =>{
        let allChildsFun = this.state.allChildsFun;
        allChildsFun[this.state.activeKey] = childThis;
        this.setState({
            allChildsFun
        })
    }
    remove = closeKey => {
        let Pane = this.props.Pane;
        let index;
        let newActiveKey;
        for (let i in Pane) {
            let item = Pane[i];
            if (item.key === closeKey) {
                index = i;
                break;
            }
        }
        if (Pane.length > 1) { newActiveKey = Pane[index - 1].key; }
        const newPane = Pane.filter(item => item.key !== closeKey);
        this.props.handPaneAndActiveKey(newPane, newActiveKey);
    }
    newRender = (actions, data) => {
        const SpecificStory = Components[actions.content];
        return <SpecificStory  refresh={this.refresh} setValue={data} />;
    }
    render() {
        const pane = this.props.Pane;
        return (
            <Tabs
                hideAdd
                type="editable-card"
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                style={{ height: '100%', overflow: 'hidden' }}
                onTabClick={this.onTabClick}
                onEdit={this.onEdit}
            >
                {
                    pane.map(item => <TabPane style={{ overflowY: 'auto',height:'100%',paddingBottom: '60px'}} key={item.key}
                        closable={item.close} tab={item.title}>
                        {item.content ? this.newRender(item, item) : item.key}
                    </TabPane>)
                }
            </Tabs>
        );
    }

}

export default RouterTabs;