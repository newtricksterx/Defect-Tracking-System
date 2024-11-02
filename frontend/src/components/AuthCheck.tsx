"use client";

import React, { ReactNode, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";

function AuthCheck({ children }: { children: ReactNode }) {

  const { user } = useContext(AuthContext); // Assume `user` is null if not authenticated
  const router = useRouter();

  // If not authenticated, redirect to login page
  if (!user) {
    //redirect("login"); // Redirect to login if user is not authenticated
    router.push("/login")
    return null;
  }

  // Render children if user is authenticated
  return <>{children}</>;
}

export default AuthCheck;
