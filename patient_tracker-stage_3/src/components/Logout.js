import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { SLMiddleware } from '../middlewares'


function mapDispatchToProps(dispatch) {
    return {
        logout: (flag) => { dispatch(SLMiddleware.logout(flag)) }
    }
}


class Logout extends Component {

    componentWillMount() {

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'login'
            })]
        });

        this.props.navigation.dispatch(resetAction);
        this.props.logout(false);
    }

    render() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout);
