import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import {withRouter} from 'react-router-dom';
import http from '../assets/js/axios'
import {SessionStorages} from '../assets/js/fun'
const FormItem = Form.Item;

class Login extends Component {
    state = {
        userName:''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    username:values.userName,
                    password:values.password
                }
                http.post('/api/login',[data]).then(res=>{
                    const resData = res.data;
                    if(resData.code === 200 ){
                        SessionStorages.set('_REACTLJXADMINTOKEN',resData.data);
                        self.props.history.push('/index');
                    }
                }).catch(err=>{

                })
            }
        });
      }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="whiteBack">
                    <div className="loginForm">
                        <div className="login-logo">
                            Admin
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="/">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/">register now!</a>
                            </FormItem>
                        </Form>
                    </div>
                    <div className="back"></div>
                </div>
            </div>
        );
    }
}

export default Form.create()(withRouter(Login));