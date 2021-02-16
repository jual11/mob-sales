import React from 'react';
import ReactDOM from 'react-dom';


const Modal = ({title, content, onDismiss, signInBtn, isSignedIn, cart, total}) => {
  const innerModuleClass = `ui standard modal visible active ${!isSignedIn ? 'inner-modle' : ''}`
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visible active">

      <div onClick={e => e.stopPropagation()} className={innerModuleClass}>
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        {signInBtn}
        {cart}
        {total}
      </div>
      
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
