import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css"
import './assets/style/index.styl';
import Routers from './components/Routers'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routers />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
