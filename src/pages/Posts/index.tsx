import AppLayout from '@components/Layout/index.tsx'
import { useEffect } from 'react'
import { getBlogPosts } from '../../api/blog.ts'
import { Helmet } from 'react-helmet'

const Posts: React.FunctionComponent = () => {
  useEffect(() => {
    ;(async () => {
      const result = await getBlogPosts()
      if (result.ok) {
        console.log('inspect.Ok:', result.val)
      } else {
        console.log('inspect.Error:', result.val)
      }
    })()
  }, [])
  return (
    <>
      <Helmet>
        <title>Blog</title>
        <link rel='stylesheet' href='/stylesheets/blog.css' />
      </Helmet>
      <AppLayout>
        <h1 className='dfvn-guardilostra'>PHỐ CỔ HÀ NỘI</h1>
      </AppLayout>
    </>
  )
}

export default Posts
