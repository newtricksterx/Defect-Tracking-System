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
import { MessageProps } from "@/lib/types"
import React from 'react'
import ResultMessage from "./ResultMessage"

function PopoutContent({result, title, message}: MessageProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <ResultMessage result={result} title={title} message={message}/>
        </AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default PopoutContent
