import React, { Component } from 'react';
import { Layout,Menu, Icon, Switch,  Dropdown } from 'antd';
import RouterTabs from './tab/tabs';
import MenuData from '../router/menu';
import {themeColor} from './theme';
import { LocalStorages } from '../assets/js/fun'
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class App extends Component {
  constructor(props){
    super(props);
    this.state  = {
      collapsed: false,
      toolShow: false,
      selectThemeColorIndex:Number(LocalStorages.get('_LJXADMINTHEMECOLORINDEX'))|| 0,
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
  } 
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  toggleThemeToll = () => {
    const toolShow = !this.state.toolShow;
    this.setState({
      toolShow
    });
  }
  themeColorChange = (status,i) =>{
    this.setState({
      selectThemeColorIndex:i
    })
    LocalStorages.set('_LJXADMINTHEMECOLORINDEX',i);
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
  componentDidMount(){
    let objs = document.getElementsByClassName('headerItem');
    for(let i=0; i<objs.length;i++){
      objs[i].onclick = function(e){
        let className = objs[i].className;
        objs[i].className = className + ' active'
        for(let j=0;j<objs.length;j++){
          if(j !== i){
            objs[j].className = className;
          }
        }
      }
    }
    // objs.forEach(element => {
    //   console.log(element)
    // });
  }
  headerItemClick(e){
    console.log(e.getAttr)
  }

  menuClick = (val) => {
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
    const userMenu = (
      <Menu className='userMenus'>
         <Menu.Item>
         <div className='userMenu'>用户中心</div>
         </Menu.Item>
        <Menu.Item>
          <div className='userItem'>你好 - 系统管理员 </div>
        </Menu.Item>
        <Menu.Item>
          <div className='userItem'>个人信息 </div>
        </Menu.Item>
        <Menu.Item>
          <div className='userItem'>退出登录 </div>
        </Menu.Item>
        <Menu.Item>
         <div className='userMenu'> 设置中心</div>
         </Menu.Item>
        <Menu.Item>
          <div className='userItem'>个人信息 </div>
        </Menu.Item>
        <Menu.Item>
          <div className='userItem'>退出登录 </div>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout style={{height:'100%'}}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggle}
        >
          <div className="logo" style={{backgroundColor:themeColor[this.state.selectThemeColorIndex]}} />
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
        <Header style={{ background: '#fff', padding: 0 ,height:'60px'}}>
          <div className='header-content' style={{background:`linear-gradient(to right, ${themeColor[this.state.selectThemeColorIndex]}, rgba(210, 216, 216,.5))`}}>
              <Dropdown overlay={userMenu} trigger={['click']}>
                <div className='headerItem userPhoto'>
                    <div className='Avatar'>
                      <img alt='exprot' src="http://tupian.qqjay.com/tou2/2018/0414/812ac9992b9cee396b9b836f405b1fd9.jpg" />
                    </div>
                </div>
              </Dropdown>
              <div className='headerItem Notification'>
                    <Icon type='notification' className='rotate' />
                </div>
          </div>
        </Header>
          <Content style={{padding:'10px',height:'100%'}}>
            <div className={this.state.toolShow ? 'theme-tool active':'theme-tool'}>
              <span id='toggleTheme' onClick={this.toggleThemeToll}>
                <Icon className='themetoolIcon' type="setting" />
              </span>
              <div className="toolBox">
              {
                themeColor.map((item,index) =>(
                  <div className="boxItem" key={index}>
                    <span className='boxItem-color' style={{backgroundColor:item}}></span>
                    <Switch  
                      checked={this.state.selectThemeColorIndex === index ? true:false} 
                      onChange={(status)=>this.themeColorChange(status,index)} />
                </div>
                ))
              }
              </div>
            </div>
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
