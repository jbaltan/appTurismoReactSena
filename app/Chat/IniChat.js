import React, { Component } from 'reactn';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import Fire from './Fire';
import { Text, TextInput, ToastAndroid, Image, TouchableOpacity, StyleSheet, Button, View, ScrollView } from 'react-native';

export default class IniChat extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          messages : [],
          isIni : this.props.navigation.state.params.isIni,
          alias : ''
        }

        this.ini= this.ini.bind(this);

    }

    get user() {
      return {
        //name: this.props.navigation.state.params.name,
        name: this.state.alias,
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

    ini(){
      this.setState({isIni :false});
    }
  
    render() {
      if(this.state.isIni){
        return (
          <View>
            <TextInput multiline={true} placeholder='Ingrese Alias' value={this.state.alias}
              onChangeText={(alias) => this.setState({ alias: alias })}/>
            
            <Button disabled={ this.state.saving } title='Iniciar' onPress={this.ini}/>

          </View>
        )
      }
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
          />
        );

    }

    // static navigationOptions = ({ navigation }) => ({
    //     title: 'Bienvenido al chat ' + (navigation.state.params || {}).name || '',
    //   });

    // state = {
    //     messages: [],
    //   };
    
      

}