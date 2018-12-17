import React, { Component } from 'react';
import { Tabs } from 'antd'
import Components from '../component';
const TabPane = Tabs.TabPane;
class RouterTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: props.activeKey,
        }
    }
    componentDidMount() {
        this.props.onRef(this);
    }

    onChange = (activeKey) => {
        console.log(activeKey)
        this.tabPaneChild.refresh();
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
        this.tabPaneChild = childThis;
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
        // 正确！JSX 标签名可以为大写开头的变量。
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
                    pane.map(item => <TabPane style={{ overflowY: 'auto',height:'100%'}} key={item.key}
                        closable={item.close} tab={item.title}>
                        {item.content ? this.newRender(item, item) : item.key}
                    </TabPane>)
                }
            </Tabs>
        );
    }

}

export default RouterTabs;