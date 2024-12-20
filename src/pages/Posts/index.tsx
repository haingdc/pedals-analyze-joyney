import { getBlogPosts } from "@/api/blog.ts"
import { usePosts, usePostsDispatch } from "@components/App/Posts/utils.tsx"
import AppLayout from "@components/Layout/index.tsx"
import { useEffect } from "react"
import { Helmet } from "react-helmet"

const Posts: React.FunctionComponent = () => {
  const postsValue = usePosts()
  const dispatch = usePostsDispatch()
  useEffect(() => {
    ;(async () => {
      dispatch({ type: "load" })
      const result = await getBlogPosts()
      if (result.ok) {
        dispatch({ type: "load_ok", payload: result.val })
      } else {
        dispatch({ type: "load_err", payload: "error fetching data" })
      }
    })()
  }, [dispatch])
  return (
    <>
      <Helmet>
        <title>Blog</title>
        <link
          rel="preload"
          href={`${import.meta.env.VITE_BASE_URL}/fonts/DFVN-Guardilostra/DFVN-Guardilostra.ttf`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href={`${import.meta.env.VITE_BASE_URL}/stylesheets/blog.css`}
        />
      </Helmet>
      <AppLayout>
        <h1 className="dfvn-guardilostra">PHỐ CỔ HÀ NỘI</h1>
        {postsValue.mime_state === "pending" && <p>Loading...</p>}
        {postsValue.mime_state === "error" && <p>Error: {postsValue.error}</p>}
        {postsValue.mime_state === "okay" && postsValue.posts.length === 0 && (
          <p>No posts found</p>
        )}
        {postsValue.mime_state === "okay" &&
          postsValue.posts.map((post, index) => {
            return (
              <div key={index}>
                <h2>{`${index}. ${post.title}`}</h2>
              </div>
            )
          })}
      </AppLayout>
    </>
  )
}

export default Posts
