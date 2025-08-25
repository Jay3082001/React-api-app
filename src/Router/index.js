import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Spin from "../components/LoadingSpinner/Spin";
import NotFound from "../pages/404page/NotFound";
import AuthUsers from "../pages/AuthUsers/AuthUsers";

// Lazy load all route components
const Home = lazy(() => import("../pages/Home/Home"));
const Apartment = lazy(() => import("../pages/Home/lib/Apartment"));
const Villa = lazy(() => import("../pages/Home/lib/Villa"));
const PentHouse = lazy(() => import("../pages/Home/lib/PentHouse"));
const ShowAll = lazy(() => import("../pages/Home/lib/ShowAll"));
const ActivityList = lazy(() => import("../pages/Activities/Activities"));
const AuthorList = lazy(() => import("../pages/Authors/Authors"));
const Books = lazy(() => import("../pages/Books/Books"));
const UserList = lazy(() => import("../pages/Users/Users"));

const PageRouter = () => {
  return (
    <Suspense fallback={<Spin size={60} />}>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} /> 

        <Route path="home" element={<Home />}>
          <Route index element={<ShowAll />} />
          <Route path="apartment" element={<Apartment />} />
          <Route path="villa" element={<Villa />} />
          <Route path="penthouse" element={<PentHouse />} />
        </Route>

        <Route path="activity" element={<ActivityList />} />
        <Route path="author" element={<AuthorList />} />
        <Route path="books" element={<Books />} />
        <Route path="users" element={<UserList />} />
        <Route path="authusers" element={<AuthUsers/>}/>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Suspense>
  );
};

export default PageRouter;
