'use client'

import AuthContext from '@/context/AuthContext'
import { useFetchData } from '@/hooks/useFetchData';
import React, { useContext, useEffect } from 'react'
import { Issue } from '@/lib/types';
import { UpdateIssue } from '@/components/IssueCRUD/UpdateIssue';
import { Button } from '@/components/ui/button';
import { usePatchData } from '@/hooks/usePatchData';
import { DeleteIssue } from '@/components/IssueCRUD/DeleteIssue';
import { ReadIssue } from '@/components/IssueCRUD/ReadIssue';
import IssueTable from '@/components/IssueTable';


function Testpage() {
  return (
    <IssueTable />
  )
}

// <UpdateIssue issue_type={"epic"} id={1}/>
// <Button onClick={handleClick}>Click Me!</Button>

export default Testpage
