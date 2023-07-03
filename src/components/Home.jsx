import { useState, useEffect } from "react";
import { db } from "../firebase/Firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
  // serverTimestamp
} from "firebase/firestore";
import Header from "./Header";
import Chart from "./Chart";
// import Total from "./Total";
import Form from "./Form";
import Expenses from "./Expenses";

function Home() {
  const [expenses, setExpenses] = useState([]); // 経費の状態管理
  const [currentDate, setCurrentDate] = useState(new Date()); // 現在の日付の状態管理

  // 初期描画とその後のexpensesの変更ごとに実行される
  useEffect(() => {
    // Firestoreのデータをリアルタイムで取得
    const q = query(collection(db, "expenses"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _expenses = [];
      querySnapshot.forEach((doc) => {
        _expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setExpenses(_expenses); // 経費を更新
    });

    // useEffectのクリーンアップ関数
    return () => {
      unsubscribe();
    };
  }, []);

  // 経費の追加
  const addExpense = async (amount, text, type, date) => {
    // 日本語のタイプを英語に変換
    const englishType =
      type === "投資"
        ? "investment"
        : type === "消費"
        ? "consumption"
        : "waste";
    await addDoc(collection(db, "expenses"), {
      amount: parseInt(amount, 10),
      text,
      type: englishType, // typeを英語に変換
      createdAt: date // using the selected date
    });
  };

  // 各コンポーネントをレンダリング
  return (
    <div>
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Chart expenses={expenses} currentDate={currentDate} />
      {/* <Total expenses={expenses} currentDate={currentDate} /> */}
      <Form addExpense={addExpense} />
      <Expenses expenses={expenses} currentDate={currentDate} />
    </div>
  );
}

export default Home;
