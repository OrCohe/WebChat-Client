import React from 'react';
import ServerAPI from '../../server'
import {Form, FormGroup, Button, Col, FormControl} from 'react-bootstrap'
const ServerApi = new ServerAPI();

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            errName: false,
            errPassword: false,
            errLogin: false
        }
    }
    attempLogin() {
        (this.state.name.trim().length < 2 ? this.setState({errName: true}) : this.setState({errName: false}));
        (this.state.password.trim().length < 4 ? this.setState({errPassword: true}) : this.setState({errPassword: false}));
        setTimeout(() => {
            if(!this.state.errName && !this.state.errPassword) {
                ServerApi.login({name: this.state.name, password: this.state.password}, (data) => {
                    if (data.status) {
                        this.setState({name: '', password: ''});
                        return this.props.loginSuccess(data);
                    } else {
                        return this.setState({errLogin: true});
                    }
                });
            }
        },0)  
    }
    render() {
        return (
            <div style={{height: '80vh', paddingTop: '10%'}}> 
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName" validationState={this.state.errName || this.state.errLogin ? "error" : null}>
                        <Col smOffset={3} sm={1}>
                            Name
                        </Col>
                        <Col sm={5}>
                            <FormControl onChange={(evt) => {this.setState({name: evt.target.value})}} value={this.state.name} type="text" placeholder="Enter your Name" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" validationState={this.state.errPassword || this.state.errLogin ? "error" : null}>
                        <Col smOffset={3} sm={1}>
                            Password
                        </Col>
                        <Col sm={5}>
                            <FormControl onChange={(evt) => {this.setState({password: evt.target.value})}} value={this.state.password} type="password" placeholder="Enter your Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={4} sm={10}>
                            <Button onClick={() => this.attempLogin()}>Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>;
            </div>
        )
    }
}

export default LoginPage;