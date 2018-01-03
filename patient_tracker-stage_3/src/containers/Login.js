import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Body, Title, } from 'native-base';
import { Image } from 'react-native';
import Button from 'apsl-react-native-button';
import { NavigationActions } from 'react-navigation';
import { SLMiddleware } from '../middlewares'
import { LoginForm } from '../components'


function mapStateToProps(state) {
    return {
        isLoggedIn: state.CurrentStatus.isLoggedIn,
        isDataLoading: state.CurrentStatus.isDataLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password, goToMain) => { dispatch(SLMiddleware.Login(email, password, goToMain)) },
        dataLoading: (flag) => { dispatch(SLMiddleware.dataLoading(flag)) }
    }
}

class Login extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         emailText: '',
    //         passwordText: '',
    //     }
    // }

    componentWillMount() {
        this.props.dataLoading(false);
        if (this.props.isLoggedIn === true) {
            this.props.navigation.navigate('draweNav');
        }
    }

    // login = () => {

    //     if (this.state.emailText !== '' && this.state.passwordText !== '') {
    //         this.props.login(this.state.emailText, this.state.passwordText, this.props.navigation.navigate);
    //         this.props.dataLoading(true);
    //     }
    // }

    // goToSignup = () => {
    //     this.props.navigation.navigate('signup')
    // }

    render() {
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Body>
                        <Title>Patient Tracker</Title>
                    </Body>
                </Header>

                <LoginForm
                    goToSignup={this.props.navigation.navigate}
                    goToMain={this.props.navigation.navigate}
                    login={this.props.login}
                    dataLoading={this.props.dataLoading}
                    isDataLoading={this.props.isDataLoading}
                />

            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' }
}



