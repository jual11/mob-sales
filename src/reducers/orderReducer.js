export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_ORDERS":
            //console.log(action.payload, 'ala')
            return (action.payload);   
        case 'ADD_ORDER':
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}