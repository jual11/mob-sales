export default (state=[], action) => {
    switch(action.type) {
        case "FETCH_BRANDS":
            return (action.payload);
    default:
        return state;
    }
}