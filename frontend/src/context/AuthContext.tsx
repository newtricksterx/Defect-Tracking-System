'use client'

import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../lib/types"
import { usePostData } from "@/requests/PostRequest";
import { useRouter } from "next/navigation";
import { IAuthToken } from "../lib/types";
import { getCookie, createCookie, deleteCookie } from "@/cookies/cookies";
import { tokenName } from "@/lib/constants";


const AuthContext = createContext<any>(null!);

export const AuthProvider = ({ children } : any) => {

    const router = useRouter();

    let [authTokens, setAuthTokens] = useState<IAuthToken | null>(null);
    let [user, setUser] = useState<User | null>(null);
    let [loading, setLoading] = useState(true);
    

    useEffect(() => {
        // Load tokens and user from cookies on mount
        const firstLoad = async () => {
            //const tokens = localStorage.getItem('authTokens');
            //console.log(await getCookie(tokenName));
            console.log("Getting Token...");
            const tokens = await getCookie(tokenName)
            if (tokens) {
                console.log("Found Token!")
                setAuthTokens(JSON.parse(tokens));
                setUser(jwtDecode(tokens));
            }
            setLoading(false); // Mark loading complete
        }

        firstLoad();
    }, []);

    const { postRequest } = usePostData();

    async function handleLogin (email: string, password: string) {
        const response = await postRequest('/api/token/', {
            email: email,
            password: password,
        })

        if(response?.status === 200){
            const data = response.data;
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            //localStorage.setItem('authTokens', JSON.stringify(data));
            createCookie(tokenName, JSON.stringify(data), true, "/")
            router.push('/');      
        }
        else {
            console.log("Error: Something went wrong");
        }
    }

    async function handleLogout(){
        Promise.resolve()
        .then(() => {
            setAuthTokens(null);
            setUser(null);
            //localStorage.removeItem('authTokens');
        })
        .then(async () => {
            await deleteCookie(tokenName)
            router.push('/login');
        });
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
