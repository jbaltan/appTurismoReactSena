import PropTypes from 'prop-types';
import React, {Component} from 'reactn';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, AsyncStorage, Alert, ToastAndroid} from 'react-native';

class SideMenu extends Component {

  constructor(props){

    super(props);

    this.state = {
      isLogueado : false
    }

    this.isLogueado = this.isLogueado.bind(this);
    this.isLogueado();

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  closeSession = () => ()=> {
      Alert.alert(
        'Confirmación',
        'Desea cerrar la sesión',
        [
          {text: 'NO', onPress: () => console.log('No'), style: 'cancel'},
          {text: 'YES', onPress: () => {ToastAndroid.show('La sesión se cerro', ToastAndroid.SHORT); this.setGlobal({ logueado: false }); this.navigateToScreen('sitios');}},
        ]
      );
  }

  async isLogueado(){

    try {
      this.setState({isLogueado : await AsyncStorage.getItem('login', false)});
    } catch (error) {
      Alert.alert('Error', ''+error);
    }
  };

  render () {

    if(this.global.logueado){
      return (
        <View style={styles.container}>
          <ScrollView>
            <View>
              <Text style={styles.navSectionStyle}>Opciones</Text>
              <View style={styles.sectionHeadingStyle}>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('sitios')}>Sitios</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('crearSitio')}>Crear Sitio</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('eventos')}>Eventos</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('sitiosCercanos')}>Encontrar Sitios Cercanos</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('favoritos')}>Favoritos</Text>
                <Text style={styles.navItemStyle} onPress={this.closeSession()}>Cerrar sesion</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <Text>Cali-Colombia</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <ScrollView>
            <View>
              <Text style={styles.navSectionStyle}>Opciones</Text>
              <View style={styles.sectionHeadingStyle}>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('sitios')}>Sitios</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('eventos')}>Eventos</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('sitiosCercanos')}>Encontrar Sitios Cercanos</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('favoritos')}>Favoritos</Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('login')}>Login</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <Text>Cali-Colombia</Text>
          </View>
        </View>
      );
    }

    
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;