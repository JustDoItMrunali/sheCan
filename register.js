import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.querySelector(".register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("input[placeholder='Full Name']").value;
  const email = document.querySelector("input[placeholder='Email Address']").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const referralCode = name.toLowerCase().replace(/\s+/g, '') + "2025";

    await setDoc(doc(db, "interns", user.uid), {
      name: name,
      email: email,
      referralCode: referralCode,
      donationsRaised: 0
    });

    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});
