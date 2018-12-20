import React from 'react';
import ReactDOM from 'react-dom';
// import {HashRouter,Route,Redirect} from 'react-router-dom'
import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import './index.css';
import "antd/dist/antd.css"
import './assets/style/index.styl';
import * as serviceWorker from './serviceWorker';
import { SessionStorages } from './assets/js/fun';
 
const AuthenticatedComponent = (Conponent) => {
    const Conp = Conponent;
    let _token = SessionStorages.get('_token') ? true : false;
    return (
        // {_token ? <Conp/> : <Redirect to={'/login'}/>}
        <Redirect to={'/login'}/>
    );
}

const NoMatch = () =>{
    return (
        <div>
            404
        </div>
    );
}

const Approuter = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path='/index' component={App}></Route>
                <Route path='/news' component={Login}></Route>
                <Redirect exact from="/" to="/index"></Redirect>
                <Route path='/login' component={Login}></Route>
                <Route component={NoMatch}></Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(<Approuter />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
