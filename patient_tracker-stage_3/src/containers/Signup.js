import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Text, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, Alert } from 'react-native';
import Button from 'apsl-react-native-button';
import { SLMiddleware } from '../middlewares'
import { SignupForm } from '../components'
import { NavigationActions } from 'react-navigation';


function mapStateToProps(state) {
    return {
        isDataLoading: state.CurrentStatus.isDataLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (name, email, password, goToMain) => { dispatch(SLMiddleware.Signup(name, email, password, goToMain)) },
        dataLoading: (flag) => { dispatch(SLMiddleware.dataLoading(flag)) }
    }
}

class Signup extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         nameText: '',
    //         emailText: '',
    //         passwordText: ''
    //     }
    // }

    componentWillMount() {
        this.props.dataLoading(false);
    }

    // signup = () => {

    //     if (this.state.nameText !== '' && this.state.emailText !== '' && this.state.passwordText !== '') {

    //         var validationcode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //         if (validationcode.test(this.state.emailText)) {
    //             this.props.signup(this.state.nameText, this.state.emailText, this.state.passwordText, this.props.navigation.navigate);
    //             this.props.dataLoading(true);
    //         }
    //     }
    // }

    render() {

        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Left>
                        <Icon name='arrow-back' onPress={() => { this.props.navigation.navigate('login') }} />
                    </Left>
                    <Body>
                        <Title>Patient Tracker</Title>
                    </Body>
                    <Right />
                </Header>

                <SignupForm
                    goToMain={this.props.navigation.navigate}
                    signup={this.props.signup}
                    dataLoading={this.props.dataLoading}
                    isDataLoading={this.props.isDataLoading}
                />

            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
}
