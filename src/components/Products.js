import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPhones, addItemToCart, noFilters} from '../actions'
import history from '../history';



const Products = (props) => {
    useEffect( () => {
        props.fetchPhones();
        props.noFilters() 
    },[])

    //Adds item to cart
    const addToCart = (phone) => {
        if(!props.isSignedIn) {
            history.push('/signin')    
        }
        if(props.isSignedIn) {
            //const nr = '113522037285322671555-101'
            props.addItemToCart(phone, props.cart, props.userId)
        }  
    }

    //Singel phone look
    const content = (phone) => {
        const roundPrice = Math.round(phone.price) 
        return (
            <div className='product-container' key={phone.id}>
                <img className='products-img' src={phone.images[0]} alt={phone.title} />
                <h3 className='products-title'>{phone.title}</h3>
                <p className='products-brand'>{phone.brand}</p>
                <p className='products-price'>{`${roundPrice} USD`}</p>
                <div className='products-action-container'>
                    <Link to={`/phones/${phone.id}`} className='products-btn '>See Specs</Link>
                    <button onClick={() => addToCart(phone)} className='products-btn'>Add to cart</button>
                </div> 
            </div>
        )
    }

    //If there is data, renders phones
    const renderProducts = () => {
        if(props.allPhones.length === 0) {
            return <p>...Loading</p>
        }
        return props.filteredPhones.map((phone) => {
            return content(phone);
        })
    }

    return(
        <div className='products-container'>
            {renderProducts()}
        </div>
    )
}

const mapStateToProps = (state) => {
     //console.log(state.cart)
    return {
        brandFilter: state.filter.brandFilter,
        allPhones: state.filter.allPhones,
        filteredPhones: state.filter.filteredPhones,
        cart: state.cart,
        userId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchPhones, addItemToCart, noFilters}) (Products);







