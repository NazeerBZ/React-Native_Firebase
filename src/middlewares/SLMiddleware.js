import Actions from '../actions/actions';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

export class SLMiddleware {

    static Login(email, password, goToMain) {
        return (dispatch) => {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    var currentUserId = firebase.auth().currentUser.uid;
                    // console.log(currentUserId)
                    dispatch(Actions.currentUser(currentUserId));
                    dispatch(Actions.isLoggedIn(true));
                    dispatch(Actions.isDataLoading(false));
                    goToMain('draweNav');
                })
                .catch((error) => {
                    dispatch(Actions.isDataLoading(false));
                    Alert.alert(
                        'error',
                        error.message
                    )
                })
        }
    }

    static Signup(name, email, password, goToMain) {
        return (dispatch) => {

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    var currentUserId = firebase.auth().currentUser.uid;
                    firebase.database().ref('docters/').once('value', (snap) => {

                        if (snap.val()) {
                            var docters = snap.val();
                            docters.push({
                                id: currentUserId,
                                docterName: name,
                                docterEmail: email,
                                docterPassword: password
                            });

                            firebase.database().ref('docters/').set(docters)
                                .then(() => {
                                    dispatch(Actions.currentUser(currentUserId));
                                    dispatch(Actions.isLoggedIn(true));
                                    dispatch(Actions.isDataLoading(false));
                                    goToMain('draweNav');
                                })
                                .catch((error) => {
                                    dispatch(Actions.isDataLoading(false));
                                    Alert.alert(
                                        'error',
                                        error.message
                                    )
                                })
                        }
                        else {
                            firebase.database().ref('docters/').set([
                                {
                                    id: currentUserId,
                                    docterName: name,
                                    docterEmail: email,
                                    docterPassword: password
                                }
                            ])
                                .catch((error) => {
                                    Alert.alert(
                                        'error',
                                        error.message
                                    )
                                })
                        }
                    })
                })
                .catch((error) => {
                    Alert.alert(
                        'error',
                        error.message
                    )
                })
        }
    }

    static logout(flag) {
        return (dispatch) => {
            dispatch(Actions.isLoggedIn(false));
        }
    }

    static dataLoading(flag) {
        return (dispatch) => {
            dispatch(Actions.isDataLoading(flag))
        }
    }
}
