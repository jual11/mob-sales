import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { fetchOrders } from '../actions';

const Orders = (props) => {
    useEffect(() => props.fetchOrders(),[])

    const renderItems = (order) => {
        return order.addItems.map(item => {
            const roundPrice = Math.round(item.price)
            const itemPriceSum = roundPrice * item.count
            return(
                <div className='order-item-container' key={item.id}>
                    <h5 style={{margin: '0'}}>{item.title}</h5>
                    <p>{item.count}</p> 
                    <p>{itemPriceSum}</p>
                </div>
            )
        })
    }

    const renderContent = () => {
        if(!props.orders.length) return <p>...Loading</p>

        const filterUsers = props.orders.filter(order => order.userId === props.userId)
        if(!filterUsers.length) return <h5 className='noOrders'>Currently you dont have any active orders</h5>
        return filterUsers.map(order => {
            return (
                <div className='order-container' key={order.id}>
                    <div className='order'>
                        <div>
                            <h5>Order id</h5>
                            <p>{order.id}</p>
                        </div>
                        <div>
                            <h5>Date</h5>
                            <p>{order.date}</p>
                        </div>
                        <div>
                            <h5>Total</h5>
                            <p>{order.total}</p>
                        </div>
                    </div>
                    {renderItems(order)}
                </div>
            )               
        })
    }
    return <div className='orders-container'>{renderContent()}</div> 
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        orders: state.order
    }
}

export default connect(mapStateToProps, {fetchOrders}) (Orders);