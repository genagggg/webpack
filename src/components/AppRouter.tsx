import { Routes, Route, Navigate } from "react-router-dom";
import { publicRouters, privateRoutes } from "../router";
import { FC, useContext } from "react";
import Error from "../pages/Error";
import { AuthContext } from "../context";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

const AppRouter: FC = () => {
  const {isAuth}=useContext(AuthContext)
  console.log(isAuth)
  return (
    <Routes>
    {/* Основное перенаправление */}
    <Route 
      path="/" 
      element={
        isAuth 
          ? <Navigate to={privateRoutes[0]?.path || "/"} replace /> 
          : <Navigate to={publicRouters[0]?.path || "/login"} replace />
      } 
    />

    {/* Публичные маршруты (доступны всегда) */}
    {publicRouters.map(({ path, element }: RouteConfig) => (
      <Route key={path} path={path} element={element} />
    ))}

    {/* Приватные маршруты (только для авторизованных) */}
    {isAuth && privateRoutes.map(({ path, element }: RouteConfig) => (
      <Route key={path} path={path} element={element} />
    ))}

    {/* Обработка 404 */}
    <Route path="*" element={<Error />} />
  </Routes>
  );
};

export default AppRouter;
