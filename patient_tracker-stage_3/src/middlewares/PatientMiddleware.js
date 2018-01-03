import Actions from '../actions/actions';
import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export class PatientMiddleware {

    static addPatient(name, diseases, medications, arrival, cost, currentUserId) {
        return (dispatch) => {

            var ref = firebase.database().ref('patients/').push({
                patientId: firebase.database().ref().push().key,
                docId: currentUserId,
                patientName: name,
                diseases: diseases,
                medications: medications,
                dateOfArrival: arrival,
                cost: cost
            })
                .then(() => {
                    dispatch(Actions.isDataLoading(false));
                    dispatch(Actions.isFormSubmited(true))
                    Alert.alert(
                        'Success',
                        'patients successfully added'
                    )
                })
                .catch((error) => {
                    dispatch(Actions.isDataLoading(false))
                    dispatch(Actions.isFormSubmited(false))
                    Alert.alert(
                        'Fail',
                        error.message
                    )
                });
        }
    }

    static allPatient(currentUserId) {
        return (dispatch) => {

            firebase.database().ref('patients/').on('value', (snap) => {
                var filteredPatients = [];
                var patients = snap.val();
                for (var x in patients) {
                    if (patients[x].docId === currentUserId) {
                        filteredPatients.push(patients[x]);
                    }
                }
                if (filteredPatients.length === 0) {
                    dispatch(Actions.isEmpty(true));
                    dispatch(Actions.patientList(filteredPatients));
                }
                else {
                    dispatch(Actions.isEmpty(false));
                    dispatch(Actions.patientList(filteredPatients));
                }
            })
        }
    }

    static deletePatient(patientId, goBack) {
        return (dispatch) => {

            firebase.database().ref('patients/').once('value', (snap) => {
                var patients = snap.val();
                for (var x in patients) {
                    if (patients[x].patientId === patientId) {
                        firebase.database().ref('patients/' + x).remove();
                    }
                }
            })
                .then(() => {
                    goBack.dispatch(NavigationActions.back());
                    Alert.alert(
                        'Success',
                        'patients successfully deleted'
                    )
                })
                .catch((error) => {
                    Alert.alert(
                        'Fail',
                        error.message
                    )
                })
        }
    }

    static updatePatient(name, diseases, medications, arrival, cost, patientId, goBack) {
        return (dispatch) => {

            firebase.database().ref('patients/').once('value', (snap) => {
                var patients = snap.val();
                for (var x in patients) {
                    if (patients[x].patientId === patientId) {
                        firebase.database().ref('patients/' + x).update({
                            patientName: name,
                            diseases: diseases,
                            medications: medications,
                            dateOfArrival: arrival,
                            cost: cost
                        })
                            .then(() => {
                                dispatch(Actions.isDataLoading(false));
                                dispatch(Actions.isFormSubmited(true))
                                goBack.dispatch(NavigationActions.back())
                                Alert.alert(
                                    'Success',
                                    'patients successfully Updated'
                                )
                            })
                            .catch((error) => {
                                dispatch(Actions.isDataLoading(false))
                                dispatch(Actions.isFormSubmited(false))
                                Alert.alert(
                                    'Fail',
                                    error.message
                                )
                            })
                    }
                }
            })

        }
    }
}