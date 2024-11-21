import Layout from "@components/Layout/index.tsx"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@components/ui/chart.tsx"
import { CountPostsByMonth } from "@pedal-pedal/types"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { getBlogData } from "../../api/blog.ts"

const chartConfig = {
  count: {
    label: "Số bài viết của blog pedal-pedal",
    color: "#f59e0b",
  },
} satisfies ChartConfig

export function Component() {
  const [chartData, setChartData] = useState<CountPostsByMonth | null>(null)
  useEffect(() => {
    ;(async () => {
      const result = await getBlogData()
      if (result.ok) {
        setChartData(result.val)
      } else {
        console.log("inspect.Error:", result.val)
      }
    })()
  }, [])

  if (chartData === null) {
    return <div>Loading...</div>
  }

  return (
    <ChartContainer config={chartConfig} tabIndex={-1}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 16)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default function Analysis() {
  return (
    <Layout>
      <section className="chart">
        <h2>Biểu Đồ Số bài viết theo tháng</h2>
        <Component />
      </section>
    </Layout>
  )
}
