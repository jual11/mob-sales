import { combineReducers } from 'redux';
import brandsReducer from './brandsReducer';
import phoneReducer from './phoneReducer';
import filterReducer from './filterReducer';
import cartReducer from './cartReducers';
import authReducer from './authReducer';
import orderReducer from './orderReducer'

export default combineReducers({
  phones: phoneReducer,
  brands: brandsReducer,
  filter: filterReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer
});