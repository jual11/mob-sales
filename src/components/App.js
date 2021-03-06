import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import Header from './Header';
import ShoppingCart from './ShoppingCart';
import MainPage from './MainPage';
import SingleProduct from './SingleProduct';
import PlaceOrder from './PlaceOrder'
import history from '../history'
import Orders from './Orders'
import SignIn from './SignIn'
import Footer from './Footer'

class App extends React.Component {
  render() {
    return (
            <Router history={history}>
                <div className='body'>
                    <Header/>
                    <Switch>
                        <Route exact path={'/'} component={MainPage} />
                        <Route exact path={'/cart'} component={ShoppingCart}/>
                        <Route exact path={'/phones/:id'} component={SingleProduct}/>
                        <Route exact path={'/cart/order'} component={PlaceOrder}/>
                        <Route exact path={'/myorders'} component={Orders}/>
                        <Route exact path={'/signin'} component={SignIn}/>
                    </Switch>
                </div>
                <Footer />
            </Router>
    );
  }
}

export default App;
