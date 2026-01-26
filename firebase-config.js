import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ",
    authDomain: "masteroab-db5e1.firebaseapp.com",
    projectId: "masteroab-db5e1",
    databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
