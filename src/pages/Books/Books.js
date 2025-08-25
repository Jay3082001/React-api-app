import { useEffect, useState, useMemo } from "react";
import "./Books.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BooksApproval from "../../Containers/BooksBindActions/BooksActionApproval";
import Input from "../../components/Form/input/Input";
import Button from "../../components/Form/button/Button";
import DateTimePicker from "../../components/Form/datetimepicker/Date";
import { TITLE_REGEX, PAGECOUNT_REGEX, DATE_REGEX, DESC_REGEX } from "../../helper/Regex";
import Pagination from "../../components/pagination/Pagination";
import DeleteModel from "../../components/confirmModel/DeleteModel";
import { Skeleton } from "@mui/material";

const Books = ({ books = [], error, loadBooks, addBook, editBook, removeBook }) => {
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    pageCount: "",
    excerpt: "",
    publishDate: ""
  });

  const [uiState, setUiState] = useState({ search: "", page: 1 }); // merged search + page
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false); // saving
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [deleteState, setDeleteState] = useState({ target: null, deleting: false }); // merged deleteTarget + deleting

  const pageSize = 10;

  // Load books on mount
   useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        await loadBooks();
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, [loadBooks]);

  // Filtered + Search (memoized)
  const filtered = useMemo(() => {
    let result = Array.isArray(books) ? [...books] : [];
    if (uiState.search.trim()) {
      result = result.filter((b) =>
        b.title?.toLowerCase().includes(uiState.search.toLowerCase())
      );
    }
    return result;
  }, [books, uiState.search]);

  // Pagination (memoized)
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
      !form.title.trim() ||
      !TITLE_REGEX.test(form.title) ||
      !form.description.trim() ||
      !DESC_REGEX.test(form.description) ||
      !form.pageCount ||
      !PAGECOUNT_REGEX.test(form.pageCount) ||
      !form.excerpt.trim() ||
      !DESC_REGEX.test(form.excerpt) ||
      !form.publishDate.trim() ||
      !DATE_REGEX.test(form.publishDate)
    ) {
      return;
    }

    const payload = {
      ...form,
      id: form.id || 0,
      pageCount: parseInt(form.pageCount, 10)
    };

    setLoading(true);
    try {
      if (form.id) {
        await editBook(form.id, payload);
      } else {
        await addBook(payload);
      }
      resetForm();
      setUiState((prev) => ({ ...prev, page: 1 })); // reset to first page
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setForm({
      ...book,
      publishDate: book.publishDate
        ? new Date(book.publishDate).toISOString().slice(0, 16)
        : ""
    });
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
      await removeBook(deleteState.target);
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
    setForm({
      id: null,
      title: "",
      description: "",
      pageCount: "",
      excerpt: "",
      publishDate: ""
    });
    setShowErrors(false);
  };

  // Generate cover (placeholder logic)
  const getCoverUrl = (bookId) =>
    `https://covers.openlibrary.org/b/id/${bookId}-L.jpg`;

  return (
    <div className="books">
      <h1>
        <FontAwesomeIcon icon="book" /> Book Manager
      </h1>

      {error && <div className="error">{error}</div>}

      {/* SEARCH with cancel */}
      <div className="search-input-container" style={{ position: "relative", marginBottom: "10px" }}>
        <Input
          type="text"
          className="search"
          placeholder="Search by title..."
          value={uiState.search}
          onChange={(e) => setUiState((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
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
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="wrapper">
          <Input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            pattern={TITLE_REGEX}
            errorMessage="Title must be 3–100 characters"
            validate={showErrors}
          />
        </div>

        <div className="wrapper">
          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            pattern={DESC_REGEX}
            errorMessage="Description must be at least 10 characters"
            validate={showErrors}
          />
        </div>

        <div className="wrapper">
          <Input
            name="pageCount"
            placeholder="Page Count"
            type="number"
            value={form.pageCount}
            onChange={handleChange}
            pattern={PAGECOUNT_REGEX}
            errorMessage="Must be a positive number"
            validate={showErrors}
          />
        </div>

        <div className="wrapper">
          <Input
            name="excerpt"
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={handleChange}
            pattern={DESC_REGEX}
            errorMessage="Excerpt must be at least 10 characters"
            validate={showErrors}
          />
        </div>

        <div className="wrapper">
          <DateTimePicker
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            pattern={DATE_REGEX}
            errorMessage="Invalid date format"
            validate={showErrors}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}>
          <Button type="submit" disabled={loading}>
            {form.id ? "Update" : "Add"} Book
            {loading && <FontAwesomeIcon icon="spinner" spin style={{ marginLeft: "8px" }} />}
          </Button>
          {form.id && (
            <Button type="button" onClick={resetForm} variant="danger">
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* BOOK LIST WITH SKELETON */}
      <ul className="book-list">
        {loadingBooks
          ? Array.from({ length: pageSize }).map((_, idx) => (
              <li key={idx} className="book-skeleton">
                <div className="book-cover"><Skeleton height={400} width={500} /></div>
                <div className="details">
                  <Skeleton width={200} height={20} />
                  <Skeleton count={2} width={150} height={15} />
                </div>
                <div className="actions">
                  <Skeleton circle width={30} height={30} />
                  <Skeleton circle width={30} height={30} />
                </div>
              </li>
            ))
          : paginated.map((book) => (
              <li key={book.id}>
                <div className="book-cover">
                  <img src={getCoverUrl(book.id)} alt={book.title} className="image" />
                </div>
                <div className="details">
                  <strong>{book.title}</strong>
                  <small>{book.description}</small>
                  <small>
                    <FontAwesomeIcon icon="file-lines" /> {book.pageCount} pages
                  </small>
                  <small>
                    <FontAwesomeIcon icon="calendar-days" />{" "}
                    {new Date(book.publishDate).toLocaleDateString()}
                  </small>
                </div>
                <div className="actions">
                  <Button onClick={() => handleEdit(book)} variant="icon">
                    <FontAwesomeIcon icon="pencil" />
                  </Button>
                  <Button onClick={() => handleDelete(book.id)} variant="icon">
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </div>
              </li>
            ))}
      </ul>

      {/* PAGINATION */}
      <Pagination
        page={uiState.page}
        totalPages={totalPages}
        onPageChange={(page) => setUiState((prev) => ({ ...prev, page }))}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteModel
        isOpen={!!deleteState.target}
        message="Are you sure you want to delete this book?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteState.deleting}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default BooksApproval(Books);













// import { useEffect, useState, useMemo } from "react";
// import "./Books.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import BooksApproval from "../../Containers/BooksBindActions/BooksActionApproval";
// import Input from "../../components/Form/input/Input";
// import Button from "../../components/Form/button/Button";
// import DateTimePicker from "../../components/Form/datetimepicker/Date";
// import { TITLE_REGEX, PAGECOUNT_REGEX, DATE_REGEX, DESC_REGEX } from "../../helper/Regex";
// import Pagination from "../../components/pagination/Pagination";
// import DeleteModel from '../../components/confirmModel/DeleteModel'

// const Books = ({ books = [], error, loadBooks, addBook, editBook, removeBook }) => {
//   const [form, setForm] = useState({
//     id: null,
//     title: "",
//     description: "",
//     pageCount: "",
//     excerpt: "",
//     publishDate: ""
//   });
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [showErrors, setShowErrors] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const pageSize = 10;
//    const [deleteTarget, setDeleteTarget] = useState(null);
//    const [deleting, setDeleting] = useState(false);

//   // Load books on mount
//   useEffect(() => {
//     loadBooks();
//   }, [loadBooks]);

//   // Filtered + Search (memoized)
//   const filtered = useMemo(() => {
//     let result = Array.isArray(books) ? [...books] : [];
//     if (search) {
//       result = result.filter((b) =>
//         b.title?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     return result;
//   }, [books, search]);

//   // Pagination (memoized)
//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page, pageSize]);

//   const totalPages = Math.ceil(filtered.length / pageSize) || 1;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true);

//     if (
//       !form.title.trim() ||
//       !TITLE_REGEX.test(form.title) ||
//       !form.description.trim() ||
//       !DESC_REGEX.test(form.description) ||
//       !form.pageCount ||
//       !PAGECOUNT_REGEX.test(form.pageCount) ||
//       !form.excerpt.trim() ||
//       !DESC_REGEX.test(form.excerpt) ||
//       !form.publishDate.trim() ||
//       !DATE_REGEX.test(form.publishDate)
//     ) {
//       return; // stop if invalid
//     }

//     const payload = {
//       ...form,
//       id: form.id || 0,
//       pageCount: parseInt(form.pageCount, 10)
//     };

//     setSaving(true);
//     try {
//       if (form.id) {
//         await editBook(form.id, payload);
//       } else {
//         await addBook(payload);
//       }
//       resetForm();
//       setPage(1);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (book) => {
//     setForm({
//       ...book,
//       publishDate: book.publishDate
//         ? new Date(book.publishDate).toISOString().slice(0, 16)
//         : ""
//     });
//     setShowErrors(false);
//   };

//   // Show modal instead of immediate delete
//   const handleDelete = (id) => {
//     setDeleteTarget(id);
//   };

//   const confirmDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await removeBook(deleteTarget);
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
//     setForm({
//       id: null,
//       title: "",
//       description: "",
//       pageCount: "",
//       excerpt: "",
//       publishDate: ""
//     });
//     setShowErrors(false);
//   };

//   // Generate cover (placeholder logic)
//   const getCoverUrl = (bookId) =>
//     `https://covers.openlibrary.org/b/id/${bookId}-L.jpg`;

//   return (
//     <div className="books">
//       <h1>
//         <FontAwesomeIcon icon="book" /> Book Manager
//       </h1>

//       {error && <div className="error">{error}</div>}

//       {/* SEARCH with cancel */}
//       <div className="search-input-container" style={{ position: "relative", marginBottom: '10px'}}>
//         <Input
//           type="text"
//           className="search"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ paddingRight: "28px" }}
//         />
//         {search && (
//           <FontAwesomeIcon
//             icon="xmark"
//             onClick={() => setSearch("")}
//             style={{
//               position: "absolute",
//               right: "8px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               cursor: "pointer",
//               color: "#888"
//             }}
//           />
//         )}
//       </div>

//       {/* FORM */}
//       <form className="book-form" onSubmit={handleSubmit}>
//         <div className="wrapper">
//           <Input
//             name="title"
//             placeholder="Title"
//             value={form.title}
//             onChange={handleChange}
//             pattern={TITLE_REGEX}
//             errorMessage="Title must be 3–100 characters"
//             validate={showErrors}
//           />
//         </div>

//         <div className="wrapper">
//           <Input
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             pattern={DESC_REGEX}
//             errorMessage="Description must be at least 10 characters"
//             validate={showErrors}
//           />
//         </div>

//         <div className="wrapper">
//           <Input
//             name="pageCount"
//             placeholder="Page Count"
//             type="number"
//             value={form.pageCount}
//             onChange={handleChange}
//             pattern={PAGECOUNT_REGEX}
//             errorMessage="Must be a positive number"
//             validate={showErrors}
//           />
//         </div>

//         <div className="wrapper">
//           <Input
//             name="excerpt"
//             placeholder="Excerpt"
//             value={form.excerpt}
//             onChange={handleChange}
//             pattern={DESC_REGEX}
//             errorMessage="Excerpt must be at least 10 characters"
//             validate={showErrors}
//           />
//         </div>

//         <div className="wrapper">
//           <DateTimePicker
//             name="publishDate"
//             value={form.publishDate}
//             onChange={handleChange}
//             pattern={DATE_REGEX}
//             errorMessage="Invalid date format"
//             validate={showErrors}
//           />
//         </div>

//         <div style={{display:'flex',alignItems:'flex-start',gap:'5px'}}>
//           <Button type="submit" disabled={saving}>
//             {form.id ? "Update" : "Add"} Book
//             {saving && <FontAwesomeIcon icon="spinner" spin style={{ marginLeft: "8px" }} />}
//           </Button>
//           {form.id && (
//             <Button type="button" onClick={resetForm} variant="danger">
//               Cancel
//             </Button>
//           )}
//         </div>
//       </form>

//       {/* BOOK LIST */}
//       <ul className="book-list">
//         {paginated.map((book) => (
//           <li key={book.id}>
//             <div className="book-cover">
//               <img src={getCoverUrl(book.id)} alt={book.title} className="image" />
//             </div>
//             <div className="details">
//               <strong>{book.title}</strong>
//               <small>{book.description}</small>
//               <small>
//                 <FontAwesomeIcon icon="file-lines" /> {book.pageCount} pages
//               </small>
//               <small>
//                 <FontAwesomeIcon icon="calendar-days" />{" "}
//                 {new Date(book.publishDate).toLocaleDateString()}
//               </small>
//             </div>
//             <div className="actions">
//               <Button onClick={() => handleEdit(book)} variant="icon">
//                 <FontAwesomeIcon icon="pencil" />
//               </Button>
//               <Button onClick={() => handleDelete(book.id)} variant="icon">
//                 <FontAwesomeIcon icon="trash" />
//               </Button>
//             </div>
//           </li>
//         ))}
//       </ul>

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

// export default BooksApproval(Books);