import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Import modular SDK for named database support
import { initializeApp, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  serverTimestamp,
  arrayUnion,
  addDoc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import type {
  Firestore,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";

// Load Firebase configuration from Vite environment variables.
// IMPORTANT: Put these values in a local `.env.local` (see `.env.local.example`) and do NOT commit
// real secrets to the repository. Vite exposes variables prefixed with `VITE_` to the client.
const env = (import.meta as any).env as Record<string, any>;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: env.VITE_FIREBASE_APP_ID || "",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

// ✅ Initialize Firebase compat (for auth)
if (!firebase.apps.length) {
  // Initialize compat app (auth uses compat SDK in this project)
  firebase.initializeApp(firebaseConfig);
}

// ✅ Initialize modular Firebase app (for Firestore with named database)
// Reuse the default app so Auth and Firestore share the same app instance.
// Reuse the default app so Auth and Firestore share the same app instance.
const modularApp = getApp(); // returns the default app initialized above

// Allow selecting a named Firestore database via VITE_FIRESTORE_DATABASE when needed
// (some projects use multiple databases; if provided, pass it here; otherwise use default DB)
const databaseId = env.VITE_FIRESTORE_DATABASE as string | undefined;
const modularDb: Firestore = databaseId
  ? getFirestore(modularApp, databaseId)
  : getFirestore(modularApp);

// ✅ Export the auth instance
export const auth = firebase.auth();

// ✅ Use modular SDK for Firestore to support named database "legaliq"
//const modularDb: Firestore = getFirestore(modularApp, "legaliq");

// ✅ Create a compat-style wrapper for backward compatibility
export const db = {
  collection: (path: string) => {
    const col: CollectionReference = collection(modularDb, path);

    return {
      doc: (id?: string) => {
        if (id) {
          const docRef: DocumentReference = doc(modularDb, path, id);
          return {
            collection: (subPath: string) =>
              db.collection(`${path}/${id}/${subPath}`),

            update: async (data: any) => updateDoc(docRef, data),

            set: async (data: any, options?: any) =>
              setDoc(docRef, data, options),

            get: async () => getDoc(docRef),

            id: docRef.id,
          };
        }

        // For document references without ID (for add operations)
        return {
          add: async (data: any) => {
            const docRef = await addDoc(col, data);
            return {
              id: docRef.id,
              collection: (subPath: string) =>
                db.collection(`${path}/${docRef.id}/${subPath}`),
            };
          },
          collection: (subPath: string) => db.collection(`${path}/${subPath}`),
        };
      },

      add: async (data: any) => {
        const docRef = await addDoc(col, data);
        return {
          id: docRef.id,
          collection: (subPath: string) =>
            db.collection(`${path}/${docRef.id}/${subPath}`),
        };
      },
    };
  },

  // ✅ Expose FieldValue for compatibility
  FieldValue: {
    serverTimestamp: () => serverTimestamp(),
    arrayUnion: (...elements: any[]) => arrayUnion(...elements),
  },
} as any;

// ✅ Also add FieldValue to firebase.firestore for backward compatibility
(firebase.firestore as any).FieldValue = {
  serverTimestamp: () => serverTimestamp(),
  arrayUnion: (...elements: any[]) => arrayUnion(...elements),
};

export { firebase };
