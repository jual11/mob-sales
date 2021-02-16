const INITAL_SATE = {
    isSignedIn: null,
    userId: null
}

export default ( state = INITAL_SATE, action ) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn: true, userId: action.payload};
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null};
        default:
            return state;
    }
};