import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAjNCdGV6FmR7nxr2Tlq2VFotB3bR6WRlA",
    authDomain: "ditable-faf95.firebaseapp.com",
    databaseURL: "https://ditable-faf95-default-rtdb.firebaseio.com/",
    projectId: "ditable-faf95",
    storageBucket: "ditable-faf95.appspot.com",
    messagingSenderId: "664300441152",
    appId: "1:664300441152:web:aa86ceb95b0e0da64359a5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);