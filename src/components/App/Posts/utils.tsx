import React from 'react'
import { PostsContext, PostsDispatchContext } from "@components/App/Posts/index.tsx"

export function usePosts() {
  const currentPostsContext = React.useContext(PostsContext)
  if (currentPostsContext === null) {
    throw new Error('usePosts must be used within a <PostsContext.Provider />')
  }
  return currentPostsContext
}

export function usePostsDispatch() {
  const currentPostsDispatchContext = React.useContext(PostsDispatchContext)
  if (currentPostsDispatchContext === null) {
    throw new Error('usePostsDispatch must be used within a <PostsDispatchContext.Provider />')
  }
  return currentPostsDispatchContext
}