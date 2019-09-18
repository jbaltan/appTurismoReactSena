import React from 'react';
import { Text, TextInput, ToastAndroid, Image, TouchableOpacity, StyleSheet, Button, View, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';

export default class CrearSitio extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            iconCamara: 'https://previews.123rf.com/images/alexwhite/alexwhite1504/alexwhite150401564/38397120-cámara-icono-plana-roja.jpg',
            iconGallery: 'https://img.icons8.com/cotton/2x/gallery.png',
            url: "http://10.5.21.177:8080/sitios/upload",
            name: "",
            info: "",
            photo: null,
            rate: "",
            coords: JSON.stringify({ latitude: 3.42158, longitude: -76.5205 }),
            saving: false
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
            params: {
                sitioSelected: {
                    id: 2, name: "",
                    info: "",
                    photo: "",
                    rate: 0
                },
                proceso: 0
            }
        });

        this.props.navigation.dispatch(navigateAction);

    }

    updateName(value) {
        this.setState({ name: value });
    }
    updateInfo(value) {
        this.setState({ info: value });
    }
    updatePhoto(value) {
        this.setState({ photo: value });
    }
    updateRate(value) {
        this.setState({ rate: value });
    }

    updateLocation(value) {
        this.setState({ coords: JSON.stringify({ latitude: value.nativeEvent.coordinate.latitude, longitude: value.nativeEvent.coordinate.longitude }) });
    }
    createFormData(photo, body) {
        const data = new FormData();

        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });

        return data;
    };

    createSite() {
        if(!this.state.photo){
            alert("suba una foto");
            return;
        }
        this.setState({saving:true});
        fetch(this.state.url, {
            method: "POST",
            body: this.createFormData(this.state.photo, {
                name: this.state.name,
                info: this.state.info,
                rate: this.state.rate,
                coords: this.state.coords,
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({saving:false});
                if (response.status) {
                    ToastAndroid.show('Se ha creado el sitio', ToastAndroid.SHORT);
                    setTimeout(this.props.navigation.dispatch(NavigationActions.navigate({
                        routeName: 'sitios'
                    })), 2000);

                } else { 
                    alert(JSON.stringify(response));
                    console.log(response);
                    ToastAndroid.show('No se pudo crear el sitio', ToastAndroid.SHORT);
                }

            }).catch((error) => {
                this.setState({saving:false});
                alert(error);
                console.log(error);
                ToastAndroid.show('No se pudo crear el sitio: ' + error, ToastAndroid.SHORT);
            })
        // .then(response => {
        //   console.log("upload succes", response);
        //   alert("Upload success!");
        //   this.setState({ photo: null });
        // })
        // .catch(error => {
        //   console.log("upload error", error);
        //   alert("Upload failed!");
        // });

        // let myinit = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // };
        // fetch(this.state.url, myinit)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((response) => {

        //         if (response.status) {

        //             ToastAndroid.show('Se ha creado el sitio', ToastAndroid.SHORT);

        //             setTimeout(this.props.navigation.dispatch(NavigationActions.navigate({
        //                 routeName: 'sitios'
        //             })), 2000);

        //         } else {
        //             ToastAndroid.show('No se pudo crear el sitio', ToastAndroid.SHORT);
        //         }

        //     }).catch((error) => {
        //         ToastAndroid.show('No se pudo crear el sitio: ' + error, ToastAndroid.SHORT);
        //     })
    }
    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        });
    }
    handleTakePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        });
    }

    render() {
        const { photo } = this.state
        return (
            <ScrollView style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Crear Sitio</Text>
                {/* <ScrollView> */}
                {/*  */}

                <Text>Nombre</Text>
                <TextInput value={this.state.name} placeholder='Nombre Sitio' onChangeText={(e) => this.updateName(e)} />

                <Text>Descripción</Text>
                <TextInput value={this.state.info} placeholder='Descripción Sitio' onChangeText={(e) => this.updateInfo(e)} />

                <Text>Estrellas</Text>
                <TextInput value={this.state.rate} onChangeText={(e) => this.updateRate(e)} />
                <View style={styles.containerpic}>
                    <Text>Foto</Text>
                    <TouchableOpacity style={styles.stretch} onPress={this.handleChoosePhoto}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.iconGallery }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stretch} onPress={this.handleTakePhoto}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.iconCamara }} />
                    </TouchableOpacity>
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 150, height: 150 }}
                        />
                    )}
                </View>

                {/* <Image style={styles.stretch} source={{uri: this.state.iconCamara}}/> */}

                <MapView style={styles.myMap}>
                    <Marker onDragEnd={(e) => { this.updateLocation(e) }} draggable coordinate={{ latitude: 3.454114, longitude: -76.498091 }} title='Sitio' />
                </MapView>

                {/* </ScrollView> */}
                <Button disabled={ this.state.saving } title={this.state.saving ? 'Loading...' : 'Crear Sitio'} onPress={this.createSite} style={{marginBottom:30}}/>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: '5%',
        paddingRight: '5%',
        // marginBottom:100


    },
    stretch: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    myMap:{
        width:'100%',
        height:300,
        marginBottom:30
    },
    containerpic:{
        flex:1,
        flexDirection:'row'
    }
});