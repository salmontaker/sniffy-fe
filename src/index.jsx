import "dayjs/locale/ko";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import App from "@/app/App";
import { clearUser } from "@/redux/authSlice";
import { store } from "@/redux/store";
import tokenManager from "@/utils/tokenManager";

registerSW();

tokenManager.setLogoutCallback(() => {
  store.dispatch(clearUser());
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizationProvider>
  </Provider>
);
