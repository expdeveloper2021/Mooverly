import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDZgpaDbgW4CjGHmX6jrxae6vs-JMzat6A",
    authDomain: "mooverly.firebaseapp.com",
    databaseURL: "https://mooverly.firebaseio.com",
    projectId: "mooverly",
    storageBucket: "mooverly.appspot.com",
    messagingSenderId: "632434060747",
    appId: "1:632434060747:web:6317ff5665fa2cce"
};
firebase.initializeApp(config);

export default firebase;