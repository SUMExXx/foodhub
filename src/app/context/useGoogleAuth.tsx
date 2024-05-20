'use client';
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User} from "firebase/auth";
import {auth} from "@/app/context/firebase";

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextValue{
    user: null | object;
    googleSignIn: any;
    logOut: any;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useGoogleAuth = () => {

     const [user, setUser] = useState<User | null>(null)

      const googleSignIn = () =>{
          const provider = new GoogleAuthProvider()
          signInWithPopup(auth, provider)
      }

      const logOut = () =>{
          signOut(auth)
      }

      useEffect(() =>{
          const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
                setUser(currentUser)
          })
          return () => unsubscribe();
      }, [user])

      return {user, googleSignIn, logOut}

}
