/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'reactn';
import {Platform, StyleSheet, Text, View,TextInput, Button, TouchableOpacity,Alert,Image} from 'react-native';

export default class Camara extends React.Component {

  constructor(props){
    super(props);
    this.state = {imagen:'https://facebook.github.io/react/logo-og.png'};
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Image style={{flex:1}}  source={{uri: 'data:image/gif;base64,'+this.state.imagen}} />

       <Button title="Capturar" onPress={this.takePicture}></Button>

      </View>
    );
  }




  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //alert(data.uri);
      //this.setState({imagen:data.uri});
    
      this.setState({imagen:data.base64});
      /*
      
      ImgToBase64.getBase64String(data.uri)
      .then(base64String => console.warn(base64String))
      .catch(err => alert(err));
      */
  
    }
  };

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

