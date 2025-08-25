import { useEffect, useState, useMemo } from 'react';
import './Activity.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActivityApproval from '../../Containers/ActivitybindActions/ActivityActionApproval';
import Input from '../../components/Form/input/Input';
import Button from '../../components/Form/button/Button';
import { NAME_REGEX, DATE_REGEX } from '../../helper/Regex';
import Pagination from '../../components/pagination/Pagination';
import Checkbox from '../../components/Form/checkbox/CheckBox';
import Select from '../../components/Form/select/Select';
import DateTimePicker from '../../components/Form/datetimepicker/Date';
import Table from '../../components/table/Table';
import DeleteModel from '../../components/confirmModel/DeleteModel';

const ActivityList = ({
  activities = [], 
  error,
  loadActivities,
  addActivity,
  editActivity,
  removeActivity,
}) => {
  const [filter, setFilter] = useState({ filter: "all", search: "" }); // merged search & filter
  const [form, setForm] = useState({ id: null, title: '', dueDate: '', completed: false });
  const [page, setPage] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial load
  const [deleteState, setDeleteState] = useState({ isDeleting: false, target: null });
  const pageSize = 10;

  // Load activities on mount
  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        await loadActivities();
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [loadActivities]);

  // Filter & Search
  const filtered = useMemo(() => {
    let result = Array.isArray(activities) ? [...activities] : [];

    if (filter.filter === "completed") {
      result = result.filter((a) => a.completed);
    } else if (filter.filter === "incomplete") {
      result = result.filter((a) => !a.completed);
    }

    if (filter.search) {
      result = result.filter((a) =>
        a.title?.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    return result;
  }, [activities, filter]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  // Form handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (
      !form.title.trim() ||
      !NAME_REGEX.test(form.title) ||
      !form.dueDate.trim() ||
      !DATE_REGEX.test(form.dueDate)
    ) {
      return;
    }

    const payload = {
      id: form.id ? Number(form.id) : 0,
      title: form.title,
      dueDate: new Date(form.dueDate).toISOString(),
      completed: Boolean(form.completed),
    };

    setLoading(true);

    try {
      if (form.id) {
        await editActivity(form.id, payload);
      } else {
        await addActivity(payload);
      }
      resetForm();
      setPage(1); // show newest immediately
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity) => {
    setForm({
      ...activity,
      dueDate: activity.dueDate
        ? new Date(activity.dueDate).toISOString().slice(0, 16)
        : '',
    });
    setShowErrors(false);
  };

  // Delete flow
  const handleDelete = (id) => {
    setDeleteState({ isDeleting: false, target: id });
  };

  const confirmDelete = async () => {
    if (!deleteState.target) return;
    setDeleteState((prev) => ({ ...prev, isDeleting: true }));
    try {
      await removeActivity(deleteState.target);
      if (form.id === deleteState.target) resetForm();
      setDeleteState({ isDeleting: false, target: null });
    } finally {
      setDeleteState((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const cancelDelete = () => {
    setDeleteState({ isDeleting: false, target: null });
  };

  const resetForm = () => {
    setForm({ id: null, title: '', dueDate: '', completed: false });
    setShowErrors(false);
  };

  return (
    <div className="activity-container">
      <h2><FontAwesomeIcon icon="list-check" /> Activity Manager</h2> <br />

      {/* FILTERS */}
      <div className="filters">
        <label>Search Activity : </label>
        <div>
          <Select
            value={filter.filter}
            onChange={(e) => setFilter((prev) => ({ ...prev, filter: e.target.value }))}
            options={[
              { value: "all", label: "All" },
              { value: "completed", label: "Completed" },
              { value: "incomplete", label: "Incomplete" }
            ]}
          />
        </div>
        <div className="search-input-container" style={{ position: 'relative', width: '250px' }}>
          <Input
            name="search"
            placeholder="Search by title..."
            value={filter.search}
            onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
            className="search"
            style={{ paddingRight: '28px' }}
          />
          {filter.search && (
            <FontAwesomeIcon
              icon="xmark"
              onClick={() => setFilter((prev) => ({ ...prev, search: '' }))}
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
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="Activity_form">
        <div className="forminput">
          <div className="input-group">
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              pattern={NAME_REGEX}
              errorMessage="Title must contain only letters and numbers"
              validate={showErrors}
            />
          </div>

          <div className="input-group">
            <DateTimePicker
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              pattern={DATE_REGEX}
              errorMessage="Invalid date format"
              validate={showErrors}
            />
          </div>

          <div className="check-group">
          <Checkbox
            name="completed"
            checked={form.completed}
            onChange={handleChange}
            label="Completed"
          />
          </div>
        </div>
        <div className="change">
          <Button type="submit" style={{ marginLeft: '10px' }} disabled={loading} variant="primary">
            {form.id ? 'Update' : 'Add'}
            {loading && (<FontAwesomeIcon icon="spinner" spin style={{ marginLeft: '8px' }} />)}
          </Button>
          {form.id && (
            <Button type="button" onClick={resetForm} variant="danger">
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* LIST */}
      <Table
        columns={[
          { key: "title", label: "Title" },
          { key: "dueDate", label: "Due Date", render: (val) => (val ? new Date(val).toLocaleString() : "N/A") },
          { key: "completed", label: "Status", render: (val) => (val ? "Completed" : "Incomplete") }
        ]}
        data={paginated}
        page={page}
        pageSize={pageSize}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No activities found"
        loading={initialLoading}
      />

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteModel
        isOpen={!!deleteState.target}
        message="Are you sure you want to delete this activity?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteState.isDeleting}
        confirmText="Yes"
        cancelText="No"
      />

      {/* ERROR */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ActivityApproval(ActivityList);

































// import { useEffect, useState, useMemo } from 'react';
// import './Activity.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ActivityApproval from '../../Containers/ActivitybindActions/ActivityActionApproval';
// import Input from '../../components/Form/input/Input';
// import Button from '../../components/Form/button/Button';
// import { NAME_REGEX, DATE_REGEX } from '../../helper/Regex';
// import Pagination from '../../components/pagination/Pagination';
// import Checkbox from '../../components/Form/checkbox/CheckBox';
// import Select from '../../components/Form/select/Select';
// import DateTimePicker from '../../components/Form/datetimepicker/Date';
// import Table from '../../components/table/Table';
// import DeleteModel from '../../components/confirmModel/DeleteModel';

// const ActivityList = ({
//   activities = [],
//   error,
//   loadActivities,
//   addActivity,
//   editActivity,
//   removeActivity,
// }) => {
//   const [filter, setFilter] = useState('all');
//   const [form, setForm] = useState({ id: null, title: '', dueDate: '', completed: false });
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [showErrors, setShowErrors] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const pageSize = 10;

//   // Load activities on mount
//   useEffect(() => {
//     loadActivities();
//   }, [loadActivities]);

//   // Filter & Search
//   const filtered = useMemo(() => {
//     let result = Array.isArray(activities) ? [...activities] : [];
//     if (filter === 'completed') result = result.filter((a) => a.completed);
//     else if (filter === 'incomplete') result = result.filter((a) => !a.completed);
//     if (search) {
//       result = result.filter((a) =>
//         a.title?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     return result;
//   }, [activities, filter, search]);

//   // Pagination
//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page, pageSize]);

//   const totalPages = Math.ceil(filtered.length / pageSize) || 1;

//   // Form handlers
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true);

//     if (
//       !form.title.trim() ||
//       !NAME_REGEX.test(form.title) ||
//       !form.dueDate.trim() ||
//       !DATE_REGEX.test(form.dueDate)
//     ) {
//       return;
//     }

//     const payload = {
//       id: form.id ? Number(form.id) : 0,
//       title: form.title,
//       dueDate: new Date(form.dueDate).toISOString(),
//       completed: Boolean(form.completed),
//     };

//     setLoading(true);

//     try {
//       if (form.id) {
//         await editActivity(form.id, payload);
//       } else {
//         await addActivity(payload);
//       }
//       resetForm();
//       setPage(1); // show newest immediately
//     } finally {
//       setLoading(false); // stop spinner
//     }
//   };

//   const handleEdit = (activity) => {
//     setForm({
//       ...activity,
//       dueDate: activity.dueDate
//         ? new Date(activity.dueDate).toISOString().slice(0, 16)
//         : '',
//     });
//     setShowErrors(false);
//   };

//   // const handleDelete = (id) => {
//   //   removeActivity(id);
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
//       await removeActivity(deleteTarget);
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
//     setForm({ id: null, title: '', dueDate: '', completed: false });
//     setShowErrors(false);
//   };

//   return (
//     <div className="activity-container">
//       <h2><FontAwesomeIcon icon="list-check" /> Activity Manager</h2> <br />

//       {/* FILTERS */}
//       <div className="filters">
//         <label>Search Activity : </label>
//         <div>
//         <Select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           options={[
//             { value: "all", label: "All" },
//             { value: "completed", label: "Completed" },
//             { value: "incomplete", label: "Incomplete" }
//           ]}
//         />
//         </div>
//         <div className="search-input-container" style={{ position: 'relative', width: '250px' }}>
//           <Input
//             name="search"
//             placeholder="Search by title..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search"
//             style={{ paddingRight: '28px' }}
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

//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="Activity_form">
//         <div className="forminput">
//           <div className="input-group">
//             <Input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={form.title}
//               onChange={handleChange}
//               pattern={NAME_REGEX}
//               errorMessage="Title must contain only letters and numbers"
//               validate={showErrors}
//             />
//           </div>

//           <div className="input-group">
//             <DateTimePicker
//               name="dueDate"
//               value={form.dueDate}
//               onChange={handleChange}
//               pattern={DATE_REGEX}
//               errorMessage="Invalid date format"
//               validate={showErrors}
//             />
//           </div>

//           <Checkbox
//             name="completed"
//             checked={form.completed}
//             onChange={handleChange}
//             label="Completed"
//           />

//         </div>
//         <div className="change">
//           <Button type="submit" style={{ marginLeft: '10px' }} disabled={loading} variant="primary">
//             {form.id ? 'Update' : 'Add'}
//             {loading && (<FontAwesomeIcon icon="spinner" spin style={{ marginLeft: '8px' }} />)}
//           </Button>
//           {form.id && (
//             <Button type="button" onClick={resetForm} variant="danger">
//               Cancel
//             </Button>
//           )}
//         </div>
//       </form>

//       {/* LIST */}
//       <Table
//         columns={[
//           { key: "title", label: "Title" },
//           { key: "dueDate", label: "Due Date", render: (val) => (val ? new Date(val).toLocaleString() : "N/A") },
//           { key: "completed", label: "Status", render: (val) => (val ? "Completed" : "Incomplete") }
//         ]}
//         data={paginated}
//         page={page}
//         pageSize={pageSize}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         emptyMessage="No activities found"
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


//       {/* ERROR */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default ActivityApproval(ActivityList);