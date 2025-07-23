import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./layout";
import MainPage from "../pages/MainPage/MainPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<MainPage />} />
      <Route path="task/:id" element={<MainPage />} />
      <Route path="task/new" element={<MainPage />} />
    </Route>
  ),
  {
    basename: "/task-manager",
  }
);
