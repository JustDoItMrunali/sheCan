import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWLhdW25NX_yZ41lzrhIPZyUyElcY97u0",
  authDomain: "shecan-c44cc.firebaseapp.com",
  projectId: "shecan-c44cc",
  storageBucket: "shecan-c44cc.appspot.com",
  messagingSenderId: "752654748666",
  appId: "1:752654748666:web:a7e456c7e9edc1aa34b243"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("input[placeholder='Email Address']").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("userUID", userCredential.user.uid);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});
