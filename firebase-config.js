// firebase-config.js - Conexão REAL (Versão Joaquim Elite)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ",
    authDomain: "masteroab-db5e1.firebaseapp.com",
    databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com",
    projectId: "masteroab-db5e1",
    storageBucket: "masteroab-db5e1.appspot.com",
    messagingSenderId: "591632731804",
    appId: "1:591632731804:web:0b7d3f848418041d841804" 
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exportações Modulares
export const db = getDatabase(app);
export const auth = getAuth(app);

console.log("🔥 Firebase: Conexão REAL estabelecida!");
