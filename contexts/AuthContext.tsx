import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// FIX: Using Firebase v9 compat library to support v8 syntax.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { 
    auth,
} from '../services/firebaseConfig';
// FIX: The following imports are for Firebase v9+ (modular) and were causing errors.
/*
import { 
    onAuthStateChanged, 
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
*/

// FIX: User type is now referenced from the namespaced firebase object.
type User = firebase.User;

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  // FIX: Updated Promise return types to use v8 UserCredential.
  signUp: (email: string, password: string, displayName: string) => Promise<firebase.auth.UserCredential>;
  logIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email: string, password: string, displayName: string) => {
    // FIX: Switched to v8 syntax for creating user and updating profile.
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    if (userCredential.user) {
        await userCredential.user.updateProfile({ displayName });
    }
    // Manually update the user object to reflect the new display name immediately.
    // The onAuthStateChanged listener will also pick up this change.
    setCurrentUser(auth.currentUser);
    return userCredential;
  };

  const logIn = (email: string, password: string) => {
    // FIX: Switched to v8 syntax for signing in.
    return auth.signInWithEmailAndPassword(email, password);
  };
  
  const logOut = () => {
    // FIX: Switched to v8 syntax for signing out.
    return auth.signOut();
  };
  
  const signInWithGoogle = () => {
    // FIX: Switched to v8 syntax for Google sign-in.
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  };

  useEffect(() => {
    // FIX: Switched to v8 syntax for auth state listener.
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    loading,
    signUp,
    logIn,
    logOut,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};