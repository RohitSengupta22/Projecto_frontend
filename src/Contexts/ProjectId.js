import React from 'react'
import { createContext,useState } from 'react'
export const projectIdContext = createContext()

const ProjectId = (props) => {

    const [projectId,setProjectId] =useState(0)
  return (
    <projectIdContext.Provider value={[projectId,setProjectId]}>
        {props.children}
    </projectIdContext.Provider>
  )
}

export default ProjectId
