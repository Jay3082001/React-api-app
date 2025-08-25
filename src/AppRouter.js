import './App.css';
import './Globle.scss'
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spin from "./components/LoadingSpinner/Spin";
import ProtectedRoute from './Layout/Navbar/ProtectedRoute';

const Container = lazy(() => import("./module/Container"));
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/404page/NotFound"));

function AppRouter() {
  return (
     <>
     <Suspense fallback={<Spin size={60} />}>
       <Routes> 
        <Route path="/" element={<Navigate to="/login/signin" replace />} />
        <Route path="/login/*" element={<Login/>} />
        <Route path="/container/*" element={<ProtectedRoute> <Container /> </ProtectedRoute>}></Route>  
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter; 