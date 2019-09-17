import React, { Component } from 'reactn';
import { View, Text, Image, StyleSheet, Button, TextInput, ToastAndroid, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Rating, ListItem } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

const stylesImgLogo = StyleSheet.create({
  stretch: {
    width: '100%',
    height: '20%',
    borderRadius:30,
    padding : '20%'
  }
});

class DetalleSitio extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      rute: "http://especializacionsena.appspot.com/",
      sitioSelected : this.props.navigation.state.params.sitioSelected,
      comentarios : [],
      comentando : false,
      comentario : '',
      alias : ''
    };

    this.getComentarios = this.getComentarios.bind(this);
    this.saveComentario = this.saveComentario.bind(this);

  }

  navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params : {sitioSelected : this.state.sitioSelected, proceso : 1}
    });
    this.props.navigation.dispatch(navigateAction);

  }

  componentDidMount(){
    this.getComentarios();
  }

  getComentarios() {

    fetch(this.state.rute+'comentarios/'+this.state.sitioSelected.id, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({comentarios : response.info});
      })
      .catch((err)=> {
        ToastAndroid.show('Error', 'Se presento un error para consultar los comentarios: ' + err);
      });
  }

  saveComentario(){

    let myinit = {
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({id_sitio : this.state.sitioSelected.id, comment : this.state.comentario, user : this.state.alias})
    };

    fetch(this.state.rute+'/comentarios/'+this.state.sitioSelected.id, myinit)
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        if (response.status) {
          ToastAndroid.show('Comentario guardardo exitosamente', ToastAndroid.SHORT);
          this.getComentarios();
          this.state.alias = '';
          this.state.comentario = '';
        }
      })
      .catch((error)=> {
        ToastAndroid.show('Se presento un error al guardar: ' + error, ToastAndroid.SHORT);
      });
  }

  render() {

    return (
      <View style={{ padding: 40 }}>
        <ScrollView>

          <Image style={stylesImgLogo.stretch} source={{uri: this.state.sitioSelected.photo}}/>

          <Text>
            Sitio: {this.state.sitioSelected.name}
          </Text>
          <Text>
            Descripción Sitio: {this.state.sitioSelected.info}
          </Text>
          <View style={{flex:1}}>
            <Text>Estrellas:</Text>
            <Rating showRating type="star" fractions={1} startingValue={1} imageSize={40} style={{ paddingVertical: 10 }} />
          </View>

          <View style={{flex:1}}>
            <Text>Ubicación:</Text>
            <MapView style={{height: 300, position:'relative', top: 0, left: 0, right: 0, bottom: 0}}>
              <Marker coordinate={{latitude : this.state.sitioSelected.coords.latitude, longitude: this.state.sitioSelected.coords.longitude}} title={this.state.sitioSelected.name}/>
            </MapView>
          </View>

          <View>
            <TextInput multiline={true} placeholder='Ingrese Alias' value={this.state.alias} onChangeText={(alias) => this.setState({ alias: alias })}/>            
            <TextInput multiline={true} numberOfLines={4} placeholder='Ingrese Comentario' value={this.state.comentario} onChangeText={(comentario) => this.setState({ comentario: comentario })}/>
          </View>
          {/* <View> */}
            <Button title="Guardar" onPress={()=>{this.saveComentario()}}/>            
          {/* </View> */}

          <View style={{flex:1}}>
          <ScrollView>
            <Text>Comentarios: </Text>
            {
              this.state.comentarios.map(
                (l) => (
                  <ListItem key={l} leftAvatar='https://img1.freepng.es/20181127/bav/kisspng-computer-icons-user-scalable-vector-graphics-login-set-menu-personal-settings-px-svg-png-icon-free-do-5bfdc61e983517.2168171815433579826235.jpg'
                    key={l.id} title={l.comment} subtitle={l.user} />
                )
              )
            }
          </ScrollView>
          </View>

        </ScrollView>
      </View>
    );
  }
}

export default DetalleSitio;