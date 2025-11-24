import "./index.css";
import "dayjs/locale/ko";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizationProvider>
  </Provider>
);
