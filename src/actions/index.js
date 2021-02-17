import phones from '../apis/phones';

//Fetch Phones
export const fetchPhones = () =>  async dispatch => {
    const responce = await phones.get('/mob')

    dispatch({ type: 'FETCH_PHONES', payload: responce.data})
};

export const fetchPhone = (id) =>  async dispatch => {
    const responce = await phones.get(`mob/${id}`)

    dispatch({ type: 'FETCH_PHONE', payload: responce.data})
};

//Fetch brands on Brand Filters
export const fetchBrands = () =>  async dispatch => {
    const responce = await phones.get('/brands')

    dispatch({ type: 'FETCH_BRANDS', payload: responce.data})
};

//Phone filters
export const noFilters = () =>  async dispatch => {
    const responce = await phones.get('/mob')
    dispatch({ type: 'NO_FILTERS', payload: responce.data })
};

export const filterBrandsAdd = (items) =>  async dispatch => {
    dispatch({ type: 'ADD_BRAND_FROM_FILTERS', payload: items })
};

export const filterBrandsRemove = (items) =>  async dispatch => {
    dispatch({ type: 'REMOVE_BRAND_FROM_FILTER', payload: items })
};

export const priceFilter = (items) =>  async dispatch => {
    dispatch({ type: 'PRICE_FILTER', payload: items })
};

//Cart
export const addItemToCart = (phone, cart, userId) =>  async dispatch => {
    //Checks does selected phone is in the cart, if yes adds +1 to count
    const phoneId = userId.concat(phone.id)
    const isInCart = cart.some(item => item.id === phoneId)   
    if(isInCart) {
        //Takes count number from cart
        const filterCart = cart.filter(item => item.id === phoneId)
        let newCount = filterCart[0].count
        newCount++
        
        const responce = await phones.patch(`/cart/${phoneId}`, {count: newCount})
        dispatch({ type: 'ADD_ITEM_TO_CART', payload: responce.data })
    }
    // If not then adds on with count 1
    if(!isInCart) {
        const responce = await phones.post(`/cart`, {...phone, count:1, userId, id: phoneId})

        dispatch({ type: 'ADD_ITEM_TO_CART', payload: responce.data })
    }
};

export const increaceItemCount = (phone, cart) =>  async dispatch => {
    //Takes count number from cart and adds +1
    const filterCart = cart.filter(item => item.id === phone.id)
    let newCount = filterCart[0].count
    newCount++

    const responce = await phones.patch(`/cart/${phone.id}`, {count: newCount})
    dispatch({ type: 'INCREASE_ITEM_IN_CART', payload: responce.data })   
};

export const decreaseItemCount = (phone, cart) =>  async dispatch => {
    //Takes count number from cart and decrease -1
    const filterCart = cart.filter(item => item.id === phone.id)
    let newCount = filterCart[0].count
    if(newCount > 1) {
        newCount--

        const responce = await phones.patch(`/cart/${phone.id}`, {count: newCount})
        dispatch({ type: 'DECREASE_ITEM_IN_CART', payload: responce.data })   
    }
    if(newCount === 1) {
        const responce = await phones.patch(`/cart/${phone.id}`, {count: 1})
        dispatch({ type: 'DECREASE_ITEM_IN_CART', payload: responce.data })   
    }   
};

export const fetchItemsInCart = () =>  async dispatch => {
    const responce = await phones.get('/cart')

    dispatch({ type: 'FETCH_ITEM_IN_CART', payload: responce.data })
};

export const removeItemFromCart = (id) =>  async dispatch => {
    const responce = await phones.delete(`cart/${id}`)
    //console.log(responce)

    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: responce.data })
};

//Google Auth
export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

//Orders
export const confirmOrder = (items, userId, total) =>  async dispatch => {
    const date = new Date().toISOString().slice(0, 10)
    const randomNum = Math.random()*1000000
    const orderId = randomNum.toFixed(0)
    const ee = 23
    // console.log(userId)
    const addItems = items.filter(item => item.userId === userId)
    // console.log(addItems)
    const responce = await phones.post('/orders', {...ee, addItems, total, date, userId, id: orderId})

    dispatch({ type: 'CONFIRM_ORDER', payload: responce.data })
};

export const fetchOrders = () =>  async dispatch => {
    const responce = await phones.get('/orders')
    //console.log(responce.data, 'orders from api')
    dispatch({ type: 'FETCH_ORDERS', payload: responce.data })
};

