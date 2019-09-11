import React, {Component} from 'reactn';
import Router from './app/routes2';
import {AppRegistry} from 'react-native';

export default class CustomDrawer extends Component {
  render () {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('triquiOnline', () => CustomDrawer);