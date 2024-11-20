"use client";

import React, { ReactNode, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";

function AuthCheck({ children }: { children: ReactNode }) {

  const { user } = useContext(AuthContext); // Assume `user` is null if not authenticated
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
      if (!user) {
          router.push('/login');
      }
  }, [user, router]); // Only runs when `user` changes

  // Return null while redirecting to prevent rendering protected content
  if (!user) return null;

  // Render children if user is authenticated
  return <>{children}</>;
}

export default AuthCheck;
