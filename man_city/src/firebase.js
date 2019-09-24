import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

// existing user in firebase: solnce2@tut.by

const config = {
    apiKey: "AIzaSyB3lIxq6tr11DOLvSxyofLGOoe3oaAUE6o",
    authDomain: "man-city-533b5.firebaseapp.com",
    databaseURL: "https://man-city-533b5.firebaseio.com",
    projectId: "man-city-533b5",
    storageBucket: "man-city-533b5.appspot.com",
    messagingSenderId: "391467440613"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');// access to database store object 'matches'
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
}