import React, { Component } from 'reactn';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Rating, ListItem } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import  Notificaciones  from '../Notificaciones';

class DetalleSitio extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      rute: "http://especializacionsena.appspot.com/",
      sitioSelected: this.props.navigation.state.params.sitioSelected,
      comentarios: [],
      calificaciones: [],
      comentando: false,
      comentario: '',
      alias: ''
    };

    this.getComentarios = this.getComentarios.bind(this);
    this.saveComentario = this.saveComentario.bind(this);
<<<<<<< HEAD
    this.ratingCompleted= this.ratingCompleted.bind(this);
=======
    this.getRatingSite = this.getRatingSite.bind(this);
    this.promedioRating = this.promedioRating.bind(this);
    this.saveRating = this.saveRating.bind(this);
>>>>>>> 145b355559cd48ca38cfbd9f909afbca8c30d4f4

  }

  navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { sitioSelected: this.state.sitioSelected, proceso: 1 }
    });
    this.props.navigation.dispatch(navigateAction);

  }

  componentDidMount() {
    this.getComentarios();
    this.getRatingSite();
  }

  getComentarios() {

    fetch(this.state.rute + 'comentarios/' + this.state.sitioSelected.id, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({ comentarios: response.info });
      })
      .catch((err) => {
        ToastAndroid.show('Se presento un error para consultar los comentarios: ' + err, ToastAndroid.SHORT);
      });
  }

  saveComentario() {

    let myinit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_sitio: this.state.sitioSelected.id, comment: this.state.comentario, user: this.state.alias })
    };

    fetch(this.state.rute + '/comentarios/' + this.state.sitioSelected.id, myinit)
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        if (response.status) {
          console.log(response);
          Notificaciones.notificar("Nuevo Comentario", `El usuario ${this.state.alias} ha insertado un nuevo comentario`);
          this.getComentarios();
          this.state.alias = '';
          this.state.comentario = '';
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Se presento un error al guardar: ' + error, ToastAndroid.SHORT);
      });
  }
  getRatingSite(){
    fetch(this.state.rute + 'calificaciones/' + this.state.sitioSelected.id, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({ calificaciones: response.info });
        console.log(response.info);
      })
      .catch((err) => {
        ToastAndroid.show('Error', 'Se presento un error para consultar las calificaciones: ' + err);
      });
  }
  promedioRating(){
    if(this.state.calificaciones.length > 0){
      let promedio = 0;
      this.state.calificaciones.map(calificacion => {
        console.log('Promedio',calificacion.rate);
        promedio = promedio + calificacion.rate;
      })
      return promedio / this.state.calificaciones.length;
    }else{
      return 0
    }
  }
  saveRating(rate){
    let myinit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_sitio: this.state.sitioSelected.id, rate: rate, comment:'quitar' })
    };

    fetch(this.state.rute + '/calificaciones/' + this.state.sitioSelected.id, myinit)
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          console.log(response);
          // Notificaciones.notificar("Nuevo Comentario", `El usuario ${this.state.alias} ha insertado un nuevo comentario`);
          this.getRatingSite();
          ToastAndroid.show("Calificacion registrada correctamente",ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Se presento un error al guardar: ' + error, ToastAndroid.SHORT);
      });
  }

  ratingCompleted(rate){

    console.log(rate);

    let myinit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_sitio: this.state.sitioSelected.id, rate: rate })
    };

    fetch(this.state.rute + '/comentarios', myinit)
    .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({ comentarios: response.info });
      })
      .catch((err) => {
        ToastAndroid.show('Se presento un error al guardar la calificación: ' + err, ToastAndroid.SHORT);
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image style={styles.stretch} source={{ uri: this.state.sitioSelected.photo }} />
          <Text style={styles.textImage}>
            {
              this.state.sitioSelected.name.substring(0, 1).toLocaleUpperCase() +
              this.state.sitioSelected.name.substring(1)
            }
          </Text>
        </View>
        <View style={styles.containerContent}>
          <ScrollView>
            <Text style={{ fontSize: 20, padding:10 }}>
              Descripción Sitio: {this.state.sitioSelected.info}
            </Text>
            <View style={styles.containerContentChild}>
              <Text>Estrellas:</Text>
<<<<<<< HEAD
              <Rating onFinishRating={this.ratingCompleted} showRating type="star" fractions={1} startingValue={1} imageSize={40} style={{ paddingVertical: 10 }} />
=======
              <Rating showRating type="star" readonly="true" fractions={1} startingValue={this.promedioRating()} imageSize={40} style={{ paddingVertical: 10 }} />
              <Text> {this.state.calificaciones.length} Calificaciones</Text>
>>>>>>> 145b355559cd48ca38cfbd9f909afbca8c30d4f4
            </View>

            <View>
              <Text>Ubicación:</Text>
              <MapView style={{ height: 300, width: '100%' }} scrollEnabled={false} initialRegion={{ latitude: this.state.sitioSelected.coords.latitude, longitude: this.state.sitioSelected.coords.longitude, latitudeDelta: 0.3, longitudeDelta: 0.3 }}>
                <Marker coordinate={{ latitude: this.state.sitioSelected.coords.latitude, longitude: this.state.sitioSelected.coords.longitude }} title={this.state.sitioSelected.name} />
              </MapView>
            </View>

            <View style={styles.containerContentChild}>
              <Text style={{fontSize:14, fontWeight:"bold"}}>Nuevo Comentario</Text>
              <TextInput multiline={true} placeholder='Ingrese Alias' value={this.state.alias} onChangeText={(alias) => this.setState({ alias: alias })} />
              <TextInput multiline={true} numberOfLines={4} placeholder='Ingrese Comentario' value={this.state.comentario} onChangeText={(comentario) => this.setState({ comentario: comentario })} />
            </View>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
              <TouchableOpacity
                onPress={() => { this.saveComentario() }} 
                style={{ width: '50%', height: 45, flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'navy', borderRadius: 23, marginTop: 5, marginBottom:5 }} 
              >
                <Text style={{color:'white', fontSize:18, padding:14}}>Guardar comentario</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerContentChild}>
              <Text>Dejar mi calificacion:</Text>
              <Rating showRating  onFinishRating={(rate) => {this.saveRating(rate)}} type="star" fractions={1} startingValue={1} imageSize={40} style={{ paddingVertical: 10 }} />
            </View>

            <View style={styles.containerContentChild}>
              <Text>Comentarios: </Text>
              {
                this.state.comentarios.map(
                  (l) => (
                    <ListItem key={l} leftAvatar='https://img1.freepng.es/20181127/bav/kisspng-computer-icons-user-scalable-vector-graphics-login-set-menu-personal-settings-px-svg-png-icon-free-do-5bfdc61e983517.2168171815433579826235.jpg'
                      key={l.id} title={l.comment} subtitle={l.user} />
                  )
                )
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  stretch: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column'
  },
  containerImage: {
    flex: 1
  },
  containerContent: {
    flex: 2
  },
  containerContentChild: {
    padding: 10
  },
  textImage: { fontSize: 50, fontWeight: 'bold', position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, color: 'white', backgroundColor: 'black', opacity: 0.7 }
});
export default DetalleSitio;