'use client'

import React, { ReactNode, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';

function AuthCheck({ children }: {children: ReactNode}) {
  const { user } = useContext(AuthContext); // Assume `user` is null if not authenticated

  // If not authenticated, redirect to login page
  if (!user) {
    redirect("login"); // Redirect to login if user is not authenticated
  }

  // Render children if user is authenticated
  return <>{children}</>;
};

export default AuthCheck;
