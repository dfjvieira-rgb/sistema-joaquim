// firebase-config.js - Conexão Centralizada (Versão Auditada)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Importante: Certifique-se de que os valores abaixo são os do seu Firebase Console
const firebaseConfig = {
    apiKey: "SUA_API_KEY", // <--- Verifique se trocou pelo seu
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID"
};

// Inicializa o Firebase uma única vez
const app = initializeApp(firebaseConfig);

// Exportações Modulares
export const db = getDatabase(app);
export const auth = getAuth(app);

console.log("🔥 Firebase: Conexão estabelecida e módulos exportados.");
