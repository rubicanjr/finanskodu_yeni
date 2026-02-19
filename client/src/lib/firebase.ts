/**
 * Firebase Modular SDK v11 — Singleton initialization
 * 
 * Import { auth, db } from "@/lib/firebase" across the codebase.
 * Never import firebase/* directly in component files — use this singleton.
 * Prevents double-initialization on HMR.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth }      from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey:            "AIzaSyCaTDH_fpFrV1r6CeIaMJuqZpHn16xiSxk",
  authDomain:        "finanskodu-kododasi.firebaseapp.com",
  projectId:         "finanskodu-kododasi",
  storageBucket:     "finanskodu-kododasi.firebasestorage.app",
  messagingSenderId: "652716411302",
  appId:             "1:652716411302:web:498529ca46207f5131a767",
  measurementId:     "G-5GMJE1TSV0",
};

// Singleton guard — safe for HMR & strict mode double-mount
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db   = getFirestore(app);

// Analytics is optional and fails gracefully in non-browser envs
isSupported().then((yes) => {
  if (yes) getAnalytics(app);
}).catch(() => {});
