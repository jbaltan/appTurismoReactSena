/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';

import { List, ListItem } from 'react-native-elements'

class Eventos extends Component {

  constructor() {

    super();  

    this.state = {
      rute : "http://192.168.1.5/appTurismo/",
      //rute : "http://10.5.20.183/appTurismo/",
      list : []
    };

    this.ini = this.ini.bind(this);
    this.ini();

  }

  ini(){
    fetch(this.state.rute+"sitios/obtenereventos", {
      method: 'POST',
      body: new URLSearchParams('')
    })
    .then(function(response) {
      return response.text();
    })
    .then((response)=> {
      response = JSON.parse(response);
      if(response.error){
        alert('Se presento un erro al consultar el listado de eventos');
      }else{
        this.setState({
          list : response.info
        });
      }
      
    })
    .catch(function(err) {
       alert(err);
    });
  }

  render () {

    return (
      <View style={{padding: 50}}>
        <Text>
          Eventos
        </Text>

        
          {
            this.state.list.map(
              (l) => (
                <ListItem roundAvatar avatar={{uri:l.avatar_url}} key={l.nombre} title={l.nombre}/>
              )
            )
          }

      </View>
    );
  }
}

export default Eventos;