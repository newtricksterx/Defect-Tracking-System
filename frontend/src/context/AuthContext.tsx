import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../lib/types"

type UserContextType = User | null;

const AuthContext = createContext<UserContextType>(null);

export const AuthProvider = () => {

}

export default AuthContext;