import React from "react";
import { db } from "../firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Container, Box, Typography, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function Expenses({ expenses, currentDate }) {
  const year = currentDate.getFullYear(); // 現在の年を取得
  const month = currentDate.getMonth(); // 現在の月を取得

  // 月ごとの経費をフィルタリング
  const filtered = expenses.filter((expense) => {
    const expenseDate = expense.createdAt.toDate(); // createdAtをDateに変換
    return (
      expenseDate.getFullYear() === year && expenseDate.getMonth() === month
    );
  });

  // 経費の削除
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  // 各経費のレンダリング
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // スマートフォンでは縦並び、それ以外では横並び
        justifyContent: "space-around",
        mt: 5, // フォームとの間にマージンを追加
        alignItems: { xs: "center", sm: "flex-start" } // スマートフォンでは中央寄せ、それ以外では左寄せ
      }}
    >
      <Box width={1 / 3} sx={{ mb: { xs: 2, sm: 0 }, mr: { xs: 0, sm: 2 } }}>
        <Typography
          variant="h6"
          sx={{ borderBottom: "2px solid #3d405b", pb: 1 }}
        >
          投資
        </Typography>
        {filtered
          .filter((expense) => expense.type === "investment")
          .map((expense) => (
            <Box
              key={expense.id}
              sx={{ display: "flex", alignItems: "center", margin: 2 }}
            >
              <IconButton onClick={() => deleteExpense(expense.id)}>
                <CancelIcon />
              </IconButton>
              <Box ml={2}>
                <Typography>{expense.text}</Typography>
                <Typography>{expense.amount}円</Typography>
                <Typography>
                  {expense.createdAt.toDate().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
      <Box width={1 / 3} sx={{ mb: { xs: 2, sm: 0 }, mx: { xs: 0, sm: 2 } }}>
        <Typography
          variant="h6"
          sx={{ borderBottom: "2px solid #e07a5f", pb: 1 }}
        >
          消費
        </Typography>
        {filtered
          .filter((expense) => expense.type === "consumption")
          .map((expense) => (
            <Box
              key={expense.id}
              sx={{ display: "flex", alignItems: "center", margin: 2 }}
            >
              <IconButton onClick={() => deleteExpense(expense.id)}>
                <CancelIcon />
              </IconButton>
              <Box ml={2}>
                <Typography>{expense.text}</Typography>
                <Typography>{expense.amount}円</Typography>
                <Typography>
                  {expense.createdAt.toDate().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
      <Box width={1 / 3} sx={{ mb: { xs: 2, sm: 0 }, ml: { xs: 0, sm: 2 } }}>
        <Typography
          variant="h6"
          sx={{ borderBottom: "2px solid #81b29a", pb: 1 }}
        >
          浪費
        </Typography>
        {filtered
          .filter((expense) => expense.type === "waste")
          .map((expense) => (
            <Box
              key={expense.id}
              sx={{ display: "flex", alignItems: "center", margin: 2 }}
            >
              <IconButton onClick={() => deleteExpense(expense.id)}>
                <CancelIcon />
              </IconButton>
              <Box ml={2}>
                <Typography>{expense.text}</Typography>
                <Typography>{expense.amount}円</Typography>
                <Typography>
                  {expense.createdAt.toDate().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Container>
  );
}

export default Expenses;
