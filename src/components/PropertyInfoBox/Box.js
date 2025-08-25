import { Skeleton } from "@mui/material";
import './boxstyle.scss';

const Box = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="properti_box">
        <Skeleton variant="rectangular" width="100%" height={180} style={{ borderRadius: 8 }} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" width={120} height={35} style={{ marginTop: 10 }} />
      </div>
    );
  }

  return (
    <div className="properti_box" key={data.id}>
      <a href="#"> 
        <img src={data.imgSrc} alt={data.category} />
      </a>
      <span className="catagory">{data.category}</span>
      <h6>{data.price}</h6>
      <h4>{data.address}</h4>

      <ul>
        {data.displayinfo.map((label, index) => (
          <li key={index}>
            {label.name}: <span>{label.value}</span>
          </li>
        ))}
      </ul>

      <div className="sch_btn">
        <a href="#">Schedule Plan</a>
      </div>
    </div>
  );
};

export default Box;







// import './boxstyle.scss';

// const Box = ({ data }) => {
//   return (
//     <div className='properti_box' key={data.id}>
//       <a href='#'>
//         <img src={data.imgSrc} alt={data.category} />
//       </a>
//       <span className='catagory'>{data.category}</span>
//       <h6>{data.price}</h6>
//       <h4>{data.address}</h4>

//       <ul>
//         {data.displayinfo.map((label) => ( 
//           <li>
//             {label.name} : <span>{label.value}</span>
//           </li>
//         ))}
//       </ul>

//       <div className='sch_btn'>
//         <a href='#'>Schedule Plan</a> 
//       </div> 
//     </div>
//   ); 
// };

// export default Box;