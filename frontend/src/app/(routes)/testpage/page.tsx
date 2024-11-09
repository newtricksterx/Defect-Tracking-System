'use client'

import AuthContext from '@/context/AuthContext'
import { useFetchData } from '@/CustomHooks/useFetchData';
import React, { useContext, useEffect } from 'react'
import { Issue } from '@/lib/types';
import { UpdateIssue } from '@/components/IssueCRUD/UpdateIssue';
import { Button } from '@/components/ui/button';
import { usePatchData } from '@/CustomHooks/usePatchData';
import { DeleteIssue } from '@/components/IssueCRUD/DeleteIssue';

function Testpage() {
  return (
    <DeleteIssue issue_type={"epic"} id={2}/>
  )
}

// <UpdateIssue issue_type={"epic"} id={1}/>
// <Button onClick={handleClick}>Click Me!</Button>

export default Testpage
