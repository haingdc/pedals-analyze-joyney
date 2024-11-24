// deno-lint-ignore-file
/* eslint-disable prefer-const */
import { describe, expect, test } from "vitest"
import {
  back,
  forward,
  type FuseResultType,
} from "./back-forward-autocomplete.ts"
import Fuse, { type FuseResult } from "fuse.js"

describe("hàm back autocomplete", () => {
  test("Khi results length bằng 0", () => {
    const results: FuseResult<FuseResultType>[] = []
    const prevIndex = 0
    expect(back(prevIndex, results)).toBe(-1)
  })

  test("Khi results là mảng có giá trị", () => {
    const list = [
      { keyword: "@home", type: "page", to: "/" },
      { keyword: "@blog", type: "page", to: "/blog" },
      { keyword: "@package-analysis", type: "page", to: "/package-analysis" },
      { keyword: "@analytics", type: "page", to: "/analytics" },
      { keyword: "@deploy", type: "page", to: "/deploy" },
    ]
    const fuse = new Fuse(list, {
      keys: ["keyword"],
      includeScore: true,
    })
    const keyword = "@"
    const results: FuseResult<FuseResultType>[] = fuse.search(keyword)
    let prevIndex = 0
    expect(back(prevIndex, results)).toBe(results.length - 1)
    prevIndex = 1
    expect(back(prevIndex, results)).toBe(0)
    prevIndex = results.length - 1
    expect(back(prevIndex, results)).toBe(results.length - 2)
  })

  test("Khi prevIndex là ngoài phạm vi", () => {
    const list = [
      { keyword: "@home", type: "page", to: "/" },
      { keyword: "@blog", type: "page", to: "/blog" },
      { keyword: "@package-analysis", type: "page", to: "/package-analysis" },
      { keyword: "@analytics", type: "page", to: "/analytics" },
      { keyword: "@deploy", type: "page", to: "/deploy" },
    ]
    const fuse = new Fuse(list, {
      keys: ["keyword"],
      includeScore: true,
    })
    const keyword = "@"
    const results: FuseResult<FuseResultType>[] = fuse.search(keyword)
    let prevIndex = -1
    expect(back(prevIndex, results)).toBe(results.length - 1)
    prevIndex = -2
    expect(back(prevIndex, results)).toBe(-1)
    prevIndex = list.length
    expect(back(prevIndex, results)).toBe(-1)
  })
})

describe("hàm forward autocomplete", () => {
  test("Khi results length bằng 0", () => {
    const results: FuseResult<FuseResultType>[] = []
    const prevIndex = 0
    expect(forward(prevIndex, results)).toBe(-1)
  })

  test("Khi results là mảng có giá trị", () => {
    const list = [
      { keyword: "@home", type: "page", to: "/" },
      { keyword: "@blog", type: "page", to: "/blog" },
      { keyword: "@package-analysis", type: "page", to: "/package-analysis" },
      { keyword: "@analytics", type: "page", to: "/analytics" },
      { keyword: "@deploy", type: "page", to: "/deploy" },
    ]
    const fuse = new Fuse(list, {
      keys: ["keyword"],
      includeScore: true,
    })
    const keyword = "@"
    const results: FuseResult<FuseResultType>[] = fuse.search(keyword)
    let prevIndex = 0
    expect(forward(prevIndex, results)).toBe(1)
    prevIndex = 1
    expect(forward(prevIndex, results)).toBe(2)
    prevIndex = results.length - 1
    expect(forward(prevIndex, results)).toBe(0)
  })

  test("Khi prevIndex là ngoài phạm vi", () => {
    const list = [
      { keyword: "@home", type: "page", to: "/" },
      { keyword: "@blog", type: "page", to: "/blog" },
      { keyword: "@package-analysis", type: "page", to: "/package-analysis" },
      { keyword: "@analytics", type: "page", to: "/analytics" },
      { keyword: "@deploy", type: "page", to: "/deploy" },
    ]
    const fuse = new Fuse(list, {
      keys: ["keyword"],
      includeScore: true,
    })
    const keyword = "@"
    const results: FuseResult<FuseResultType>[] = fuse.search(keyword)
    let prevIndex = -1
    expect(forward(prevIndex, results)).toBe(0)
    prevIndex = -2
    expect(forward(prevIndex, results)).toBe(-1)
    prevIndex = -3
    expect(forward(prevIndex, results)).toBe(-1)
    prevIndex = list.length
    expect(forward(prevIndex, results)).toBe(-1)
  })
})
