import { useState, useEffect } from "react";
import Box from "../../../components/PropertyInfoBox/Box";
import { propertiesData } from "../../../helper/FakeData";
import { PropertiesHome } from "./IndexStyle";
import '../../../components/PropertyInfoBox/boxstyle.scss';
import { Tabs } from "antd";
import { Link } from "react-router";
import { Skeleton } from "@mui/material";

const { TabPane } = Tabs;

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <PropertiesHome>
        <div className="properties_title_home">
          {loading ? (
            <>
              <Skeleton variant="text" width={120} height={20} /> {/* | Properties */}
              <Skeleton variant="text" width={300} height={40} /> {/* Big Title */}
            </>
          ) : (
            <>
              <h6>| Properties</h6>
              <h2>We Provide The Best Property You Like</h2>
            </>
          )}

          {/* Tabs */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
              {Array.from(new Array(4)).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width={100} height={30} />
              ))}
            </div>
          ) : (
            <Tabs defaultActiveKey="all" centered>
              <TabPane tab={<Link to="/container/home" className="links">Show All</Link>} key="all" />
              <TabPane tab={<Link to="/container/home/apartment" className="links">Apartment</Link>} key="apartment" />
              <TabPane tab={<Link to="/container/home/villa" className="links">Villa</Link>} key="villa" />
              <TabPane tab={<Link to="/container/home/penthouse" className="links">PentHouse</Link>} key="penthouse" />
            </Tabs>
          )} 
        </div>
      </PropertiesHome>
    </div>
  );
};

export default Home;




// import Box from "../../../components/PropertyInfoBox/Box";
// import { propertiesData } from "../../../helper/FakeData";
// import { PropertiesHome } from "./IndexStyle";
// import '../../../components/PropertyInfoBox/boxstyle.scss';
// import { Tabs } from "antd";
// import { Link } from "react-router";
// import { Skeleton } from '@mui/material';

// const { TabPane } = Tabs;

// const Home = () => {
//   return (
//     <div>
//       <PropertiesHome>
//         <div className='properties_title_home'>
//           <h6>| Properties</h6>
//           <h2>We Provide The Best Property You Like</h2> 

//           {/* Ant Design Tabs */}
//           <Tabs defaultActiveKey="all" centered>
//             <TabPane tab={<Link to="/container/home" className="links">Show All</Link>} key="all" />
//             <TabPane tab={<Link to="/container/home/apartment" className="links">Apartment</Link>} key="apartment" />
//             <TabPane tab={<Link to="/container/home/villa" className="links">Villa</Link>} key="villa" />
//             <TabPane tab={<Link to="/container/home/penthouse" className="links">PentHouse</Link>} key="penthouse" />
//           </Tabs>
//         </div>
//       </PropertiesHome>
//     </div>
//   );
// };

// export default Home;








// import Box from "../../../components/PropertyInfoBox/Box";
// import { propertiesData } from "../../../helper/FakeData";
// import { PropertiesHome } from "./IndexStyle";
// import '../../../components/PropertyInfoBox/boxstyle.scss';
// import { Link } from "react-router"; 

// const Home = () => {

//   return (
//     <div>
//       <PropertiesHome>
//         <div className='properties_title_home'>
//           <h6>| Properties</h6>
//           <h2>We Provide The Best Property You Like</h2> 
//           <ul className="p-links">
//             <li><Link to="/container/home">Show All</Link></li>
//             <li><Link to="/container/home/apartment">Apartment</Link></li>
//             <li><Link to="/container/home/villa">Villa</Link></li>
//             <li><Link to="/container/home/penthouse">PentHouse</Link></li>
//           </ul>
//         </div>
//       </PropertiesHome> 
//     </div>
//   );
// };

// export default Home;









// const Home = () => {
//   return (
//     <div>

//       <PropertiesHome>
//         <div className='properties_title_home'>
//           <h6>| Properties</h6>
//           <h2>We Provide The Best Property You Like</h2> 
//         </div>
//         <Box data={propertiesData}/> 
//       </PropertiesHome> 
        
//     </div> 
//   );
// };

// export default Home;  