'use client';
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User} from "firebase/auth";
import {auth} from "@/app/context/firebase";
import { userRoutes } from "@/data/apiRoutes";
import { useStateContext } from "./stateContext";

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

     const {authentication, setAuthentication} = useStateContext()

      const googleSignIn = async () =>{
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider).then( async () => {

                setAuthentication(auth);
                const displayName = auth.currentUser?.displayName?.toString().substring(0, auth.currentUser?.displayName?.toString().indexOf(' '))
                const email = auth.currentUser?.email
                const firebaseID = auth.currentUser?.uid
                
                const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.googleLogin}`

                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uuid: firebaseID, name: displayName, email: email }),
                }).then((res) => console.log(res));
            })
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
