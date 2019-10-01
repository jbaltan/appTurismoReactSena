import firebase from 'firebase';
import Notificaciones from '../Notificaciones';
class Fire {

  constructor() {

    this.init();
    this.observeAuth();

    console.ignoredYellowBox = [
      'Setting a timer'
    ];

  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDyEnoLb3qXWqL_5NbEz9UIK1Pcxl6MHdc",
        authDomain: "chat-235c2.firebaseapp.com",
        databaseURL: "https://chat-235c2.firebaseio.com",
        projectId: "chat-235c2",
        storageBucket: "",
        messagingSenderId: "98052716206",
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } 
      catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    console.log(34);
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    Notificaciones.notificar(`Nuevo mensaje de ${message.user.name}`,message.text);
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
      console.log(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;