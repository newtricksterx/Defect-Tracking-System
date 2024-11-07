'use client'

import AuthContext from '@/context/AuthContext'
import { useFetchData } from '@/CustomHooks/useFetchData';
import React, { useContext, useEffect } from 'react'
import { Issue } from '@/lib/types';
import { UpdateIssue } from '@/components/IssueCRUD/UpdateIssue';

function Testpage() {
  //const { authTokens } = useContext(AuthContext);

 // const fetchedData = useFetchData<Issue[]>("/api/epic/", authTokens ? authTokens.access : "", [])

  return (

    <UpdateIssue issue_type={"epic"} id={1}/>

  )
}

export default Testpage
