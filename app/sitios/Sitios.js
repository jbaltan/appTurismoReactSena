import React, { Component } from 'reactn';
import { View, Text, Alert, TouchableOpacity, ScrollView, ToastAndroid, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ListItem } from 'react-native-elements';


class Sitios extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      rute: "http://especializacionsena.appspot.com/",
      list: [],
      sitios: [],
      labels: []
    };

    this.ini = this.ini.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveSitioFavorito = this.saveSitioFavorito.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getValue = this.getValue.bind(this);

    this.ini();

  }

  async saveData(data, status) {

    try {
      if (status) {
        await AsyncStorage.setItem('sitios', JSON.stringify(data));
      } else {
        this.setState({ list: JSON.parse(await AsyncStorage.getItem('sitios')) });
      }
    } catch (error) {
      Alert.alert('Error', '' + error);
    }
  };

  navigateToScreen = (route, sitio) => () => {

    sitio.coords = JSON.parse(sitio.coords);

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { sitioSelected: JSON.parse(JSON.stringify(sitio)) }
    });
    this.props.navigation.dispatch(navigateAction);

  }

  async saveSitioFavorito(favorito) {

    try {

      let favoritos = await AsyncStorage.getItem('sitiosFavoritos');
      if (favoritos != null) {

        favoritos = JSON.parse(favoritos);
        let exist = false;
        let i = 0;

        for (const favoritoTmp of favoritos) {
          if(favoritoTmp.id == favorito.id){
            exist = true;
            break;
          }
          i++;
        }

        if (!exist) {
          favoritos.push(favorito);
          await AsyncStorage.setItem('sitiosFavoritos', JSON.stringify(favoritos));
          ToastAndroid.show('Sitio agregado exitosamente', ToastAndroid.SHORT);
        }else{
          favoritos.splice(i, 1);
          await AsyncStorage.setItem('sitiosFavoritos', JSON.stringify(favoritos));
          ToastAndroid.show('Sitio removido exitosamente', ToastAndroid.SHORT);
        }

      }else {
        await AsyncStorage.setItem('sitiosFavoritos', JSON.stringify([favorito]));
      }
      this.isFavorite();
<<<<<<< HEAD
=======
      ToastAndroid.show('Sitio agregado exitosamente', ToastAndroid.SHORT);
>>>>>>> 145b355559cd48ca38cfbd9f909afbca8c30d4f4
    } catch (error) {
      ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
    }

  }

  ini() {

    fetch(this.state.rute + '/sitios', {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {

        this.saveData(response.info, true);

        this.setState({
          sitios : response.info
        });

        this.isFavorite();

      })
      .catch((error) => {
        ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
        this.saveData(null, false);
      });
  }

  getPosition(contador){
    contador.i = contador.i+1;
    return contador.i;
  }

  getValue(valor){
    if (valor == null) {
      return 'Agregar a favoritos';
    }
    return valor;
  }

  async isFavorite(){

    let favoritos = JSON.parse(await AsyncStorage.getItem('sitiosFavoritos'));
<<<<<<< HEAD
    this.state.labels = [];

    if (null != favoritos) {
=======
    if (favoritos) {
>>>>>>> 145b355559cd48ca38cfbd9f909afbca8c30d4f4
      for (const favorito of favoritos) {
        for (const sitio of this.state.sitios) {
          if (sitio.id == favorito.id) {
            this.state.labels.push('Remover a Favoritos');
            break;
          }
        }
      }
    }

    this.setState({labels : this.state.labels});

    this.setState({
      list: this.state.sitios
    });

  }

  render() {

    let contador = {
      i : -1
    };

    return (
      <View style={{ padding: 5 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'navy' }}>
          Sitios Turisticos
        </Text>

        <ScrollView style={{ width: '100%', marginBottom: 80 }}>
          <View>
            {
              this.state.list.map(
                (l) => (

                  <ListItem
                    key={l}
                    leftAvatar={{ source: { uri: l.photo } }}
                    onPress={this.navigateToScreen('detalleSitio', l)}
                    key={l.id}
                    subtitle={
                      <View style={{ flex: 1, flexDirection: 'column', borderBottomWidth: .5, borderStyle: 'solid', borderBottomColor: 'gray', paddingBottom: 8 }}>
                        <Text>{l.info}</Text>
                        <TouchableOpacity
                          style={{ width: '50%', height: 45, flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'navy', borderRadius: 23, marginTop: 10 }}
                          onPress={() => { this.saveSitioFavorito(l) }}>
                          <Text style={{ color: 'white' }}>{this.getValue(this.state.labels[this.getPosition(contador)])}</Text>
                        </TouchableOpacity>
                      </View>}
                    title={<Text style={{ fontWeight: 'bold' }}>{l.name}</Text>}
                  />
                )
              )
            }
          </View>
        </ScrollView>

      </View>
    );
  }
}

export default Sitios;
