
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { throwStatement } from '@babel/types';


export default class Mapa extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      proceso: this.props.navigation.state.params.proceso,
      sitioSelected : this.props.navigation.state.params.sitioSelected
    };

    this.ini = this.ini.bind(this);
    this.obtenerPosicion = this.obtenerPosicion.bind(this);
    this.navigateToScreen = this.navigateToScreen.bind(this);
    this.ini();

  }

  ini(){

  }

  navigateToScreen(route, obj){

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params : {data : obj}
    });
    this.props.navigation.dispatch(navigateAction);

  }

  ini() {

  }

  obtenerPosicion(e){
    this.navigateToScreen('crearSitio', e.nativeEvent);
  }

  render() {

    if(this.state.proceso == 0){
      //seleccion de ubicacion
      return (
        <View style={styles.container}>
  
          <MapView style={{flex : 1, position: 'absolute', top: 350, left: 0, right: 0, bottom: 0}}>
            <Marker onDragEnd={(e)=>{this.obtenerPosicion(e)}} draggable coordinate={{latitude : 3.454114, longitude: -76.498091}} title={this.state.sitioSelected.name}/>
          </MapView>
        </View>
      );
    }else if(this.state.proceso == 1){
      //mostrando ubicacion sitio
      return (
        <View style={styles.container}>
  
          <MapView style={{flex : 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <Marker coordinate={{latitude :3.454114, longitude: -76.498091}} title={this.state.sitioSelected.name}/>
          </MapView>
        </View>
      );
    }

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