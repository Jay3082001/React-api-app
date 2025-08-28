import { useEffect, useState, useMemo } from "react";
import "../AuthUsers/AuthUsers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserApproval from "../../Containers/UseraBindActions/UsersActionsApproval";
import Input from "../../components/Form/input/Input";
import Button from "../../components/Form/button/Button";
import { NAME_REGEX, passwordRegex } from "../../helper/Regex";
import Pagination from "../../components/pagination/Pagination";
import Table from "../../components/table/Table";
import DeleteModel from "../../components/confirmModel/DeleteModel";
import PasswordInput from "../../components/Form/password/Password";
import Checkbox from "../../components/Form/checkbox/CheckBox";

// API functions 
const addUserAPI = async (user) => {
  const res = await fetch("http://localhost:7000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return await res.json();
};

const editUserAPI = async (id, user) => {
  const res = await fetch(`http://localhost:7000/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
};

const removeUserAPI = async (id) => {
  const res = await fetch(`http://localhost:7000/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
};

const fetchUsersAPI = async () => {
  const res = await fetch("http://localhost:7000/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

const UserList = ({ users = [] }) => {
  const [usersState, setUsersState] = useState(users); // Local table state
  const [form, setForm] = useState({ id: null, username: "", password: "", read: false, write: false });
  const [uiState, setUiState] = useState({ search: "", page: 1 });
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteState, setDeleteState] = useState({ target: null, deleting: false });

  const pageSize = 10;

  // Filter + search
  const filtered = useMemo(() => {
    if (!Array.isArray(usersState)) return [];
    if (!uiState.search.trim()) return usersState;
    return usersState.filter((u) =>
      u.userName?.toLowerCase().includes(uiState.search.toLowerCase())
    );
  }, [usersState, uiState.search]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (uiState.page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, uiState.page]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  // Form change
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: null, username: "", password: "", read: false, write: false });
    setShowErrors(false);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (
      !form.username.trim() ||
      !NAME_REGEX.test(form.username) ||
      !form.password.trim() ||
      !passwordRegex.test(form.password)
    ) {
      return;
    }

    const payload = {
      id: form.id || Date.now(),
      username: form.username,
      password: form.password,
      read: form.read,
      write: form.write,
    };

    setLoading(true);
    try {
      if (form.id) {
        const updated = await editUserAPI(form.id, payload);
        setUsersState((prev) => prev.map((u) => (u.id === form.id ? updated : u)));
      } else {
        const added = await addUserAPI(payload);
        setUsersState((prev) => [added, ...prev]);
      }
      resetForm();
      setUiState((prev) => ({ ...prev, page: 1 }));
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
      await removeUserAPI(deleteState.target);
      setUsersState((prev) => prev.filter((u) => u.id !== deleteState.target));
      if (form.id === deleteState.target) resetForm();
      setDeleteState({ target: null, deleting: false });
    } finally {
      setDeleteState((prev) => ({ ...prev, deleting: false }));
    }
  };

  const cancelDelete = () => {
    setDeleteState({ target: null, deleting: false });
  };

  // Fetch users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsersAPI();
        setUsersState(data);
      } catch (err) {
        // Optionally handle error
        setUsersState([]);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="user-container">
      <h2>
        <FontAwesomeIcon icon={faUsers} /> User Manager
      </h2>

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
              color: "#888",
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
              name="username" // <-- changed
              placeholder="Username"
              value={form.username}
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
              pattern={passwordRegex}
              errorMessage="Password must have at least 1 uppercase, 1 lowercase,1 Special Character and 1 number"
              validate={showErrors}
              variant="usersPage"
            />
          </div>
          <div className="input-group" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "150px" }}>
            <label>
              <Checkbox
                type="checkbox"
                name="read"
                label="Read"
                checked={form.read}
                onChange={e => setForm(prev => ({ ...prev, read: e.target.checked }))}
              />
            </label>
            <label style={{ marginLeft: "16px" }}>
              <Checkbox
                type="checkbox"
                name="write"
                label="Write"
                checked={form.write}
                onChange={e => setForm(prev => ({ ...prev, write: e.target.checked }))}
              />
            </label>
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
          { key: "username", label: "Username" },
          { key: "password", label: "Password" },
        ]}
        data={paginated}
        page={uiState.page}
        pageSize={pageSize}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No users found"
        loading={false}
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