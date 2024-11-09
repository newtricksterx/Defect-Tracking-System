"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
import { useDeleteData } from "@/CustomHooks/useDeleteData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ISlugData {
    issue_type: "epic" | "story" | "bug" | "task";
    id: number
}

export function DeleteIssue(
    { issue_type, id } :  ISlugData
) {
  const { authTokens } = useContext(AuthContext);
  const issue_url = `/api/${issue_type}/${id}/`;


  const { makeRequest } = useDeleteData(authTokens ? authTokens.access : "")

  async function handleDeleteIssue() {
    console.log("DELETED!")
    await makeRequest(issue_url);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 size={20}></Trash2>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this {issue_type}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. 
            This will permanently delete this {issue_type} and remove it from our databases.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteIssue}>    
            <Trash2 size={20}></Trash2>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/*
    <Button onClick={handleDeleteIssue}>
        <Trash2 size={20}></Trash2>
    </Button>
*/