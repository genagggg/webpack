import { Routes, Route } from "react-router-dom";
import { routes } from "../router";

const AppRouter = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

export default AppRouter;
