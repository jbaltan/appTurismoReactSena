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
      comentario : ''
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

    fetch(this.state.rute+'comentarios/'+this.sitioSelected.id, {
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

    fetch(this.state.rute+'/comentarios', {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({comentando : false});  
      })
      .catch((error)=> {
        ToastAndroid.show('Error', 'Se presento un error al guardar: ' + error);
      });
  }

  render() {

    return (
      <View style={{ padding: 50 }}>
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
            <TextInput multiline={true} numberOfLines={4} placeholder='Ingrese Comentario' value={this.state.comentario} onChangeText={(comentario) => this.setState({ comentario: comentario })}></TextInput>        
          </View>
          <View>
            <Button title="Guardar" onPress={()=>{this.saveComentario();}}/>            
          </View>

          <View style={{flex:1, height:400}}>
            <Text>Comentarios:</Text>
            {
              this.state.comentarios.map(
                (l) => (
                  <ListItem key={l} leftAvatar='data:image/png;base64,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'
                    key={l.id} title={l.comment} subtitle={l.user} />
                )
              )
            }
          </View>

        </ScrollView>
      </View>
    );
  }
}

export default DetalleSitio;
