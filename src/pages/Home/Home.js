import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';

const PropertyHome = lazy(() => import('./lib/PropertiesHome'));

const Home = () => {
  return (
    <div style={{minHeight:"100vh"}}>
      <Suspense fallback={<div>Loading...</div>}>
        <PropertyHome />
        <Outlet/>
      </Suspense>
    </div>
  );
};

export default Home; 













// import Features from '../../components/Home_components/Features';
// import Video from '../../components/Home_components/Video';
// import Facts from '../../components/Home_components/Facts';
// import Footer from '../../components/Footer';
// import Contacthome from '../../components/Home_components/Contacthome';
// import Coursalantd from '../../components/Home_components/Coursalantd';
// import PropertydetailsHome from '../../components/Home_components/PropertydetailsHome';
// import PropertyHome from '../../components/Home_components/PropertiesHome';

// const Home = () => {
//   return (
//     <div>

//       <Coursalantd/>
//       <Features/>
//       <Video/>
//       <Facts/>
//       <PropertydetailsHome/>
//       <PropertyHome/>
//       <Contacthome/>
//       <Footer/>

//     </div>
//   )
// }

// export default Home