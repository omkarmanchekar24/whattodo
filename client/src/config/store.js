import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
//import storage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-community/async-storage';
//import {AsyncStorage} from 'react-native';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import {createLogger} from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
//applyMiddleware(ReduxThunk)

const middlewares = [ReduxThunk, createLogger()];

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
