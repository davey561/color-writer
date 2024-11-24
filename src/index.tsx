import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles.css"

//firebase step
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkyCKWzhTKciFTTUDYjhfyHmxZOvM0rYc",
  authDomain: "color-writer.firebaseapp.com",
  projectId: "color-writer",
  storageBucket: "color-writer.firebasestorage.app",
  messagingSenderId: "1010570113547",
  appId: "1:1010570113547:web:8a9811904149c639e5cd0e",
  measurementId: "G-ZVVT1W46DN",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
