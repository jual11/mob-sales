import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchPhone} from '../actions'
import Slideshow from './slider/Slideshow'
import history from '../history'


const SingleProduct = (props) => {
    useEffect(() => {
        props.fetchPhone(props.match.params.id)
    },[])


    //Adds item to cart
    const addToCart = (phone) => {
        if(!props.isSignedIn) {
            history.push('/signin')    
        }
        if(props.isSignedIn) {
            props.addItemToCart(phone, props.cart, props.userId)
        }  
    }
    
    
    if(!props.phone) {
        return <p>...Loading</p>
    }
    const { phone } = props
    const roundPrice = Math.round(props.phone.price) 
    return(
        <div className='singleProduct-container'>
            <Slideshow images={props.phone.images} />
            <table>
               <tbody>
                    <tr>
                    <td>Brand</td>
                    <td>{phone.brand}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{phone.title}</td>
                </tr>
                <tr>
                    <td>Cpu</td>
                    <td>{phone.cpu}</td>
                </tr>
                <tr>
                    <td>Camera</td>
                    <td>{phone.camera}</td>
                </tr>
                <tr>
                    <td>Battery</td>
                    <td>{phone.battery}</td>
                </tr>
                <tr>
                    <td>Display</td>
                    <td>{phone.display}</td>
                </tr>
                <tr>
                    <td>Memory</td>
                    <td>{phone.memory}</td>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>{phone.size}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{phone.weight}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{phone.description}</td>
                </tr>
               </tbody>
            </table>
            <div className='singleProduct-action-container'>
                <p className='products-price'>{`Price: ${roundPrice} USD`}</p>
                <button onClick={() => addToCart(phone)} className='products-btn'>Add to cart</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    //console.log(ownProps);
    return {
        phone: state.phones[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchPhone}) (SingleProduct);