import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  // useContextを使用してAuthProviderからcurrentUserを取得します
  const { currentUser } = useContext(AuthContext);

  // ログインしているユーザーの場合、children (プライベートコンポーネント) を表示します
  // そうでない場合、ログインページにリダイレクトします
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
