import {DrawerNavigator} from 'react-navigation';
import Sitios from './sitios/Sitios';
import Favoritos from './Favoritos/Favoritos';
import Eventos from './eventos/Eventos';
import DetalleSitio from './DetalleSitio/DetalleSitio';
import CrearSitio from './crearSitio/CrearSitio';
import Camara from './camara/Camara';
import SitiosCercanosView from './SitiosCercanosView';
import Mapa from './mapa/Mapa';
import SideMenu from './SideMenu/SideMenu';
import IniChat from './Chat/IniChat';
import Login from './Login';
import setGlobal from 'reactn';
import GlobalState from './global';

setGlobal(GlobalState);

export default DrawerNavigator({
  sitios: {
    screen: Sitios
  },
  eventos: {
    screen: Eventos
  },
  detalleSitio: {
    screen: DetalleSitio
  },crearSitio: {
    screen: CrearSitio
  },
  mapaSitio: {
    screen: Mapa
  },
  login : {
    screen : Login
  },sitiosCercanos : {
    screen : SitiosCercanosView
  },
  camara : {
    screen : Camara
  },
  favoritos : {
    screen : Favoritos
  },chat  : {
    screen : IniChat
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

