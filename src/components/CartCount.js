import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchItemsInCart } from '../actions'

const CartCount = (props) => {
    useEffect(() => {
        props.fetchItemsInCart()
    },[props.cart.length])

    const orderCount = () => {
        if(props.cart.length === 0) return
        if(props.cart.length) {
            const currentUserCartItems = props.cart.filter(item => item.userId === props.userId) 
            if(currentUserCartItems.length) {
                const itemsInCart = currentUserCartItems.map(item => item.count).reduce((prev, next) => prev + next);
                return <p className='cartCounter'> {itemsInCart} </p>
            }
            return 0
        }     
    }

    return <div style={{display: 'inline'}}>
        {orderCount()}
        </div>
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart, 
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {fetchItemsInCart}) (CartCount);