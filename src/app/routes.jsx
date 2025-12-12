import { Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import ItemDetailPage from "@/pages/ItemDetailPage";
import LoginPage from "@/pages/LoginPage";
import MyPage from "@/pages/MyPage";
import NotFoundPage from "@/pages/NotFoundPage";
import NoticePage from "@/pages/NoticePage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";

export const appRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/notices" element={<NoticePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </>
  );
};
