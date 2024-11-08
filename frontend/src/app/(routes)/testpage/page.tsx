'use client'

import AuthContext from '@/context/AuthContext'
import { useFetchData } from '@/CustomHooks/useFetchData';
import React, { useContext, useEffect } from 'react'
import { Issue } from '@/lib/types';
import { UpdateIssue } from '@/components/IssueCRUD/UpdateIssue';
import { Button } from '@/components/ui/button';
import { usePatchData } from '@/CustomHooks/usePatchData';

const DEBUG_DATA = {
  issue_type: "epic",
  id: 1
}

function Testpage() {
  const { authTokens } = useContext(AuthContext);

 // const fetchedData = useFetchData<Issue[]>("/api/epic/", authTokens ? authTokens.access : "", [])
  const { makeRequest } = usePatchData(authTokens ? authTokens.access : "")


  async function handleClick(){
    console.log("CLICKED!")
    await makeRequest(`/api/${DEBUG_DATA.issue_type}/${DEBUG_DATA.id}/`, {
      issueType: "EPIC",
      title: "updatedepic",
      description: "updatedepic",
      assignedToID: 2,
      projectID: 1,
      priority: "HIGH",
      status: "TO_DO",
      attachment: null,
      tags: [],
      startDate: null,
      targetDate: null,
    })
  }

  return (
    <Button onClick={handleClick}>Click Me!</Button>
  )
}

// <UpdateIssue issue_type={"epic"} id={1}/>

export default Testpage
