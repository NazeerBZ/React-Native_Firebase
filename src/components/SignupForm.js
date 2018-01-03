import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Text, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, Alert } from 'react-native';
import Button from 'apsl-react-native-button';


export class SignupForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            emailText: '',
            passwordText: ''
        }
    }

    signup = () => {

        if (this.state.nameText !== '' && this.state.emailText !== '' && this.state.passwordText !== '') {

            var validationcode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (validationcode.test(this.state.emailText)) {
                this.props.signup(this.state.nameText, this.state.emailText, this.state.passwordText, this.props.goToMain);
                this.props.dataLoading(true);
            }
            else {
                Alert.alert(
                    'Error',
                    'Email is badly formatted'
                )
            }
        }
    }

    render() {
        return (
            <Content padder>
                <Form>
                    <Item floatingLabel>
                        <Label>Dr.Name</Label>
                        <Input onChangeText={(nameText) => { this.setState({ nameText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                    </Item>
                </Form>

                <Button onPress={this.signup} style={style.loginBtn} isLoading={this.props.isDataLoading}><Text>SignUp</Text></Button>

            </Content>
        )
    }
}

const style = {
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
}



