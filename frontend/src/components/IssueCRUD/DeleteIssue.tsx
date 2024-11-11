"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
import { useDeleteData } from "@/hooks/useDeleteData";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ISlugData {
    issue_type: string;
    id: number
}

export function DeleteIssue(
    { issue_type, id } :  ISlugData
) {
  const issue_url = `/api/${issue_type}/${id}/`;

  const { makeRequest } = useDeleteData()

  async function handleDeleteIssue() {
    console.log("DELETED!")
    await makeRequest(issue_url);
    window.location.reload();
  }

  return (
    <TooltipProvider>
    <Tooltip>
        <TooltipTrigger>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 size={20}></Trash2>
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
        </TooltipTrigger>
        <TooltipContent side='bottom'>
        <p>Delete</p>
        </TooltipContent>
    </Tooltip>
</TooltipProvider>

  );
}

/*
    <Button onClick={handleDeleteIssue}>
        <Trash2 size={20}></Trash2>
    </Button>
*/