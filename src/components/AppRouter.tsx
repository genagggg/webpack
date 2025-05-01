import { Routes, Route, Navigate } from "react-router-dom";
import { publicRouters, privateRoutes } from "../router";
import { FC } from "react";
import Error from "../pages/Error";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

const AppRouter: FC = () => {
  const isAuth = false; 

  return (
    <Routes>
      {/* Публичные маршруты */}
      {publicRouters.map(({ path, element }: RouteConfig) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Приватные маршруты */}
      {isAuth && 
        privateRoutes.map(({ path, element }: RouteConfig) => (
          <Route key={path} path={path} element={element} />
        ))
      }

      {/* Перенаправление для корневого пути */}
      <Route 
        path="/" 
        element={
          isAuth 
            ? <Navigate to="/about" replace /> 
            : <Navigate to="/login" replace />
        } 
      />

      {/* Обработка 404 */}
      <Route path="*" element={<Error/>} />
    </Routes>
  );
};

export default AppRouter;
