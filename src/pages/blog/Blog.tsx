import {useState, useEffect } from "react"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@components/ui/chart.tsx"
import Layout from "@components/Layout/index.tsx"
import { getBlogData } from "../../api/blog.ts"

console.log("inspect.env", import.meta.env.VITE_BACKEND_DOMAIN)

const chartDataDeprecated = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartData = [
  {
    "date": "2024-10",
    "count": 3,
    "month": "October",
  },
  {
    "date": "2024-09",
    "count": 5,
    "month": "September",
  },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  count: {
    label: "Số bài viết của blog pedal-pedal",
    color: "#f59e0b",
  },
} satisfies ChartConfig

export function Component() {
  const [chartData, setChartData] = useState<any>(null)
  useEffect(() => {
    ;(async () => {
      const result = await getBlogData()
      if (result.ok) {
        setChartData(result.val)
      } else {
        console.log("inspect.Error:", result.err)
      }
    })()
  }, [])

  if (chartData === null) {
    return <div>Loading...</div>
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default function Blog() {
  return (
    <Layout>
      <section className="chart">
        <h2>Biểu Đồ Số bài viết theo tháng</h2>
        <Component />
      </section>
    </Layout>
  )
}
