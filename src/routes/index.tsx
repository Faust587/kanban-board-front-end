import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages";

export const routes = createBrowserRouter([
  {
    path: "/:id",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);
