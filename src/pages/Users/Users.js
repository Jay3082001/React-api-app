import { useEffect, useState, useMemo } from "react";
import "../Users/Users.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserApproval from "../../Containers/UseraBindActions/UsersActionsApproval";
import Input from "../../components/Form/input/Input";
import Button from "../../components/Form/button/Button";
import { NAME_REGEX, PASSWORD_REGEX } from "../../helper/Regex";
import Pagination from "../../components/pagination/Pagination";
import Table from "../../components/table/Table";
import DeleteModel from "../../components/confirmModel/DeleteModel";
import PasswordInput from "../../components/Form/password/Password";

const UserList = ({ users = [], error, loadUsers, addUser, editUser, removeUser }) => {
  const [form, setForm] = useState({ id: null, userName: "", password: "" });
  const [uiState, setUiState] = useState({ search: "", page: 1 }); // merged search + page
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false); // saving state
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial load
  const [deleteState, setDeleteState] = useState({ target: null, deleting: false }); // merged deleteTarget + deleting

  const pageSize = 10;

  useEffect(() => {
    setInitialLoading(true);
    loadUsers()
      .finally(() => setInitialLoading(false));
  }, [loadUsers]);

  // Filter + search
  const filtered = useMemo(() => {
    if (!Array.isArray(users)) return [];
    if (!uiState.search.trim()) return users;
    return users.filter((u) =>
      u.userName?.toLowerCase().includes(uiState.search.toLowerCase())
    );
  }, [users, uiState.search]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (uiState.page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, uiState.page]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: null, userName: "", password: "" });
    setShowErrors(false);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (
      !form.userName.trim() ||
      !NAME_REGEX.test(form.userName) ||
      !form.password.trim() ||
      !PASSWORD_REGEX.test(form.password)
    ) {
      return;
    }

    const payload = { id: form.id || 0, userName: form.userName, password: form.password };

    setLoading(true);
    try {
      if (form.id) {
        await editUser(form.id, payload);
      } else {
        await addUser(payload);
      }
      resetForm();
      setUiState((prev) => ({ ...prev, page: 1 })); // back to first page
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (user) => {
    setForm({ ...user });
    setShowErrors(false);
  };

  // Delete
  const handleDelete = (id) => {
    setDeleteState({ target: id, deleting: false });
  };

  const confirmDelete = async () => {
    if (!deleteState.target) return;
    setDeleteState((prev) => ({ ...prev, deleting: true }));
    try {
      await removeUser(deleteState.target);
      if (form.id === deleteState.target) resetForm();
      setDeleteState({ target: null, deleting: false });
    } finally {
      setDeleteState((prev) => ({ ...prev, deleting: false }));
    }
  };

  const cancelDelete = () => {
    setDeleteState({ target: null, deleting: false });
  };

  return (
    <div className="activity-container">
      <h2>
        <FontAwesomeIcon icon={faUsers} /> User Manager
      </h2>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* SEARCH */}
      <div className="search-input-container" style={{ position: "relative", marginBottom: "10px" }}>
        <Input
          name="search"
          placeholder="Search by username..."
          value={uiState.search}
          onChange={(e) => setUiState((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
          className="search"
          style={{ paddingRight: "28px" }}
        />
        {uiState.search && (
          <FontAwesomeIcon
            icon="xmark"
            onClick={() => setUiState((prev) => ({ ...prev, search: "", page: 1 }))}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#888"
            }}
          />
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="Activity_form">
        <div className="forminput">
          <div className="input-group">
          <Input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            pattern={NAME_REGEX}
            errorMessage="Username must contain only letters and numbers"
            validate={showErrors}
          />
          </div>
          <div className="input-group">
          <PasswordInput
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            pattern={PASSWORD_REGEX}
            errorMessage="Password must have at least 1 uppercase, 1 lowercase, and 1 number"
            validate={showErrors}
            variant="usersPage"
          />
          </div>
        </div>

        <div className="change">
          <Button type="submit" disabled={loading} variant="primary">
            {form.id ? "Update" : "Add"}
            {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ marginLeft: "8px" }} />}
          </Button>
          {form.id && (
            <Button type="button" onClick={resetForm} variant="danger">
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <Table
        columns={[
          { key: "userName", label: "Username" },
          { key: "password", label: "Password" }
        ]}
        data={paginated}
        page={uiState.page}
        pageSize={pageSize}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No users found"
        loading={initialLoading}
      />

      {/* PAGINATION */}
      <Pagination
        page={uiState.page}
        totalPages={totalPages}
        onPageChange={(page) => setUiState((prev) => ({ ...prev, page }))}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteModel
        isOpen={!!deleteState.target}
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteState.deleting}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default UserApproval(UserList);









// Load users on mount
  // useEffect(() => {
  //   loadUsers();
  // }, [loadUsers]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setInitialLoading(true);
  //     try {
  //       await loadUsers();
  //     } finally {
  //       setInitialLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [loadUsers]);

// import { useEffect, useState, useMemo, useCallback } from "react";
// import "../Users/Users.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUsers, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import UserApproval from "../../Containers/UseraBindActions/UsersActionsApproval";
// import Input from "../../components/Form/input/Input";
// import Button from "../../components/Form/button/Button";
// import { NAME_REGEX, PASSWORD_REGEX } from "../../helper/Regex";
// import Pagination from "../../components/pagination/Pagination";
// import Table from "../../components/table/Table";
// import DeleteModel from '../../components/confirmModel/DeleteModel'
// import PasswordInput from "../../components/Form/password/Password";

// const UserList = ({ users, error, loadUsers, addUser, editUser, removeUser }) => {
//   const [form, setForm] = useState({ id: null, userName: "", password: "" });
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [showErrors, setShowErrors] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const pageSize = 10;
//   // const [showPassword, setShowPassword] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Load users on mount
//   useEffect(() => {
//     loadUsers();
//   }, [loadUsers]);

//   // Filter + search
//   const filtered = useMemo(() => {
//     let result = Array.isArray(users) ? [...users] : [];
//     if (search) {
//       result = result.filter((u) =>
//         u.userName?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     return result;
//   }, [users, search]);

//   // Pagination
//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page, pageSize]);

//   const totalPages = Math.ceil(filtered.length / pageSize) || 1;

//   // Form change
//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   },[]);

//   // Submit (Add / Update)
//   const handleSubmit =  async (e) => {
//     e.preventDefault();
//     setShowErrors(true);

//     if (
//       !form.userName.trim() ||
//       !NAME_REGEX.test(form.userName) ||
//       !form.password.trim() ||
//       !PASSWORD_REGEX.test(form.password)
//     ) {
//       return;
//     }

//     const payload = {
//       id: form.id ? Number(form.id) : 0,
//       userName: form.userName,
//       password: form.password,
//     };

//     setSaving(true);

//     try {
//       if (form.id) {
//         await editUser(form.id, payload);
//       } else {
//         await addUser(payload);
//       }
//       resetForm();
//       setPage(1);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = useCallback((user) => {
//     setForm({ ...user });
//     setShowErrors(false);
//   },[]);

//   // Show modal instead of immediate delete
//   const handleDelete = useCallback((id) => {
//     setDeleteTarget(id);
//   },[]);

//   const confirmDelete = useCallback(async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await removeUser(deleteTarget);
//       if (form.id === deleteTarget) resetForm();
//       setDeleteTarget(null);
//     } finally {
//       setDeleting(false);
//     }
//   },[deleteTarget, removeUser, form.id]);

//   const cancelDelete = useCallback(() => {
//     setDeleteTarget(null);
//   },[]);

//   const resetForm = useCallback(() => {
//     setForm({ id: null, userName: "", password: "" });
//     setShowErrors(false);
//   },[]);

//   return (
//     <div className="activity-container">
//       <h2>
//         <FontAwesomeIcon icon={faUsers} /> User Manager
//       </h2>
//       <br />

//       {/* SEARCH */}
//       <div className="search-input-container" style={{ position: 'relative', marginBottom: '10px' }}>
//         <Input
//           name="search"
//           placeholder="Search by username..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search"
//           style={{ paddingRight: '28px' }}
//         />
//         {search && (
//           <FontAwesomeIcon
//             icon="xmark"
//             onClick={() => setSearch('')}
//             style={{
//               position: 'absolute',
//               right: '8px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               cursor: 'pointer',
//               color: '#888',
//               pointerEvents: 'auto'
//             }}
//           />
//         )}
//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="Activity_form">
//         <div className="forminput">
//           <div className="input-group">
//             <Input
//               type="text"
//               name="userName"
//               placeholder="Username"
//               value={form.userName}
//               onChange={handleChange}
//               pattern={NAME_REGEX}
//               errorMessage="Username must contain only letters and numbers"
//               validate={showErrors}
//             />
//           </div>

//         <div className="input-group">
//           <PasswordInput
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             pattern={PASSWORD_REGEX}
//             errorMessage="Password must have at least 1 uppercase, 1 lowercase, and 1 number"
//             validate={showErrors}
//             variant = "usersPage" 
//           />
//         </div>  

//         </div>

//         <div className="change">
//           <Button type="submit" disabled={saving} variant="primary">
//             {form.id ? "Update" : "Add"}
//             {saving && (
//               <FontAwesomeIcon icon={faSpinner} spin style={{ marginLeft: "8px" }} />
//             )}
//           </Button>
//           {form.id && (
//             <Button type="button" onClick={resetForm} variant="danger">
//               Cancel
//             </Button>
//           )}
//         </div>
//       </form>

//       {/* TABLE */}
//       <Table
//         columns={[
//           { key: "userName", label: "Username" },
//           { key: "password", label: "Password" },
//         ]}
//         data={paginated}
//         page={page}
//         pageSize={pageSize}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         emptyMessage="No users found"
//       />

//       {/* PAGINATION */}
//       <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

//       {/* ERROR */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

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

// export default UserApproval(UserList);
















// Submit (Add / Update)
// const handleSubmit = useCallback(async (e) => {
//   e.preventDefault();
//   setShowErrors(true);

//   if (
//     !form.userName.trim() ||
//     !NAME_REGEX.test(form.userName) ||
//     !form.password.trim() ||
//     !PASSWORD_REGEX.test(form.password)
//   ) {
//     return;
//   }

//   const payload = {
//     id: form.id ? Number(form.id) : 0,
//     userName: form.userName,
//     password: form.password,
//   };

//   setSaving(true);

//   try {
//     if (form.id) {
//       await editUser(form.id, payload);
//     } else {
//       await addUser(payload);
//     }
//     resetForm();
//     setPage(1);
//   } finally {
//     setSaving(false);
//   }
// }, [form, editUser, addUser, resetForm, setPage]);
