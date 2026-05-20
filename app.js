import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Reemplaza estos valores con los de tu proyecto Firebase.
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  appId: "TU_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const status = document.getElementById("status");

loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    status.innerHTML = `<p>Error al iniciar sesión: ${error.message}</p>`;
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    status.innerHTML = `<p>Error al cerrar sesión: ${error.message}</p>`;
  }
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
