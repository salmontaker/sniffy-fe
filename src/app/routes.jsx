import { Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ItemDetailPage from "../pages/ItemDetailPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";

export const appRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/item/:id" element={<ItemDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
};
