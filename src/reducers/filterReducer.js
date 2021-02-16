const initialState = {
    brandFilter: [],
    priceFilter: [],
    allPhones: [],
    filteredPhones: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'NO_FILTERS':
            if(state.allPhones.length === 0) {
                return {...state, 
                    allPhones: [...state.allPhones, ...action.payload],
                    filteredPhones: [...state.filteredPhones, ...action.payload]};
            }
            return state   
        case 'ADD_BRAND_FROM_FILTERS': 
            return {...state,
                    brandFilter: [...state.brandFilter, ...action.payload],
                    filteredPhones: action.payload};
        case 'REMOVE_BRAND_FROM_FILTER':
            const removeBrand = state.brandFilter.filter(item => item.brand !== action.payload);
            return {...state,
                    brandFilter: removeBrand,
                    filteredPhones: removeBrand};
        case 'PRICE_FILTER': 
            const priceFilterBrand = state.brandFilter.filter(item => item.price < action.payload)
            const priceFilterBrand2 = state.brandFilter.filter(element => priceFilterBrand.includes(element));
            const priceFilterAll = state.allPhones.filter(item => item.price < action.payload)     
            //Filters allPhones by price
            if(state.brandFilter.length === 0) {
                return {...state,
                    priceFilter: priceFilterAll,
                    filteredPhones: priceFilterAll};
            }
            //Filters brandFilter by price
            return {...state,
                    priceFilter: priceFilterBrand2,
                    filteredPhones: priceFilterBrand2}
        default:
            return state;
    }
}

