import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon, Badge, Fab } from 'native-base'; import { View, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';

export class PatientForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            diseaseText: '',
            medicationText: '',
            arrivalText: '',
            costText: '',
            deseaseList: [],
            medicationList: []
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.isFormSubmited === true) {
            this.setState({
                nameText: '',
                diseaseText: '',
                medicationText: '',
                arrivalText: '',
                costText: '',
                deseaseList: [],
                medicationList: []
            })
        }
    }

    addPatient = () => {

        if (this.state.nameText !== '' && this.state.deseaseList.length !== 0 && this.state.medicationList !== 0 && this.state.arrivalText !== '' && this.state.costText !== '') {
            this.props.addPatient(this.state.nameText, this.state.deseaseList, this.state.medicationList, this.state.arrivalText, this.state.costText, this.props.currentUserId);
            this.props.dataLoading(true);
        }
    }

    makeDeseaseList = () => {

        if (this.state.diseaseText !== '') {
            this.state.deseaseList.push(this.state.diseaseText)
            this.setState({
                deseaseList: this.state.deseaseList,
                diseaseText: ''
            })
        }
    }

    showBadgesForDeseases = () => {
        if (this.state.deseaseList.length !== 0) {
            return this.state.deseaseList.map((desease, index) => {
                return (
                    <Badge style={style.badgeContent} key={index}>
                        <Text style={{ color: 'black' }}>{desease}</Text>
                        <Icon name="close-circle" onPress={this.removeItemFromDeseaseList.bind(this, index)} style={style.iconStyle}></Icon>
                    </Badge>
                )
            })
        }
    }

    removeItemFromDeseaseList(index) {
        this.state.deseaseList.splice(index, 1);
        this.setState({
            deseaseList: this.state.deseaseList
        })
    }

    makeMedicationList = () => {

        if (this.state.medicationText !== '') {
            this.state.medicationList.push(this.state.medicationText)
            this.setState({
                medicationList: this.state.medicationList,
                medicationText: ''
            })
        }
    }

    showBadgesForMedication = () => {
        if (this.state.medicationList.length !== 0) {
            return this.state.medicationList.map((medicine, index) => {
                return (
                    <Badge style={style.badgeContent} key={index}>
                        <Text style={{ color: 'black' }}>{medicine}</Text>
                        <Icon name="close-circle" onPress={this.removeItemFromMedicationList.bind(this, index)} style={style.iconStyle}></Icon>
                    </Badge>
                )
            })
        }
    }

    removeItemFromMedicationList(index) {
        this.state.medicationList.splice(index, 1);
        this.setState({
            medicationList: this.state.medicationList
        })
    }

    render() {
        if (this.props.isDataLoading === false) {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <Content padder>
                            <Form>
                                <Item style={style.itemsStyle}>
                                    <Input onChangeText={(nameText) => { this.setState({ nameText }) }} placeholder='Patient Name' value={this.state.nameText} />
                                </Item>
                                <Item style={style.itemsStyle}>
                                    <Input onChangeText={(diseaseText) => { this.setState({ diseaseText }) }} placeholder='Diseases' value={this.state.diseaseText} />
                                    <Icon active name='add-circle' onPress={this.makeDeseaseList} />
                                </Item>

                                <View style={style.badgeStyle}>{this.showBadgesForDeseases()}</View>

                                <Item style={style.itemsStyle}>
                                    <Input onChangeText={(medicationText) => { this.setState({ medicationText }) }} placeholder='Medication Provided' value={this.state.medicationText} />
                                    <Icon active name='add-circle' onPress={this.makeMedicationList} />
                                </Item>

                                <View style={style.badgeStyle}>{this.showBadgesForMedication()}</View>

                                <DatePicker
                                    style={style.dateStyle}
                                    mode="date"
                                    date={this.state.arrivalText}
                                    placeholder='Date of Arrival'
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2000"
                                    maxDate="01-01-2050"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(arrivalText) => { this.setState({ arrivalText }) }}
                                />

                                <Item style={style.itemsStyle}>
                                    <Input onChangeText={(costText) => { this.setState({ costText }) }} placeholder='Cost' value={this.state.costText} />
                                </Item>
                            </Form>
                        </Content>
                    </ScrollView>

                    <View>
                        <Fab
                            onPress={this.addPatient}>
                            <Icon name="add" />
                        </Fab>
                    </View>

                </View>
            )
        }
        else {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                    animating={true}
                />
            )
        }
    }
}

const style = {
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '25%'
    },
    formStyle: {
        width: '100%'
    },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    dateStyle: { width: '90%', marginTop: 40, marginLeft: 10 },
    itemsStyle: {
        marginTop: 20
    },
    badgeStyle: {
        paddingLeft: 12,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    badgeContent: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#cecece',
        marginTop: 4,
        marginLeft: 4
    },
    iconStyle: { color: '#848080', fontSize: 18, position: 'relative', top: 4 },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
}