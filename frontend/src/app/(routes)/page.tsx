'use client'

import { Button } from "@/components/ui/button";
import CardComponent from "@/components/UIComponents/CardComponent";
import AuthContext from '@/context/AuthContext';
import React, { useContext } from "react";

export default function Home() {
  let {user} = useContext(AuthContext);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <CardComponent>
          Welcome, {user && <span>{user.username}</span>}
        </CardComponent>
      </div>
    </div>
  );
}
