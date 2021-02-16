import React from 'react';
import GoogleAuth from './GoogleAuth';
import Modal from './Modal';
import { connect } from 'react-redux'
import history from '../history';

const SignIn = (props) => {
    const renderSignInBtn = () => {
            return (
                <div className="signIn-btn-container"><GoogleAuth /></div>
            )
    }

    if(props.isSignedIn) {
        history.push('/')
    }

    return(
        <Modal
            title='Sign In'
            content= 'To add Item to Your cart You have to sign in' 
            onDismiss={() => history.push('/')}
            signInBtn={renderSignInBtn()}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {}) (SignIn);