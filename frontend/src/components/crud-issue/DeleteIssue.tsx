"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
import { DeleteRequest } from "@/requests/DeleteRequest";
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

  const { user } = useContext(AuthContext)

  const { deleteRequest } = DeleteRequest()

  async function handleDeleteIssue() {
    console.log("DELETED!")
    await deleteRequest(issue_url);
    window.location.reload();
  }

  return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>              
            {
              user.is_admin ? 
              <AlertDialog>
                <AlertDialogTrigger asChild variant="ghost">
                  <div>
                    <Trash2 size={20}/>
                  </div>
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
                      <Trash2 size={20} />
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> :
              <Button asChild variant="ghost">
                <div>
                  <Trash2 size={20}/>
                </div>
              </Button>
            }

          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  );
}