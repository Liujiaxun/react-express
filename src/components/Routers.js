import React, { Component } from 'react';
import { Switch, HashRouter as Router, Route, Redirect} from 'react-router-dom';
import App from './App';
import Login from './Login';
import {SessionStorages} from '../assets/js/fun'
// import http from '../assets/js/axios'
const Redirects = ()=> <Redirect to={'login'}/>;
const Mismatching = () =>{
    return (
        <div>
            404
        </div>
    );
}

class Routers extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    requireLogin = (component, permission) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        if (process.env.NODE_ENV === 'production' && !permissions) { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return permission ? this.requireAuth(permission, component) : component;
    };

    isAuth(){
        const _REACTLJXADMINTOKEN = SessionStorages.get('_REACTLJXADMINTOKEN') || false
        console.log(_REACTLJXADMINTOKEN,'_REACTLJXADMINTOKEN');
        if(_REACTLJXADMINTOKEN){
            return true;
        }else{
            return false;
        }
    }
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path='/index'render = {props => (
                        this.isAuth() ? <App/> : <Redirects />
                    )} />
                    <Redirect exact from="/" to="/index"></Redirect>
                    <Route exact path='/login' component={Login}></Route>
                    <Route component={Mismatching}></Route>
                </Switch>
            </Router>
        );
    }
}

export default Routers;