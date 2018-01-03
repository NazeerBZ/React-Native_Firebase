import React, { Component } from 'react';
import { Content, Form, Item, Input, Label, Text, Title } from 'native-base';
import Button from 'apsl-react-native-button';

export class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailText: '',
            passwordText: '',
        }
    }

    login = () => {

        if (this.state.emailText !== '' && this.state.passwordText !== '') {
            this.props.login(this.state.emailText, this.state.passwordText, this.props.goToMain);
            this.props.dataLoading(true);
        }
    }

    goToSignup = () => {
        this.props.goToSignup('signup')
    }

    render() {
        return (
            <Content padder>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                    </Item>
                </Form>

                <Button onPress={this.login} style={style.loginBtn} isLoading={this.props.isDataLoading}><Text>Login</Text></Button>
                <Title onPress={this.goToSignup} style={style.createAccountStyle}>Create a new account <Text style={style.signupStyle}>Signup</Text></Title>
            </Content>
        )
    }
}


const style = {
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    createAccountStyle: { color: 'black', fontSize: 15, marginTop: 7 },
    signupStyle: { color: '#365899' }
}



