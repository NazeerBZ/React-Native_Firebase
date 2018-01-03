import React, { Component } from 'react';
import { persistStore } from 'redux-persist';
import Navigation from './Navigation';
import Store from '../store/Store';
import { AsyncStorage, View, ActivityIndicator, Image } from 'react-native';
import { Content, Button, Text, Root, Toast, Container } from 'native-base';

export default class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: true
        }
    }

    componentWillMount() {
        persistStore(Store, { storage: AsyncStorage }, () => {
            this.setState({
                visible: false
            })
        })
    }

    render() {
        if (this.state.visible === false) {
            return (
                <Container>
                    <Navigation />
                </Container>
            )
        }
        else {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                    animating={this.state.visible}
                />
            )
        }
    }
}

const style = {
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}