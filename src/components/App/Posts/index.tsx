import type { Post } from '@pedal-pedal/types'
import React, { createContext } from 'react'

interface PostsContextType {
  mime_state: 'initial' | 'pending' | 'error' | 'okay'
  posts: Post[]
  error: string
}

export const PostsContext = createContext<PostsContextType | null>(null)
export const PostsDispatchContext = createContext<React.Dispatch<ACTIONTYPE_Posts> | null>(null)

export const PostsProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const [value, dispatch] = React.useReducer(configureReducer, initialState)
  return (
    <PostsContext.Provider value={value}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  )
}

export default PostsProvider

const initialState: PostsContextType = {
  mime_state: 'initial',
  posts: [],
  error: '',
}

type ACTIONTYPE_Posts =
  | { type: 'load' }
  | { type: 'load_ok'; payload: Post[] }
  | { type: 'load_err'; payload: string }
  | { type: 'reset' }

function configureReducer(
  state: PostsContextType,
  action: ACTIONTYPE_Posts
): PostsContextType {
  switch (action.type) {
    case 'load':
      return { ...state, mime_state: 'pending' }
    case 'load_ok':
      return { ...state, mime_state: 'okay', posts: action.payload }
    case 'load_err':
      return { ...state, mime_state: 'error', error: action.payload }
    case 'reset':
      return { ...state, mime_state: 'initial' }
    default:
      throw new Error()
  }
}
