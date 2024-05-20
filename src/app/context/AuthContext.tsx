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

export const AuthContext = createContext<AuthContextValue >({user: null, googleSignIn: ()=>{}, logOut: ()=>{}});

export const AuthContextProvider = ({children}: AuthContextProps) => {

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

      return(
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>
            {
                children
            }
        </AuthContext.Provider>
    )

}
