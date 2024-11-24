import { type FuseResult } from "fuse.js"

interface FuseResultType {
  keyword: string
  type: string
  to: string
}

function back(prevIndex: number, results: FuseResult<{
  keyword: string
  type: string
  to: string
}>[]): number {
  if (results.length === 0) {
    return -1
  }
  if (prevIndex === -1) {
    return results.length - 1
  }
  if (!(0 <= prevIndex && results.length > prevIndex)) {
    return -1
  }

  if (prevIndex === 0) {
    return results.length - 1
  }

  return prevIndex - 1
}

function forward(prevIndex: number, results: FuseResult<{
  keyword: string
  type: string
  to: string
}>[]): number {
  if (results.length === 0) {
    return -1
  }
  if (prevIndex === -1) {
    return 0
  }
  if (!(0 <= prevIndex && results.length > prevIndex)) {
    return -1
  }

  let nextIndex = prevIndex + 1
  if (nextIndex >= results.length) {
    nextIndex = 0
  }
  return nextIndex
}

export { type FuseResultType, back, forward }
