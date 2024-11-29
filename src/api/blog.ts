import type { CountPostsByMonth, Post } from "@pedal-pedal/types"
import { Err, ErrImpl, Ok, OkImpl, Result } from "ts-results"

async function getBlogData(): Promise<
  OkImpl<CountPostsByMonth> | ErrImpl<unknown>
> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/blog`,
    )
    const data: CountPostsByMonth = await response.json()
    return new Ok(data)
  } catch (error) {
    return new Err(error)
  }
}

async function getBlogPosts(): Promise<Result<Post[], unknown>> {
  try {
    const pageIndex = 1
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/blog/${pageIndex}`,
    )
    const data: Post[] = await response.json()
    return new Ok(data)
  } catch (error) {
    return new Err(error)
  }
}

export { getBlogData, getBlogPosts }
