'use client'

import AuthContext from '@/context/AuthContext'
import React, { useContext, useEffect } from 'react'
import { IIssue } from '@/lib/types';
import { UpdateIssue } from '@/components/crud-issue/UpdateIssue';
import { Button } from '@/components/ui/button';
import { usePatchData } from '@/requests/PatchRequest';
import { DeleteIssue } from '@/components/crud-issue/DeleteIssue';
import { ReadIssue } from '@/components/crud-issue/ReadIssue';
import ResultMessage from '@/components/ui/ResultMessage';
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
import PopoutContent from '@/components/ui/PopoutContent';


function Testpage() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Popout</AlertDialogTrigger>
      <PopoutContent result={true} title='Success!' message='Successful message'/>
    </AlertDialog>
  )
}

// <UpdateIssue issue_type={"epic"} id={1}/>
// <Button onClick={handleClick}>Click Me!</Button>

export default Testpage
