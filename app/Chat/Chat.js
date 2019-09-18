import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { Text, TextInput, ToastAndroid, Image, TouchableOpacity, StyleSheet, Button, View, ScrollView } from 'react-native';
import Fire from './Fire';

export class Chat extends Component {
  
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Bienvenido al chat ' + (navigation.state.params || {}).name || '',
      });

    state = {
        messages: [],
      };
    
      get user() {
        return {
          name: this.props.navigation.state.params.name,
          _id: Fire.shared.uid,
        };
      }
    
      componentDidMount() {
        Fire.shared.on(message =>
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
          }))
        );
        
      }
      
      UNSAFE_componentWillUnmount() {
        Fire.shared.off();
      }
    
      render() {
          return (
            <GiftedChat
              messages={this.state.messages}
              onSend={Fire.shared.send}
              user={this.user}
            />
          );
        
      }
    
      
    }