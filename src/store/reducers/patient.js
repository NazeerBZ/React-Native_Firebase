const INITIAL_STATE = {
    patientList: []
}

function Patient(state = INITIAL_STATE, action) {
    switch (action.type) {

        case 'PATIENT_LIST':
            return Object.assign({}, state, { patientList: action.ls })

        default:
            return state
    }
}

export default Patient;