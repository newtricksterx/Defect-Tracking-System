'use client'

import AuthContext from '@/context/AuthContext'
import React, { useContext, useEffect } from 'react'
import { Issue } from '@/lib/types';
import { UpdateIssue } from '@/components/IssueCRUD/UpdateIssue';
import { Button } from '@/components/ui/button';
import { usePatchData } from '@/requests/PatchRequest';
import { DeleteIssue } from '@/components/IssueCRUD/DeleteIssue';
import { ReadIssue } from '@/components/IssueCRUD/ReadIssue';
import IssueTable from '@/components/IssueTable';
import ResultMessage from '@/components/UIComponents/ResultMessage';
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
import PopoutContent from '@/components/UIComponents/PopoutContent';


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
