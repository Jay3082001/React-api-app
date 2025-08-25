import Box from "../../../components/PropertyInfoBox/Box";
import { propertiesData } from "../../../helper/FakeData";
import { useState, useEffect } from "react";

const Apartment = () => {
  const [loading, setLoading] = useState(true);
    
      // Simulate API delay
      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);

  const villaData = propertiesData.filter(
    (property) => property.category === "Luxury Villa"
  );
  
  return (
    <div>
      <div className='properties'>
        <div className='properties_main'>
          {loading
            ? Array.from(new Array(6)).map((_, i) => (
                <Box key={i} loading={true} />
              ))
            : villaData.map((property) => (
                <Box key={property.id} data={property} loading={false} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default Apartment