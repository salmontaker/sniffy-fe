import { Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import HomePage from "@/features/home/pages/HomePage";
import ItemDetailPage from "@/features/items/pages/ItemDetailPage";
import ItemSearchPage from "@/features/items/pages/ItemSearchPage";
import MyPage from "@/features/mypage/pages/MyPage";
import NoticePage from "@/features/notice/pages/NoticePage";
import NotFoundPage from "@/pages/NotFoundPage";

export const appRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<ItemSearchPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/notices" element={<NoticePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </>
  );
};
