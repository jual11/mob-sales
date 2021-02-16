import React from 'react';
import {Link} from 'react-router-dom';
import history from '../history'
import { connect } from 'react-redux'
import CartCount from './CartCount'
import GoogleAuth from './GoogleAuth';

const Header = (props) => {
    return (
        <div className='header-container'>
            <h1 onClick={() => history.push('/')} className='siteHeader'>Phone Store</h1>
            <div></div>
            {props.isSignedIn ? <Link className='cart-link' to="/myorders">My Orders</Link> : <div></div> }
            {props.isSignedIn ? <Link className='cart-link' to="/cart">Cart(<CartCount />) </Link> : <div></div> }
            <GoogleAuth  />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {}) (Header);