import { useMemo } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import {
  Paper,
  Typography,
} from "@mui/material";

const BAR_COLORS = [
  "#22C55E", // 6/6
  "#3B82F6", // 5/6
  "#F59E0B", // 4/6
  "#A855F7", // 3/6
  "#EF4444", // 2/6
  "#06B6D4", // 1/6
  "#6B7280", // 0/6
];

function OverviewChart({ stocks }) {
  const data = useMemo(() => {
    const distribution = {
      "6/6": 0,
      "5/6": 0,
      "4/6": 0,
      "3/6": 0,
      "2/6": 0,
      "1/6": 0,
      "0/6": 0,
    };

    stocks.forEach((stock) => {
      if (Object.prototype.hasOwnProperty.call(
        distribution,
        stock.Score
      )) {
        distribution[stock.Score]++;
      }
    });

    return Object.entries(distribution).map(
      ([score, count]) => ({
        score,
        stocks: count,
      })
    );
  }, [stocks]);

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 5,
        background: "#313C4F",
        border: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        color="white"
        gutterBottom
      >
        📊 Score Distribution
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,.18)"
          />

          <XAxis
            dataKey="score"
            stroke="#CBD5E1"
            tick={{
              fill: "#CBD5E1",
              fontSize: 14,
            }}
          />

          <YAxis
            allowDecimals={false}
            stroke="#CBD5E1"
            tick={{
              fill: "#CBD5E1",
              fontSize: 14,
            }}
          />

          <Tooltip
           cursor={{
           fill: "rgba(255,255,255,.08)",
            }}
           contentStyle={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 12,
            color: "#FFFFFF",
            boxShadow: "0 12px 30px rgba(0,0,0,.45)",
          }}
           labelStyle={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 16,
          }}
          itemStyle={{
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 15,
          }}
        />
          <Bar
            dataKey="stocks"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.score}
                fill={BAR_COLORS[index]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default OverviewChart;