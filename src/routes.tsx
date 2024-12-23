import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const useAppRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/mySocialNetwork",
      element: <App />,
    },
  ]);
};
