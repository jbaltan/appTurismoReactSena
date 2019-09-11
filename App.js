import React, { Component } from 'reactn';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default class App extends Component {

  constructor() {

    super();

    this.state = {
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={{flex : 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});