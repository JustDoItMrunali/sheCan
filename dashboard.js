import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

// Protect dashboard
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user.uid);
    const uid = user.uid;
    try {
      const docSnap = await getDoc(doc(db, "interns", uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("User data from Firestore:", data);

        document.getElementById("internName").textContent = data.name || "Not Available";
        document.getElementById("referralCode").textContent = data.referralCode || "No Code";
        document.getElementById("donationsRaised").textContent = data.donationsRaised ?? 0;
      } else {
        console.error("No document found for user");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.warn("User not logged in. Redirecting...");
    window.location.href = "login.html";
  }
});

// Logout button if present
document.querySelector(".logout-btn")?.addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("userUID");
    window.location.href = "login.html";
  });
});
