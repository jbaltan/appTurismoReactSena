import React, { Component } from 'reactn';
import { View, Text, TextInput, Button, ToastAndroid } from 'react-native';
import { NavigationActions } from 'react-navigation';


export default class Login extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      user: '',
      pass: ''
    }

    this.onValidate = this.onValidate.bind(this);
    this.navigateToScreen = this.navigateToScreen.bind(this);

  }

  navigateToScreen(route){

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }

  onValidate() {

    //consumir servicio
    fetch('http://especializacionsena.appspot.com/usuarios?username='+this.state.user+'&password='+this.state.pass, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    })
      .then((response) => {
        if(response.status == 'ok'){
          this.setGlobal({ logueado: true });
          this.navigateToScreen('sitios');
        }else{
          ToastAndroid.show('Usuario o contraseña invalidos', ToastAndroid.SHORT);
        }
      })
      .catch((err) => {
        this.setGlobal({ logueado: false });
        ToastAndroid.show('Error', '' + err);
      });
  }

  render() {

    return (
      <View style={{ padding: 50 }}>
        <Text>Inicio de Sesión</Text>

        <TextInput placeholder='Usuario' value={this.state.name} onChangeText={(e) => this.setState({ user: e })}></TextInput>
        <TextInput placeholder='Clave' value={this.state.name} onChangeText={(e) => this.setState({ pass: e })}></TextInput>

        <Button title="Seguir" onPress={this.onValidate}></Button>

      </View>
    );
  }

}