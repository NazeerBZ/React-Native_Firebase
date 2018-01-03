
class Actions {

    static currentUser(uid) {
        return {
            type: 'CURRENT_USER_ID',
            uid: uid
        }
    }

    static isLoggedIn(flag) {
        return {
            type: 'IS_LOGGED_IN',
            flg: flag
        }
    }

    static isDataLoading(flag) {
        return {
            type: 'IS_DATA_LOADING',
            flg: flag
        }
    }

    static patientList(list) {
        return {
            type: 'PATIENT_LIST',
            ls: list
        }
    }

    static isEmpty(flag) {
        return {
            type: 'IS_EMPTY',
            flg: flag
        }
    }

    static isFormSubmited(flag) {
        return {
            type: 'IS_FORM_SUBMITED',
            flg: flag
        }
    }
}

export default Actions