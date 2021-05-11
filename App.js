import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignupLoginScreen from './screens/SignupLoginScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default class App extends React.Component {
  render() {
    return(
      <AppContainer />
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  Login: {
    screen: SignupLoginScreen,
  },
  Drawer: AppDrawerNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator);