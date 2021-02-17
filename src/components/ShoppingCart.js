import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchItemsInCart, removeItemFromCart, increaceItemCount, decreaseItemCount} from '../actions'


const ShoppingCart = (props) => {
    const [change, setChange] = useState(true)

    useEffect(() => {
        props.fetchItemsInCart()
    }, [change])

    const increace = (phone) => {
        props.increaceItemCount(phone, props.cart)
        setChange(!change)
    }

    const decrease = (phone) => {
        props.decreaseItemCount(phone, props.cart)
        setChange(!change)
    }

    const renderCartItems = () => {
        if(!props.cart.length) return <p>...Loading</p>
        return props.cart.map(phone => {  
            if(phone.userId === props.userId) {
                const roundPrice = Math.round(phone.price)
                const itemPriceSum = roundPrice * phone.count
                return (
                    <div className='cartItem-container' key={phone.id}>
                        <img className='cartItem-imge' alt={phone.title} src={phone.images[0]} />
                        <h3 className='cartItem-title'>{phone.title}</h3>
                        <div className='cartItem-count-container'>
                            <button onClick={() => increace(phone)}  className='cartItem-btn'>+</button>
                            <p>{phone.count}</p>
                            <button onClick={() => decrease(phone)} className='cartItem-btn'>-</button>
                        </div>
                        <p className='cartItem-price'>{itemPriceSum}$</p>
                        <button onClick={() => props.removeItemFromCart(phone.id)} className='cartItem-btn'>X</button>
                    </div>
                )
            }
            return <div key={phone.id}></div> 
        })
    }

    //Calculates total amount
    const totalAmount = () => {
        if(!props.cart.length) return
        const currentUserCartItems = props.cart.filter(item => item.userId === props.userId)
        const findPrices = currentUserCartItems.map(obj => {
            return obj.count * obj.price
        })
        const calcTotal = findPrices.reduce((a, b) => a + b, 0)
        const roundPrice = Math.round(calcTotal)
        return roundPrice
    }

    const renderContent = () => {
        if(props.cart.length === 0) return <h5 className='noOrders'>You cart is empty</h5>
        if(props.cart.length) {
            const currentUserCartItems = props.cart.filter(item => item.userId === props.userId) 
            if(currentUserCartItems.length) {
                return(
                    <div className='shoppingCart-container'>Cart
                        {renderCartItems()}
                        <div className='total-container'>
                            <Link to={{pathname: `/cart/order`, state:{total: totalAmount()}}} className='placeOrder-button'>Place order</Link>
                            <h2>Total: {totalAmount()}$</h2>   
                        </div>
                    </div>
                )
            }
            return <h5 className='noOrders'>You cart is empty</h5>
        }
        return <h5 className='noOrders'>You cart is empty</h5>
    }

    return renderContent()  
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart, 
        userId: state.auth.userId,
        
    }
}

export default connect(mapStateToProps, {fetchItemsInCart, removeItemFromCart, increaceItemCount, decreaseItemCount}) (ShoppingCart);