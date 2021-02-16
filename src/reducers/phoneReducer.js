export default (state={}, action) => {
    switch(action.type) {
        case "FETCH_PHONES":
            return (action.payload);
        case "FETCH_PHONE":
            return { ...state, [action.payload.id]: action.payload };
    default:
        return state;
    }
}