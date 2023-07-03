import React, { useState } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Box
} from "@mui/material";

// フォームの定義
function Form({ addExpense }) {
  const [amount, setAmount] = useState(""); // 金額の状態管理
  const [text, setText] = useState(""); // 内容の状態管理
  const [type, setType] = useState("投資"); // タイプの状態管理
  const [date, setDate] = useState(new Date()); // 日付の状態管理

  // フォームの送信時の処理
  const onSubmit = (e) => {
    e.preventDefault(); // 通常のフォーム送信を無効にする
    addExpense(amount, text, type, date); // 親コンポーネントの関数を呼び出し、支出を追加する
    setAmount(""); // 金額フィールドをクリア
    setText(""); // テキストフィールドをクリア
  };

  // フォームのレンダリング
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* 金額の入力フィールド */}
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="金額"
          />
          {/* 内容の入力フィールド */}
          <TextField
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="内容"
          />
          {/* 支出の種類を選択するドロップダウンメニュー */}
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="投資">投資</MenuItem>
            <MenuItem value="消費">消費</MenuItem>
            <MenuItem value="浪費">浪費</MenuItem>
          </Select>
          {/* 日付の入力フィールド */}
          <TextField
            type="date"
            value={date.toISOString().substr(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* フォームの送信ボタン */}
          <Button type="submit" variant="contained">
            追加
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Form;
