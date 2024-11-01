'use client'

import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../lib/types"
import { usePostData } from "@/CustomHooks/usePostData";
import { useRouter } from "next/navigation";
import { IAuthToken } from "../lib/types";
import { LogOut } from "lucide-react";


const AuthContext = createContext<any>(null!);

function minutesToMs(minutes: number){
    return 1000 * 60 * minutes;
}

export const AuthProvider = ({ children } : any) => {

    const router = useRouter();

    let [authTokens, setAuthTokens] = useState<IAuthToken | null>(null);
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load tokens and user from localStorage on mount
        const tokens = localStorage.getItem('authTokens');
        if (tokens) {
          setAuthTokens(JSON.parse(tokens));
          setUser(jwtDecode(tokens));
        }
        setLoading(false); // Mark loading complete
    }, []);
    
    useEffect(() => {
        if (loading){
            //updateToken()
            return;
        }; // Prevent setting intervals while loading
        
        const delay = minutesToMs(4);
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken(); // Call token update function
            }
        }, delay); // Four-minute interval

        return () => clearInterval(interval); // Clear interval on unmount
    }, [authTokens, loading]);

    const { makeRequest } = usePostData(authTokens ? authTokens.access : "");

    async function handleLogin (email: string, password: string) {
        const response = await makeRequest('api/token/', {
            email: email,
            password: password,
        })

        if(response.status === 200){
            const data = response.data;
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            router.push('/');      
        }
        else {
            console.log("Error: Something went wrong");
        }
    }

    function handleLogout(){
        Promise.resolve()
        .then(() => {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens');
        })
        .then(() => {
            router.push('/login');
        });
    }

    async function updateToken(){
        console.log('updated token!')

        const response = await makeRequest('api/token/refresh/', {
            refresh: authTokens?.refresh,
        }) 

        const data = await response.data;

        if (response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data));
        }else{
            handleLogout();
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
