import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import { DrawerNavigator } from 'react-navigation';
import AddPatient from '../containers/AddPatient';
import AllPatient from '../containers/AllPatient';
import Logout from '../components/Logout';


export default DrawerNav = DrawerNavigator({

    "Add Patient": {
        screen: AddPatient
    },

    "All Patient": {
        screen: AllPatient
    },

    "Logout": {
        screen: Logout
    }
})