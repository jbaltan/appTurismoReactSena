import React, {Fragment} from 'react';
import {Text, TextInput, ToastAndroid, Image, ScrollView, StyleSheet, Button} from 'react-native';
import { NavigationActions } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';

const stylesImgLogo = StyleSheet.create({
    stretch: {
      width: '5%',
      height: '2%',
      borderRadius:30,
      padding : '20%'
    }
});

export default class CrearSitio extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            iconCamara : 'https://previews.123rf.com/images/alexwhite/alexwhite1504/alexwhite150401564/38397120-cámara-icono-plana-roja.jpg',
            url: "http://especializacionsena.appspot.com/sitios",
            name:"",
            info:"",
            photo:"",
            rate:"",
            coords: JSON.stringify({latitude:3.42158, longitude:-76.5205})
        };

        this.updateName = this.updateName.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
        this.updateRate = this.updateRate.bind(this);
        this.updateLocation = this.updateLocation.bind(this);

        this.createSite = this.createSite.bind(this);
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params : {sitioSelected : {id: 2, name: "",
                info:"",
                photo:"",
                rate : 0},
                proceso : 0
            }
        });

        this.props.navigation.dispatch(navigateAction);

    }

    updateName(value){
        this.setState({name:value});
    }
    updateInfo(value){
        this.setState({info:value});
    }
    updatePhoto(value){
        this.setState({photo:value});
    }
    updateRate(value){
        this.setState({rate:value});
    }

    updateLocation(value){
        this.setState({coords: JSON.stringify({latitude: value.nativeEvent.coordinate.latitude, longitude : value.nativeEvent.coordinate.longitude})});
    }

    createSite(){

        let myinit = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        };
        fetch(this.state.url, myinit)
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{

              if (response.status) {

                ToastAndroid.show('Se ha creado el sitio', ToastAndroid.SHORT);

                  setTimeout(this.props.navigation.dispatch(NavigationActions.navigate({
                    routeName: 'sitios'
                  })), 2000);

              }else{
                ToastAndroid.show('No se pudo crear el sitio', ToastAndroid.SHORT);
              }

        }).catch((error)=>{
            ToastAndroid.show('No se pudo crear el sitio: '+error, ToastAndroid.SHORT);
        })
    }
    
    render(){
        return (
          <Fragment>
            <Text h1>Crear Sitio</Text>
            {/* <ScrollView> */}
            <Image style={stylesImgLogo.stretch} source={{uri: this.state.iconCamara}}/>

                <Text>Nombre</Text>
                <TextInput value={this.state.name} placeholder='Nombre Sitio' onChangeText={(e)=>this.updateName(e)}/>

                <Text>Descripción</Text>
                <TextInput value={this.state.info} placeholder='Descripción Sitio' onChangeText={(e)=>this.updateInfo(e)}/>

                <Text>Foto</Text>
                <TextInput value={this.state.photo} placeholder='Foto' onChangeText={(e)=>this.updatePhoto(e)}/>

                <Text>Estrellas</Text>
                <TextInput value={this.state.rate} onChangeText={(e)=>this.updateRate(e)}/>
                {/* <Image style={stylesImgLogo.stretch} source={{uri: this.state.iconCamara}}/> */}

                <MapView style={{flex : 1, position: 'absolute', top: 350, left: 0, right: 0, bottom: 0}}>
                    <Marker onDragEnd={(e)=>{this.updateLocation(e)}} draggable coordinate={{latitude : 3.454114, longitude: -76.498091}} title='Sitio'/>
                </MapView>

            {/* </ScrollView> */}
            <Button title="Crear Sitio" onPress={this.createSite}/>
        </Fragment>
        );
    }
}