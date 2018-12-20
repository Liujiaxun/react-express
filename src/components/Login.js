import React,{Component} from 'react';
import {Card} from 'antd';

class Login extends Component {
    state = {
        userName:''
    }

    render(){
        return (
            <div className="login">
                <div className="loginForm">
                <Card
                    title="Card title"
                    extra={<a href="#">More</a>}
                    style={{ width: 300 }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                </div>
            </div>
        );
    }
}

export default Login;