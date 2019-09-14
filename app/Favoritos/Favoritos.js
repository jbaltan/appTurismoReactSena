import React, { Component } from 'reactn';
import { Button, ToastAndroid, View, Text, Alert, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ListItem } from 'react-native-elements';


class Favoritos extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      rute: "http://especializacionsena.appspot.com/",
      list: []
    };

    this.ini = this.ini.bind(this);
    this.deleteFavorito = this.deleteFavorito.bind(this);
    this.ini();

  }

  navigateToScreen = (route, sitio) => () => {

    sitio.coords = JSON.parse(sitio.coords);

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { sitioSelected: JSON.parse(JSON.stringify(sitio)) }
    });
    this.props.navigation.dispatch(navigateAction);

  }

  async ini() {

    try {
      let favoritos = await AsyncStorage.getItem('sitiosFavoritos');
      favoritos = JSON.parse(favoritos);
      if (favoritos != null) {
        this.setState({ list: favoritos });
      }

    } catch (error) {
      ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
    }

  }

  async deleteFavorito(sitio) {

    try {

      let favoritos = await AsyncStorage.getItem('sitiosFavoritos');

      if (favoritos != null) {

        favoritos = JSON.parse(favoritos);

        for (let index = 0; index < favoritos.length; index++) {
          const favoritoTmp = favoritos[index];
          if (favoritoTmp.id = sitio.id) {
            favoritos.splice(index, 1);
            break;
          }
        }

        await AsyncStorage.setItem('sitiosFavoritos', JSON.stringify(favoritos));
        this.setState({ list: favoritos });
      }

    } catch (error) {
      ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
    }
  }

  render() {

    return (
      <View style={{ padding: 50 }}>
        <Text>
          Sitios Turisticos Favoritos
        </Text>

        <ScrollView>

          {
            this.state.list.map(
              (l) => (
                <ListItem key={l} leftAvatar={{ source: { uri: l.photo } }} onPress={this.navigateToScreen('detalleSitio', l)}
                  key={l.id} subtitle={<Button title='Remover Favorito' onPress={() => { this.deleteFavorito(l) }} />} title={l.name} />
              )
            )
          }
        </ScrollView>

      </View>
    );
  }
}

export default Favoritos;