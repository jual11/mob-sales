import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            return { ...state, [action.payload.id]: action.payload };
        case 'INCREASE_ITEM_IN_CART':
            return state.map(product => {
                if (product.id === action.payload.id) {
                    return { ...product, count: product.count};
                }
                return product;
            });
        case 'DECREASE_ITEM_IN_CART':
            return state.map(product => {
                if (product.id === action.payload.id) {
                    return { ...product, count: product.count};
                }
                return product;
            });
        case "FETCH_ITEM_IN_CART":
            return (action.payload);
            
        case "REMOVE_ITEM_FROM_CART":
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

