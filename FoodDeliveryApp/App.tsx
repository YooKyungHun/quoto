import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import store from './src/store';
import {Provider, useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import AppInner from './AppInner';

function App() {
  // provider 밖에서는 useSelector 를 사용할 수 없음. -> AppInner 사용
  // const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;