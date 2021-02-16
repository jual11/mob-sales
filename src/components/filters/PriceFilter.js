import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {priceFilter} from '../../actions/index'


const PriceFilter = (props) => {
    const [price, setPrice] = useState('1000')
    const [debouncedTerm, setDebouncedTerm] = useState('1000');

    //Time dalay for price filter
    useEffect(() => {
        const timerId = setTimeout(() =>{
            setDebouncedTerm(price);
        }, 1000)
        return () => {
            clearTimeout(timerId);
        }
    }, [price])

    //Calls price action if terms changes
    useEffect( () => {
        props.priceFilter(debouncedTerm)   
    },[debouncedTerm, props.brandFilter ])

    return(
        <div className='brand-container'>
            <h5>Price Range</h5>
            <div className='brand-container-wrap'>
                <div className="range-wrap">
                    <input min="0" max="1000" type="range" className="range" onChange={((event) => setPrice(event.target.value))} value={price} />
                    <output className="bubble">Price: {price}</output>
                </div>
            </div>
        </div>
    )  
}

const mapStateToProps = (state) => {
    return {  
        brandFilter: state.filter.brandFilter
    }
}


export default connect(mapStateToProps, {priceFilter}) (PriceFilter);