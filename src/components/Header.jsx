import React from "react";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";

function Header({ currentDate, setCurrentDate }) {
  // 前の月へ移動する関数
  const prevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  // 次の月へ移動する関数
  const nextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
      sx={{ backgroundColor: blue[700], color: "white" }} // ヘッダーの背景色をブルーにし、テキストの色を白に設定
    >
      <ArrowBackIosNewIcon
        onClick={prevMonth}
        sx={{ cursor: "pointer", color: "white" }} // カーソルをポインタにし、アイコンの色を白に設定
      />
      <Typography variant="h5" component="h1" sx={{ mx: 4 }}>
        {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
        {/* 現在の年月を表示 */}
      </Typography>
      <ArrowForwardIosIcon
        onClick={nextMonth}
        sx={{ cursor: "pointer", color: "white" }} // カーソルをポインタにし、アイコンの色を白に設定
      />
    </Box>
  );
}

export default Header;
