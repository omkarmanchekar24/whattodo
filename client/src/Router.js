import React from 'react';
import {Scene, Router} from 'react-native-router-flux';

//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/Landing/Landing';
import Splash from './components/splash/Splash';
import AddTask from './components/Landing/AddTask';
import Otp from './components/auth/Otp';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar initial>
        <Scene key="splash" component={Splash} hideNavBar initial />
        <Scene key="auth">
          <Scene key="login" component={Login} hideNavBar initial />
          <Scene key="register" component={Register} hideNavBar />
          <Scene key="otp" component={Otp} hideNavBar />
        </Scene>
        <Scene key="welcome">
          <Scene key="landing" component={Landing} hideNavBar initial />
          <Scene key="addtask" component={AddTask} hideNavBar />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
