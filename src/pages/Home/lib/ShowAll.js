import { useState, useEffect } from "react";
import Box from "../../../components/PropertyInfoBox/Box";
import { propertiesData } from "../../../helper/FakeData";

const ShowAll = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []); 

  return (
    <div>
      <div className='properties'>
        <div className='properties_main'> 
          {loading
            ? Array.from(new Array(6)).map((_, i) => (
                <Box key={i} loading={true} />
              ))
            : propertiesData.map((property) => (
                <Box key={property.id} data={property} loading={false} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAll;









// import Box from "../../../components/PropertyInfoBox/Box";
// import { propertiesData } from "../../../helper/FakeData";

// const ShowAll = () => {
//     return (
//         <div>
//             <div className='properties'>
//                 <div className='properties_main'>
//                     {propertiesData.map((property) => (
//                         <Box key={property.id} data={property} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ShowAll;
