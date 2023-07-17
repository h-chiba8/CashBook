// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Container, Typography, Box } from "@mui/material";

// const Chart = ({ expenses, currentDate }) => {
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const categories = ["investment", "consumption", "waste"];
//   const colors = ["#3d405b", "#e07a5f", "#81b29a"];

//   const chartData = categories.map((category) =>
//     expenses
//       .filter((expense) => {
//         const expenseDate = expense.createdAt.toDate();
//         return (
//           expenseDate.getFullYear() === year &&
//           expenseDate.getMonth() === month &&
//           expense.type === category
//         );
//       })
//       .reduce((prev, curr) => prev + curr.amount, 0)
//   );

//   const totalExpense = chartData.reduce((prev, curr) => prev + curr, 0);

//   const data = {
//     labels: categories.map((category) =>
//       category === "investment" ? "投資" : category === "consumption" ? "消費" : "浪費"
//     ),
//     datasets: [
//       {
//         data: chartData,
//         backgroundColor: colors,
//         hoverOffset: 4
//       }
//     ]
//   };

//   const options = {
//     maintainAspectRatio: false,
//     aspectRatio: 1,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const value = context.dataset.data[context.dataIndex];
//             const percentage = ((value / totalExpense) * 100).toFixed(2);
//             return `${data.labels[context.dataIndex]}: ${value}円 (${percentage}%)`;
//           }
//         }
//       },
//       legend: {
//         display: true,
//         position: "bottom"
//       }
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         合計: {totalExpense}円
//       </Typography>
//       <Box>
//         <Doughnut data={data} options={options} />
//       </Box>
//     </Container>
//   );
// };

// export default Chart;