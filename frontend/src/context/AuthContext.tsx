'use client'

import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../lib/types"
import { usePostData } from "@/CustomHooks/usePostData";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children } : any) => {

    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState<any>(null);
    let [isAuthenticated, setIsAuthenticated] = useState(false);

    const { makeRequest, success } = usePostData();

    async function handleLogin (email: string, password: string) {
        const response = await makeRequest('api/token/', {
            email: email,
            password: password,
        })

        const data = response.data;

        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));        
            console.log(response.data);
            console.log(jwtDecode(response.data.access));
        }
        else {
            console.log("Error: Something went wrong");
        }
    

      }

    let contextData = {
        isAuthenticated: isAuthenticated,
        user: user,
        handleLogin: handleLogin,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;