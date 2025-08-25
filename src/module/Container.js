import { lazy, Suspense } from "react";
import PageRouter from "../Router/index";
import Spin from "../components/LoadingSpinner/Spin"; // import your spinner

const Navbar = lazy(() => import("../Layout/Navbar/Navbar"));
const Footer = lazy(() => import("../Layout/Footer/Footer"));

const Container = () => {
  return (
    <div>
      <Suspense fallback={<Spin size={60} />}>
        <Navbar />
        <PageRouter />
        <Footer />
      </Suspense>
    </div> 
  );
};

export default Container; 
