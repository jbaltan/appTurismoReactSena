import React, { Component } from 'reactn';
import { View, Text, Alert, ScrollView, ToastAndroid, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ListItem, Button } from 'react-native-elements';


class Sitios extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      rute: "http://especializacionsena.appspot.com/",
      list: []
    };

    this.ini = this.ini.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveSitioFavorito = this.saveSitioFavorito.bind(this);
    this.ini();

  }

  async saveData(data, status){

    try {
      if(status){
        await AsyncStorage.setItem('sitios', JSON.stringify(data));
      }else{
        this.setState({list : JSON.parse(await AsyncStorage.getItem('sitios'))});
      }
    } catch (error) {
      Alert.alert('Error', ''+error);
    }
  };

  navigateToScreen = (route, sitio) => () => {

    sitio.coords = JSON.parse(sitio.coords);

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params : {sitioSelected : JSON.parse(JSON.stringify(sitio))}
    });
    this.props.navigation.dispatch(navigateAction);

  }

  async saveSitioFavorito(favorito){

    try {

      let favoritos = await AsyncStorage.getItem('sitiosFavoritos');
      if(favoritos != null){
        favoritos = JSON.parse(favoritos);
        favoritos.push(favorito);
        await AsyncStorage.setItem('sitiosFavoritos', JSON.stringify(favoritos));

      }else{
        await AsyncStorage.setItem('sitiosFavoritos', JSON.stringify([favorito]));
      }
      ToastAndroid.show('Sitio agregado exitosamente', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
    }

  }

  ini() {

    fetch(this.state.rute+'/sitios', {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {

        this.saveData(response.info, true);

        this.setState({
          list: response.info
        });

      })
      .catch((error)=> {
        ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);        
        this.saveData(null, false);
      });
  }

  render() {

    return (
      <View style={{ padding: 50 }}>
        <Text>
          Sitios Turisticos
        </Text>

        <ScrollView>

        {
          this.state.list.map(
            (l) => (
              <ListItem key={l} leftAvatar={{ source: { uri: l.photo } }} onPress={this.navigateToScreen('detalleSitio', l)}
            key={l.id} subtitle={<Button title='Agregar Favoritos' onPress={()=>{this.saveSitioFavorito(l)}}/>} title={l.name}  />
            )
          )
        }
        </ScrollView>

      </View>
    );
  }
}

export default Sitios;