import React from 'react';
import Button from "../Form/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from '@mui/material';
import "./TableStyle.scss";

const Table = React.memo(({ columns, data, page, pageSize, onEdit, onDelete, emptyMessage, loading }) => {
  return (
    <div className="activity_list">
      <table className="activity-table">
        <thead>
          <tr>
            <th>No</th>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody style={{ textAlign: "left" }}>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row.id}>
                <td>
                  {loading ? <Skeleton animation="wave" /> : (page - 1) * pageSize + index + 1}
                </td>

                {columns.map((col) => (
                  <td key={col.key}>
                    {loading ? (
                      <Skeleton animation="wave" />
                    ) : col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}

                <td className="actions">
                  {loading ? (
                    <Skeleton animation="wave" />
                  ) : (
                    <>
                      {onEdit && (
                        <Button onClick={() => onEdit(row)} variant="icon">
                          <FontAwesomeIcon icon="pencil" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button onClick={() => onDelete(row.id)} variant="icon">
                          <FontAwesomeIcon icon="trash" />
                        </Button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : !loading ? (
            <tr>
              <td colSpan={columns.length + 2} style={{ textAlign: "center", padding: "1rem" }}>
                {emptyMessage || "No records found"}
              </td>
            </tr>
          ) : (
            // show skeleton rows when no data but still loading
            Array.from(new Array(pageSize)).map((_, index) => (
              <tr key={`skeleton-${index}`}>
                <td><Skeleton animation="wave" /></td>
                {columns.map((col) => (
                  <td key={col.key}><Skeleton animation="wave" /></td>
                ))}
                <td><Skeleton animation="wave" /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default Table;














// import Button from "../Form/button/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Skeleton } from '@mui/material';
// import "./TableStyle.scss";

// const Table = ({ columns, data, page, pageSize, onEdit, onDelete, emptyMessage, loading  }) => {
//   return (
//     <div className="activity_list">
//       <table className="activity-table">
//         <thead>
//           <tr>
//             <th>No</th>
//             {columns.map((col) => (
//               <th key={col.key}>{col.label}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody style={{ textAlign: "left" }}> 
//           {data.length > 0 ? (
//             data.map((row, index) => (
//               <tr key={row.id}>
//                 <td>{(page - 1) * pageSize + index + 1}</td>
//                 {columns.map((col) => (
//                   <td key={col.key}>
//                     {col.render ? col.render(row[col.key], row) : row[col.key]}
//                   </td>
//                 ))}
//                 <td className="actions">
//                   {onEdit && (
//                     <Button onClick={() => onEdit(row)} variant="icon">
//                       <FontAwesomeIcon icon="pencil" />
//                     </Button>
//                   )}
//                   {onDelete && (
//                     <Button onClick={() => onDelete(row.id)} variant="icon">
//                       <FontAwesomeIcon icon="trash" />
//                     </Button>
//                   )} 
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length + 2} style={{ textAlign: "center", padding: "1rem" }}>
//                 {emptyMessage || "No records found"}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
