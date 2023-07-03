// import React from "react";

// const Total = ({ expenses, currentDate }) => {
//   const year = currentDate.getFullYear(); // 現在の年を取得
//   const month = currentDate.getMonth(); // 現在の月を取得
//   const categories = ["investment", "consumption", "waste"]; // カテゴリーを英語に保持

//   // 各カテゴリーの合計を計算
//   const totals = categories.map((category) => {
//     const total = expenses
//       .filter((expense) => {
//         const expenseDate = expense.createdAt.toDate();
//         return (
//           expenseDate.getFullYear() === year &&
//           expenseDate.getMonth() === month &&
//           expense.type === category
//         );
//       })
//       .reduce((prev, curr) => prev + curr.amount, 0);

//     return { category, total };
//   });

//   // 全カテゴリーの合計を計算
//   const totalAll = totals.reduce((prev, curr) => prev + curr.total, 0);

//   // 合計の表示
//   return (
//     <div>
//       <h2>合計: {totalAll}円</h2>
//       {totals.map((total) => (
//         <p key={total.category}>
//           {total.category === "investment"
//             ? "投資"
//             : total.category === "consumption"
//             ? "消費"
//             : "浪費"}
//           : {total.total}円
//         </p>
//       ))}
//     </div>
//   );
// };

// export default Total;
