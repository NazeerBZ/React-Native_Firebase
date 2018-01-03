const INITIAL_STATE = {
    currentUserId: '',
    isLoggedIn: false,
    isDataLoading: false,
    isEmpty: false,
    isFormSubmited: false
}

function CurrentStatus(state = INITIAL_STATE, action) {
    switch (action.type) {

        case 'CURRENT_USER_ID':
            return Object.assign({}, state, { currentUserId: action.uid })

        case 'IS_LOGGED_IN':
            return Object.assign({}, state, { isLoggedIn: action.flg })

        case 'IS_DATA_LOADING':
            return Object.assign({}, state, { isDataLoading: action.flg })

        case 'IS_EMPTY':
            return Object.assign({}, state, { isEmpty: action.flg })

        case 'IS_FORM_SUBMITED':
            return Object.assign({}, state, { isFormSubmited: action.flg })

        default:
            return state
    }
}

export default CurrentStatus;