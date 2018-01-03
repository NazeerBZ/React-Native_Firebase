import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Title } from 'native-base';
import { Provider } from 'react-redux';
import Store from './store/Store';
import * as firebase from 'firebase';
import Routes from './routes/Routes';

var config = {
    apiKey: "AIzaSyBFNBs1UZTnMfPYG8RXXvrfKO2FFqZRX9Y",
    authDomain: "patient-tracker-stage1.firebaseapp.com",
    databaseURL: "https://patient-tracker-stage1.firebaseio.com",
    projectId: "patient-tracker-stage1",
    storageBucket: "patient-tracker-stage1.appspot.com",
    messagingSenderId: "7460421019"
};
firebase.initializeApp(config);

class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <Routes />
            </Provider>
        )
    }
}

export default App;