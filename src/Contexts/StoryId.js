import React from 'react'
import { useState,createContext } from 'react'
export const StoryContext = createContext()

const StoryId = (props) => {

    const [storyId,setStoryId] = useState("Pr-1")
  return (
    <StoryContext.Provider value={[storyId,setStoryId]}>
        {props.children}
    </StoryContext.Provider>
  )
}

export default StoryId
