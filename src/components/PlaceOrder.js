import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import Modal from './Modal';
import history from '../history';
import { fetchItemsInCart, confirmOrder } from '../actions';

const PlaceOrder = (props) => {
    useEffect(() => props.fetchItemsInCart(),[])

    const renderCart = () => {
        if(!props.cart.length) return <p>...Loading</p>
        return props.cart.map(phone => {
            if(phone.userId === props.userId) {
                const roundPrice = Math.round(phone.price)
                const itemPriceSum = roundPrice * phone.count
                return (
                    <div className='placeOrder-cartItem-container' key={phone.id}>
                        <h3 style={{margin: '0'}}>{phone.title}</h3>
                        <p>{phone.count}</p> 
                        <p>{itemPriceSum}$</p>  
                    </div>
                )
            }
            return <div key={phone.id}></div>
        })
    }

    const renderConfirm = () => {
        props.confirmOrder(props.cart, props.userId, props.location.state.total )
        history.push('/myorders')  
    }

    const renderTotal = () => {
        return (
            <div className='content placeOrder-total'>
                <button onClick={renderConfirm} className='confirmOrder-button'>Confirm Order</button>
                <h2>Total: {props.location.state.total}$</h2> 
            </div>
        )
    }

    return(
            <Modal
                title="Confirm order"
                content="Please check Your order and confirm it" 
                cart={renderCart()}
                onDismiss={() => history.push('/cart')}
                isSignedIn={props.isSignedIn}
                total={renderTotal()}
            />
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart, 
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {fetchItemsInCart, confirmOrder}) (PlaceOrder);