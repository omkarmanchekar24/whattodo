import React from 'react';
import {Scene, Router} from 'react-native-router-flux';

//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/Landing/Landing';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar initial>
        <Scene key="auth">
          <Scene key="login" component={Login} hideNavBar initial />
          <Scene key="register" component={Register} hideNavBar />
        </Scene>
        <Scene key="welcome">
          <Scene key="landing" component={Landing} hideNavBar initial />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
