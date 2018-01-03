import React, { Component } from 'react';
import { View, AsyncStorage, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon, Badge, Fab } from 'native-base';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { NavigationActions } from 'react-navigation';
import { PatientMiddleware, SLMiddleware } from '../middlewares'
import { PatientForm } from '../components';

function mapStateToProps(state) {
    return {
        isDataLoading: state.CurrentStatus.isDataLoading,
        isFormSubmited: state.CurrentStatus.isFormSubmited
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePatient: (name, diseases, medications, arrival, cost, patientId, goBack) => { dispatch(PatientMiddleware.updatePatient(name, diseases, medications, arrival, cost, patientId, goBack)) },
        dataLoading: (flag) => { dispatch(SLMiddleware.dataLoading(flag)) },
        deletePatient: (patientId, goBack) => { dispatch(PatientMiddleware.deletePatient(patientId, goBack)) }
    }
}

class Patient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            patientId: this.props.navigation.state.params.patientId,
            nameText: this.props.navigation.state.params.patientName,
            deseaseList: this.props.navigation.state.params.diseases,
            medicationList: this.props.navigation.state.params.medications,
            arrivalText: this.props.navigation.state.params.dateOfArrival,
            costText: this.props.navigation.state.params.cost,
            diseaseText: '',
            medicationText: '',
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

    updatePatient = () => {

        if (this.state.nameText !== '' && this.state.deseaseList.length !== 0 && this.state.medicationList !== 0 && this.state.arrivalText !== '' && this.state.costText !== '') {

            this.props.updatePatient(
                this.state.nameText,
                this.state.deseaseList,
                this.state.medicationList,
                this.state.arrivalText,
                this.state.costText,
                this.state.patientId,
                this.props.navigation
            );
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
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Left>
                        <Icon name='arrow-back' onPress={() => { this.props.navigation.dispatch(NavigationActions.back()) }} />
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.patientName}</Title>
                    </Body>
                    <Right>
                        <Icon name='md-trash' onPress={() => { this.props.deletePatient(this.props.navigation.state.params.patientId, this.props.navigation) }} />
                    </Right>
                </Header>
                {
                    this.props.isDataLoading === false ?
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
                                    onPress={this.updatePatient}>
                                    <Icon name="add" />
                                </Fab>
                            </View>

                        </View>
                        :
                        <ActivityIndicator
                            color="black"
                            size="large"
                            style={style.centering}
                            animating={true}
                        />
                }
            </Image >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);

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

