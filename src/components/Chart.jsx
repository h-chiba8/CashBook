import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { Container, Typography, Box } from "@mui/material";

// ChartJSの各種機能を登録
ChartJS.register(
  // 全コントローラーの登録
  require("chart.js").controllers,
  // 全エレメントの登録
  require("chart.js").elements,
  // 全スケールの登録
  require("chart.js").scales,
  // 全プラグインの登録
  require("chart.js").plugins
);

const Chart = ({ expenses, currentDate }) => {
  const year = currentDate.getFullYear(); // 現在の年を取得
  const month = currentDate.getMonth(); // 現在の月を取得
  const categories = ["investment", "consumption", "waste"]; // カテゴリーを英語に保持
  const colors = ["#3d405b", "#e07a5f", "#81b29a"]; // カラー

  // 各カテゴリーごとのデータを生成
  const chartData = categories.map((category) =>
    expenses
      .filter((expense) => {
        const expenseDate = expense.createdAt.toDate();
        return (
          expenseDate.getFullYear() === year &&
          expenseDate.getMonth() === month &&
          expense.type === category
        );
      })
      .reduce((prev, curr) => prev + curr.amount, 0)
  );

  const totalExpense = chartData.reduce((prev, curr) => prev + curr, 0);

  // チャートのデータを生成
  const data = {
    labels: categories.map((category) =>
      category === "investment"
        ? "投資"
        : category === "consumption"
        ? "消費"
        : "浪費"
    ), // ラベルを日本語に変換
    datasets: [
      {
        data: chartData,
        backgroundColor: colors,
        hoverOffset: 4
      }
    ]
  };

  // チャートのオプションを設定
  const options = {
    maintainAspectRatio: false, // チャートを親コンテナの全幅と全高に調整
    aspectRatio: 1, // チャートを1:1（正方形）の比率に保つ
    plugins: {
      datalabels: {
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
        color: "#000000",
        font: {
          weight: "bold"
        },
        formatter: function (value, context) {
          const total = context.dataset.data.reduce((acc, curr) => acc + curr);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        }
      }
    }
  };

  // ドーナツチャートのレンダリング
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        maxWidth: "500px",
        mt: 5 // Added margin top to create space between the Header
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        合計: {totalExpense}円
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {categories.map((category, index) => {
          const value = chartData[index];
          const percentage =
            totalExpense !== 0
              ? ((value / totalExpense) * 100).toFixed(2)
              : "0.00";
          const japaneseCategory =
            category === "investment"
              ? "投資"
              : category === "consumption"
              ? "消費"
              : "浪費";
          return (
            <Typography
              variant="h6"
              key={index}
              sx={{
                textDecoration: "underline",
                textDecorationColor: colors[index]
              }}
            >
              {`${japaneseCategory}：${value}円　${percentage}%`}
            </Typography>
          );
        })}
      </Box>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Doughnut data={data} options={options} />
      </div>
    </Container>
  );
};

export default Chart;
