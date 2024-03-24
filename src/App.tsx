import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
