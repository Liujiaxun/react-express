import React, { Component } from 'react';
import { Layout,Menu, Icon } from 'antd';
import RouterTabs from './tab/tabs';
import MenuData from '../router/menu';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class App extends Component {
  state  = {
    collapsed: false,
    Pane:[
      {
        title:'首页',
        key:'index',
        content:'Main',
        close:false
      }
    ],
    activeKey:'index'
  } 
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onRef = (ref) => {
    this.RouterTabs = ref
  }
  handPaneAndActiveKey = (Pane,activeKey) => {
    this.setState({
      Pane,
      activeKey
    },this.RouterTabs.onTabClick(activeKey));
  }
  menuClick = (val) => {
    // console.log(val.item.props);
    // return
    const Pane = this.state.Pane;
    let data = {
      title:val.item.props.data.title,
      key:val.item.props.data.key,
      content:val.item.props.data.content
    };
    const activeKey = data.key;

    for(let index in Pane){
      let paneItem = Pane[index];
      if(activeKey === paneItem.key){
        this.setState({
          activeKey
        });
        this.RouterTabs.onTabClick(activeKey);
        return;
      }
    }
    Pane.push(data);
    this.setState({
      Pane,
      activeKey
    },this.RouterTabs.onTabClick(activeKey));
  }
  render() {
    return (
      <Layout style={{height:'100%'}}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggle}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[MenuData[0].key]} mode="inline">
            {MenuData.map(item=> item.children.length > 0 ? <SubMenu
              key={item.key} 
              title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
              }>
              {item.children.map(c => <Menu.Item onClick={this.menuClick} data={c} key={c.key}>{c.title}</Menu.Item>)}
            </SubMenu> : <Menu.Item onClick={this.menuClick} data = {item} key={item.key}>
            <Icon type={item.icon} />
              <span>{item.title}</span> 
            </Menu.Item>) }
          </Menu>
        </Sider>
        <Layout>
        <Header style={{ background: '#fff', padding: 0 ,height:'60px'}} />
          <Content style={{padding:'10px',height:'100%'}}>
            <div style={{background:'#fff',height:'100%'}}>
              <RouterTabs onRef={this.onRef} Pane={this.state.Pane} handPaneAndActiveKey={this.handPaneAndActiveKey} activeKey= {this.state.activeKey} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
