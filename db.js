import firebase from 'firebase';

const config = {
  apiKey: '',
  authDomain: 'meowmaster-da607.firebaseapp.com',
  databaseURL: 'https://meowmaster-da607.firebaseio.com',
  projectId: 'meowmaster-da607',
  storageBucket: 'meowmaster-da607.appspot.com',
  messagingSenderId: '274824885515',
  appId: '1:274824885515:web:b9f6ebb4a7e20c729d5e0e',
  measurementId: 'G-RSD1RJ0FWM',
};

firebase.initializeApp(config);
export default firebase;
