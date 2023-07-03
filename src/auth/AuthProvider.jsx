import React, { useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => setCurrentUser(user));
    } catch (error) {
      // エラーハンドリング
      alert(error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => setCurrentUser(user));
    } catch (error) {
      // エラーハンドリング
      alert(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, setCurrentUser);
  }, []);

  const value = {
    signup,
    login,
    currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
