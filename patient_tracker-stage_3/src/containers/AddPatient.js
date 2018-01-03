import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { AsyncStorage, Image } from 'react-native';
import { PatientMiddleware, SLMiddleware } from '../middlewares'
import { PatientForm } from '../components';


function mapStateToProps(state) {
    return {
        currentUserId: state.CurrentStatus.currentUserId,
        isDataLoading: state.CurrentStatus.isDataLoading,
        isFormSubmited: state.CurrentStatus.isFormSubmited
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPatient: (name, diseases, medications, arrival, cost, currentUserId) => { dispatch(PatientMiddleware.addPatient(name, diseases, medications, arrival, cost, currentUserId)) },
        dataLoading: (flag) => { dispatch(SLMiddleware.dataLoading(flag)) }
    }
}

class AddPatient extends Component {

    render() {
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Body>
                        <Title>Add Patient</Title>
                    </Body>
                </Header>

                <PatientForm
                    currentUserId={this.props.currentUserId}
                    addPatient={this.props.addPatient}
                    dataLoading={this.props.dataLoading}
                    isDataLoading={this.props.isDataLoading}
                    isFormSubmited={this.props.isFormSubmited}
                />

            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    dataLableStyle: {
        marginLeft: '4%',
        marginTop: '8%'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
}




// var docter = [
//     {
//         id: '1',
//         name: 'nazeer',
//         email: 'nazeer@gmail.com',
//         password: '123456'
//     },
//     {
//         id: '2',
//         name: 'nazeer',
//         email: 'nazeer@gmail.com',
//         password: '123456'
//     }
// ]

// var Patients = [
//     {
//         docId: '1',
//         PatientName: 'khalid',
//         Disease: 'headache',
//         MedicationProvided: 'panadol',
//         DateOfArrival: '23/4/2017',
//         Cost: '102'
//     },
//     {
//         docId: '2',
//         PatientName: 'khalid',
//         Disease: 'headache',
//         MedicationProvided: 'panadol',
//         DateOfArrival: '23/4/2017',
//         Cost: '102'
//     }
// ]