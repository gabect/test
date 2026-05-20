import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcD4I5_PV_E4aLwUFtl9dWccmWddXJxf0",
  authDomain: "test-acb43.firebaseapp.com",
  projectId: "test-acb43",
  storageBucket: "test-acb43.firebasestorage.app",
  messagingSenderId: "490209743154",
  appId: "1:490209743154:web:8331c39b659fb9fe51c72b",
  measurementId: "G-TB23RP5MNW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const status = document.getElementById("status");

function showError(prefix, error) {
  status.innerHTML = `<p>${prefix}: ${error?.message ?? "Error desconocido"}</p>`;
}

loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    // Fallback útil para navegadores que bloquean popups.
    if (error?.code === "auth/popup-blocked" || error?.code === "auth/cancelled-popup-request") {
      await signInWithRedirect(auth, provider);
      return;
    }
    showError("Error al iniciar sesión", error);
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    showError("Error al cerrar sesión", error);
  }
});

getRedirectResult(auth).catch((error) => {
  showError("Error al completar el login con redirección", error);
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    status.innerHTML = "<p>No has iniciado sesión.</p>";
    loginBtn.hidden = false;
    logoutBtn.hidden = true;
    return;
  }

  status.innerHTML = `
    <p><strong>Sesión iniciada</strong></p>
    <p>Nombre: ${user.displayName ?? "(sin nombre)"}</p>
    <p>Email: ${user.email ?? "(sin email)"}</p>
    <img src="${user.photoURL ?? ""}" alt="Avatar" width="64" height="64" style="border-radius: 50%; object-fit: cover;" />
  `;
  loginBtn.hidden = true;
  logoutBtn.hidden = false;
});
