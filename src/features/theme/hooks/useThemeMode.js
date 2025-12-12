import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectThemeMode, setThemeMode } from "@/features/theme/slices/themeSlice";

const useThemeMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  const toggleTheme = useCallback(() => {
    const nextMode = mode === "light" ? "dark" : "light";

    localStorage.setItem("theme", nextMode);
    dispatch(setThemeMode(nextMode));
  }, [dispatch, mode]);

  return { mode, toggleTheme };
};

export default useThemeMode;
