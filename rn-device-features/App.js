import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Init success!');
  })
  .catch((err) => {
    console.log('Failed!');
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
