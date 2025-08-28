import { useEffect, useState, useMemo } from 'react';
import './author.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthorApproval from '../../Containers/AuthorBindActions/AuthorActionApproval';
import Input from '../../components/Form/input/Input';
import Button from '../../components/Form/button/Button';
import { NAME_REGEX, BOOK_ID_REGEX } from '../../helper/Regex';
import Pagination from '../../components/pagination/Pagination';
import Table from '../../components/table/Table';
import DeleteModel from '../../components/confirmModel/DeleteModel';

const AuthorList = ({ authors = [], loadAuthors, addAuthor, editAuthor, removeAuthor }) => {
  const { read } = require('../../helper/AccessModeContext').useAccessMode();
  const [form, setForm] = useState({ id: null, idBook: '', firstName: '', lastName: '' });
  const [uiState, setUiState] = useState({ search: '', page: 1 }); // merged search + page
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial load
  const [deleteState, setDeleteState] = useState({ target: null, deleting: false }); // merged deleteTarget + deleting
  const pageSize = 10;

  // Load authors on mount 
  // useEffect(() => {
  //   loadAuthors();
  // }, [loadAuthors]);

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        await loadAuthors();
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [loadAuthors]);

  // Filter authors
  const filtered = useMemo(() => {
    let result = Array.isArray(authors) ? [...authors] : [];
    if (uiState.search.trim()) {
      result = result.filter((a) =>
        `${a.firstName} ${a.lastName}`.toLowerCase().includes(uiState.search.toLowerCase())
      );
    }
    return result;
  }, [authors, uiState.search]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (uiState.page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, uiState.page, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (
      !String(form.idBook).trim() ||
      !BOOK_ID_REGEX.test(String(form.idBook)) ||
      !form.firstName.trim() ||
      !NAME_REGEX.test(form.firstName) ||
      !form.lastName.trim() ||
      !NAME_REGEX.test(form.lastName)
    ) {
      return;
    }

    const payload = {
      id: form.id ? Number(form.id) : 0,
      idBook: Number(form.idBook),
      firstName: form.firstName,
      lastName: form.lastName,
    };

    setLoading(true);
    try {
      if (form.id) {
        await editAuthor(form.id, payload);
      } else {
        await addAuthor(payload);
      }
      resetForm();
      setUiState((prev) => ({ ...prev, page: 1 })); // reset to first page
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (author) => {
    setForm({ ...author });
    setShowErrors(false);
  };

  // Show modal instead of immediate delete
  const handleDelete = (id) => {
    setDeleteState({ target: id, deleting: false });
  };

  const confirmDelete = async () => {
    if (!deleteState.target) return;
    setDeleteState((prev) => ({ ...prev, deleting: true }));
    try {
      await removeAuthor(deleteState.target);
      if (form.id === deleteState.target) resetForm();
      setDeleteState({ target: null, deleting: false });
    } finally {
      setDeleteState((prev) => ({ ...prev, deleting: false }));
    }
  };

  const cancelDelete = () => {
    setDeleteState({ target: null, deleting: false });
  };

  const resetForm = () => {
    setForm({ id: null, idBook: '', firstName: '', lastName: '' });
    setShowErrors(false);
  };

  return (
    <div className="author-container">
      <h2>
        <FontAwesomeIcon icon="people-roof" /> Author Manager
      </h2>

      {/* SEARCH */}
      <div className="search-input-container" style={{ position: 'relative', marginBottom: '10px' }}>
        <Input
          name="search"
          placeholder="Search by name..."
          value={uiState.search}
          onChange={(e) => setUiState((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
          className="search-input"
          style={{ paddingRight: '28px' }}
        />
        {uiState.search && (
          <FontAwesomeIcon
            icon="xmark"
            onClick={() => setUiState((prev) => ({ ...prev, search: '', page: 1 }))}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888',
              pointerEvents: 'auto'
            }}
          />
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="author-form">
        <div className="input_wrapper">
          <Input
            type="number"
            name="idBook"
            placeholder="Book ID"
            value={form.idBook}
            onChange={handleChange}
            pattern={BOOK_ID_REGEX}
            errorMessage="Book ID must be digits"
            validate={showErrors}
          />
        </div>

        <div className="input_wrapper">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            pattern={NAME_REGEX}
            errorMessage="First name must be at least 3 letters"
            validate={showErrors}
          />
        </div>

        <div className="input_wrapper">
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            pattern={NAME_REGEX}
            errorMessage="Last name must be at least 3 letters"
            validate={showErrors}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
          <Button type="submit" className="submit-btn" disabled={loading || read}>
            {form.id ? 'Update' : 'Add'}
            {loading && <FontAwesomeIcon icon="spinner" spin style={{ marginLeft: '8px' }} />}
          </Button>
          {form.id && (
            <Button type="button" className="cancel-btn" onClick={resetForm} variant="danger" disabled={read}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <Table
        data={paginated}
        page={uiState.page}
        pageSize={pageSize}
        onEdit={read ? undefined : handleEdit}
        onDelete={read ? undefined : handleDelete}
        actions={!read}
        emptyMessage="No authors found"
        columns={[
          { key: "idBook", label: "Book ID" },
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" }
        ]}
        loading={initialLoading}
      />

      {/* PAGINATION */}
      <Pagination page={uiState.page} totalPages={totalPages} onPageChange={(page) => setUiState((prev) => ({ ...prev, page }))} />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteModel
        isOpen={!!deleteState.target}
        message="Are you sure you want to delete this author?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteState.deleting}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default AuthorApproval(AuthorList);






















// import { useEffect, useState, useMemo } from 'react';
// import './author.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import AuthorApproval from '../../Containers/AuthorBindActions/AuthorActionApproval';
// import Input from '../../components/Form/input/Input';
// import Button from '../../components/Form/button/Button';
// import { NAME_REGEX, BOOK_ID_REGEX } from '../../helper/Regex';
// import Pagination from '../../components/pagination/Pagination';
// import Table from '../../components/table/Table';
// import DeleteModel from '../../components/confirmModel/DeleteModel';

// const AuthorList = ({ authors = [], loadAuthors, addAuthor, editAuthor, removeAuthor }) => {
//   const [form, setForm] = useState({ id: null, idBook: '', firstName: '', lastName: '' });
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [showErrors, setShowErrors] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const pageSize = 10;
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Load authors on mount
//   useEffect(() => {
//     loadAuthors(); 
//   }, [loadAuthors]);

//   // Filter authors
//   const filtered = useMemo(() => {
//     let result = Array.isArray(authors) ? [...authors] : [];
//     if (search.trim()) {
//       result = result.filter((a) =>
//         `${a.firstName} ${a.lastName}`.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     return result;
//   }, [authors, search]);

//   // Pagination
//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page, pageSize]);

//   const totalPages = Math.ceil(filtered.length / pageSize) || 1;

//   // Form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true);

//     if (
//       !String(form.idBook).trim() ||
//       !BOOK_ID_REGEX.test(String(form.idBook)) ||
//       !form.firstName.trim() ||
//       !NAME_REGEX.test(form.firstName) ||
//       !form.lastName.trim() ||
//       !NAME_REGEX.test(form.lastName)
//     ) {
//       return;
//     }

//     const payload = {
//       id: form.id ? Number(form.id) : 0,
//       idBook: Number(form.idBook),
//       firstName: form.firstName,
//       lastName: form.lastName,
//     };

//     setLoading(true);
//     try {
//       if (form.id) {
//         await editAuthor(form.id, payload);
//       } else {
//         await addAuthor(payload);
//       }
//       resetForm();
//       setPage(1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (author) => {
//     setForm({ ...author });
//     setShowErrors(false);
//   };

//   // const handleDelete = (id) => {
//   //   removeAuthor(id);
//   //   if (form.id === id) resetForm();
//   // };

//   // Show modal instead of immediate delete
//   const handleDelete = (id) => {
//     setDeleteTarget(id);
//   };

//   const confirmDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await removeAuthor(deleteTarget);
//       if (form.id === deleteTarget) resetForm();
//       setDeleteTarget(null);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const cancelDelete = () => {
//     setDeleteTarget(null);
//   };

//   const resetForm = () => {
//     setForm({ id: null, idBook: '', firstName: '', lastName: '' });
//     setShowErrors(false);
//   };

//   return (
//     <div className="author-container">
//       <h2>
//         <FontAwesomeIcon icon="people-roof" /> Author Manager
//       </h2>

//       {/* SEARCH */}
//       <div className="search-input-container" style={{ position: 'relative', marginBottom: '10px'  }}>
//           <Input
//             name="search"
//             placeholder="Search by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search-input"
//             style={{ paddingRight: '28px'}}
//           />
//           {search && (
//             <FontAwesomeIcon
//               icon="xmark"
//               onClick={() => setSearch('')}
//               style={{
//                 position: 'absolute',
//                 right: '8px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 cursor: 'pointer',
//                 color: '#888',
//                 pointerEvents: 'auto'
//               }}
//             />
//           )}
//         </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="author-form">
//         <div className="input_wrapper">
//           <Input
//             type="number"
//             name="idBook"
//             placeholder="Book ID"
//             value={form.idBook}
//             onChange={handleChange}
//             pattern={BOOK_ID_REGEX}
//             errorMessage="Book ID must be digits"
//             validate={showErrors}
//           />
//         </div>

//         <div className="input_wrapper">
//           <Input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={form.firstName}
//             onChange={handleChange}
//             pattern={NAME_REGEX}
//             errorMessage="First name must be at least 3 letters"
//             validate={showErrors}
//           />
//         </div>

//         <div className="input_wrapper">
//           <Input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={form.lastName}
//             onChange={handleChange}
//             pattern={NAME_REGEX}
//             errorMessage="Last name must be at least 3 letters"
//             validate={showErrors}
//           />
//         </div>

//         <div style={{display:'flex',alignItems:'flex-start',gap:'5px'}}>
//           <Button type="submit" className="submit-btn" disabled={loading}>
//             {form.id ? 'Update' : 'Add'}
//             {loading && <FontAwesomeIcon icon="spinner" spin style={{ marginLeft: '8px' }} />}
//           </Button>
//           {form.id && (
//             <Button type="button" className="cancel-btn" onClick={resetForm} variant="danger">
//               Cancel
//             </Button>
//           )}
//         </div>
//       </form>

//       {/* TABLE */}
//       <Table
//         data={paginated}
//         page={page}
//         pageSize={pageSize}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         emptyMessage="No authors found"
//         columns={[
//           { key: "idBook", label: "Book ID" },
//           { key: "firstName", label: "First Name" },
//           { key: "lastName", label: "Last Name" }
//         ]}
//       />

//       {/* PAGINATION */}
//       <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

//       {/* DELETE CONFIRMATION MODAL */}
//       <DeleteModel
//         isOpen={!!deleteTarget}
//         message="Are you sure you want to delete this activity?"
//         onConfirm={confirmDelete}
//         onCancel={cancelDelete}
//         loading={deleting}
//         confirmText="Yes"
//         cancelText="No"
//       />

//     </div>
//   );
// };

// export default AuthorApproval(AuthorList);