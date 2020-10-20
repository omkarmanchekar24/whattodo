import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import Router from './src/Router';
import {Provider} from 'react-redux';
import persist from './src/config/store';

const persistStore = persist();

class App extends Component {
  render() {
    const store = persistStore.store; //createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
