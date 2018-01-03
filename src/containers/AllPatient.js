import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Tab, Tabs, Title, Icon, Input, Item, TabHeading } from 'native-base';
import { AsyncStorage, View, Alert, Image, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { PatientMiddleware } from '../middlewares'

function mapStateToProps(state) {
    return {
        currentUserId: state.CurrentStatus.currentUserId,
        patientList: state.Patient.patientList,
        isEmpty: state.CurrentStatus.isEmpty
    }
}

function mapDispatchToProps(dispatch) {
    return {
        allPatient: (currentUserId) => { dispatch(PatientMiddleware.allPatient(currentUserId)) },
        updatePatientList: (newPatientList) => { dispatch(PatientMiddleware.updatePatientList(newPatientList)) },
        deletePatient: (patientId) => { dispatch(PatientMiddleware.deletePatient(patientId)) }
    }
}

class AllPatient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            patientsList: this.props.patientList,
            filteredListByName: [],
            filteredListByDate: [],
            isSearchBarUpForName: false,
            isSearchBarUpForDate: false,
            dateText: ''
        }
    }

    componentWillMount() {
        this.props.allPatient(this.props.currentUserId);
    }

    deletePatientOfCurrentDr = (patientId) => {

        this.props.deletePatient(patientId);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            patientsList: nextProps.patientList
        })
    }

    allPatientsOfCurrentDr() {

        if (this.state.patientsList.length !== 0 && this.props.isEmpty === false) {
            return (
                <List>
                    {this.state.patientsList.map((patObj, index) => {
                        return (
                            <ListItem key={index} onPress={() => {
                                this.props.navigation.navigate('patient',
                                    {
                                        patientId: patObj.patientId,
                                        patientName: patObj.patientName,
                                        docId: patObj.docId,
                                        diseases: patObj.diseases,
                                        medications: patObj.medications,
                                        dateOfArrival: patObj.dateOfArrival,
                                        cost: patObj.cost
                                    })
                            }}>
                                <Body>
                                    <Text>{patObj.patientName}</Text>
                                    <Text note>{patObj.disease}</Text>
                                </Body>
                                <Right>
                                    <Text note>{patObj.dateOfArrival}</Text>
                                </Right>
                            </ListItem>
                        )
                    })}
                </List>
            )
        }
        else if (this.state.patientsList.length === 0 && this.props.isEmpty === true) {
            return (
                <Button block light>
                    <Text>No Patient Added</Text>
                </Button>
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

    searchByName = (text) => {

        var NeedToClear = true;

        this.setState({
            filteredListByName: [],
            isSearchBarUpForName: true
        },
            () => {

                if (text !== '') {
                    console.log(text.length)

                    for (var i = 0; i < this.state.patientsList.length; i++) {
                        slicedWord = this.state.patientsList[i].patientName.slice(0, text.length);
                        console.log(slicedWord, text)
                        if (slicedWord.toUpperCase() === text.toUpperCase()) {

                            this.state.filteredListByName.push(this.state.patientsList[i])
                            NeedToClear = false;
                            this.setState({
                                filteredListByName: this.state.filteredListByName
                            })
                            console.log('Add into list')
                        }
                    }

                    if (NeedToClear === true) {
                        this.setState({
                            filteredListByName: []
                        })
                        console.log('2nd clear')
                    }
                }
                else {
                    this.setState({
                        filteredListByName: this.state.patientsList
                    })
                }
            })
    }

    allPatientsFilteredByNameOfCurrentDr() {
        return (
            <List>
                {this.state.filteredListByName.map((patObj, index) => {
                    return (
                        <ListItem key={index} onPress={() => {
                            this.props.navigation.navigate('patient',
                                {
                                    patientId: patObj.patientId,
                                    patientName: patObj.patientName,
                                    docId: patObj.docId,
                                    diseases: patObj.diseases,
                                    medications: patObj.medications,
                                    dateOfArrival: patObj.dateOfArrival,
                                    cost: patObj.cost
                                })
                        }}>
                            <Body>
                                <Text>{patObj.patientName}</Text>
                                <Text note>{patObj.disease}</Text>
                            </Body>
                            <Right>
                                <Text note>{patObj.dateOfArrival}</Text>
                            </Right>
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    searchByDate = (dateText) => {

        this.setState({
            filteredListByDate: [],
            dateText: dateText,
            isSearchBarUpForDate: true
        })

        for (var i = 0; i < this.state.patientsList.length; i++) {
            if (this.state.patientsList[i].dateOfArrival === dateText) {
                this.state.filteredListByDate.push(this.state.patientsList[i]);
                this.setState({
                    filteredListByDate: this.state.filteredListByDate
                })
            }
        }
    }

    allPatientsFilteredByDateOfCurrentDr = () => {
        return (
            <List>
                {this.state.filteredListByDate.map((patObj, index) => {
                    return (
                        <ListItem key={index} onPress={() => {
                            this.props.navigation.navigate('patient',
                                {
                                    patientId: patObj.patientId,
                                    patientName: patObj.patientName,
                                    docId: patObj.docId,
                                    diseases: patObj.diseases,
                                    medications: patObj.medications,
                                    dateOfArrival: patObj.dateOfArrival,
                                    cost: patObj.cost
                                })
                        }}>
                            <Body>
                                <Text>{patObj.patientName}</Text>
                                <Text note>{patObj.disease}</Text>
                            </Body>
                            <Right>
                                <Text note>{patObj.dateOfArrival}</Text>
                            </Right>
                        </ListItem>
                    )
                })}
            </List>
        )
    }


    handleIsSearchBarUpForName = () => {
        this.setState({
            isSearchBarUpForName: false
        })
    }

    handleIsSearchBarUpForDate = () => {
        this.setState({
            isSearchBarUpForDate: false,
            dateText: ''
        })
    }

    handleTabsChange = () => {
        this.handleIsSearchBarUpForName();
        this.handleIsSearchBarUpForDate();
    }

    render() {

        return (
            <Content>
                <Tabs onChangeTab={this.handleTabsChange}>

                    <Tab heading={<TabHeading style={style.headerStyle}><Icon name="person" style={{ color: 'white' }}></Icon><Text style={{ color: 'white' }}>Name</Text></TabHeading>} activeTabStyle={style.headerStyle}>

                        <Header searchBar rounded style={style.headerStyle}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="search by name" onChangeText={(text) => { this.searchByName(text) }} />
                                <Icon name="ios-people" />
                            </Item>
                        </Header>

                        {
                            this.state.isSearchBarUpForName === true ?
                                this.allPatientsFilteredByNameOfCurrentDr()
                                :
                                this.allPatientsOfCurrentDr()
                        }

                        {
                            this.state.filteredListByName.length === 0 && this.state.isSearchBarUpForName === true ?
                                <View style={style.messageViewStyle}>
                                    <Text>No Result</Text>
                                </View>
                                :
                                null
                        }
                    </Tab>

                    <Tab heading={<TabHeading style={style.headerStyle}><Icon name="grid" style={{ color: 'white' }}></Icon><Text style={{ color: 'white' }}>Date</Text></TabHeading>} activeTabStyle={style.headerStyle}>

                        <Header searchBar rounded style={style.headerStyle}>
                            <Item>

                                <DatePicker
                                    style={style.dateStyle}
                                    mode="date"
                                    date={this.state.dateText}
                                    placeholder='search by date'
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
                                    onDateChange={(dateText) => { this.searchByDate(dateText) }}
                                />
                                <Icon name="close" onPress={this.handleIsSearchBarUpForDate} />
                            </Item>
                        </Header>

                        {
                            this.state.isSearchBarUpForDate === true ?
                                this.allPatientsFilteredByDateOfCurrentDr()
                                :
                                this.allPatientsOfCurrentDr()
                        }

                        {
                            this.state.filteredListByDate.length === 0 && this.state.isSearchBarUpForDate === true ?
                                <View style={style.messageViewStyle}>
                                    <Text>No Result</Text>
                                </View>
                                :
                                null
                        }

                    </Tab>
                </Tabs>
            </Content>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPatient);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,

    },
    messageViewStyle: {
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        elevation: 5,
        position: 'relative'
    },
    dateStyle: { width: '90%' },
}
