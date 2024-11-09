"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { Delete, Trash2 } from "lucide-react";
import { useDeleteData } from "@/CustomHooks/useDeleteData";

interface ISlugData {
    issue_type: "epic" | "story" | "bug" | "task";
    id: number
}

export function DeleteIssue(
    { issue_type, id } :  ISlugData
) {
  const router = useRouter();
  const { authTokens } = useContext(AuthContext);
  const issue_url = `/api/${issue_type}/${id}/`;


  const { makeRequest } = useDeleteData(authTokens ? authTokens.access : "")

  async function handleDeleteIssue() {
    console.log("DELETED!")
    await makeRequest(issue_url);
  }

  return (
    <Button onClick={handleDeleteIssue}>
        <Trash2 size={20}></Trash2>
    </Button>
  );
}
