import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/products';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
