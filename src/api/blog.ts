import type { CountPostsByMonth } from "@pedal-pedal/types"
import { Err, Ok, OkImpl, ErrImpl } from "ts-results"

async function getBlogData(): Promise<OkImpl<CountPostsByMonth> | ErrImpl<unknown>> {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/blog`)
    const data: CountPostsByMonth = await response.json()
    return new Ok(data)
  } catch (error) {
    return new Err(error)
  }
}

export {
  getBlogData
}
