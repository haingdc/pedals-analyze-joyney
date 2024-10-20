import {Err, Ok } from "ts-results"

async function getBlogData() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/blog`)
    const data = await response.json()
    return new Ok(data)
  } catch (error) {
    return new Err(error)
  }
}

export {
  getBlogData,
}