import { useState, useEffect } from "react";
import api from "../api/axios";

function AdminUserTable() {

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: "",
        email: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            const response = await api.get("api/users/");

            setUsers(response.data);

        } catch (error) {

            console.error("Failed to load users", error);
            setMessage("Unable to load users.");

        }
    };

    const editUser = (user) => {

        setEditingUser(user.id);

        setEditForm({
            username: user.username,
            email: user.email,
            role: user.role,
        });
        setMessage("");
    };

    const saveUser = async (id) => {
        setMessage("");
        try {

            await api.patch(
                `api/users/${id}/`,
                editForm
            );

            setEditingUser(null);
            setMessage("User updated successfully.");
            fetchUsers();

        } catch (error) {

            console.error("Failed to update user", error);

            setMessage("Unable to update user.");

        }

    };

    const deleteUser = async (id) => {

        const confirmed = window.confirm("Are you sure you want to delete this user?");

        if (!confirmed) {
            return;
        }
        setMessage("");
        try {

            await api.delete(
                `api/users/${id}/`
            );
            setMessage("User deleted successfully.");
            fetchUsers();

        } catch (error) {

            console.error("Failed to delete user",error);

            setMessage("Unable to delete user. This may be a protected admin account.")

        }

    };

    const cancelEdit = () => {
        setEditingUser(null);

        setEditForm({
            username: "",
            email: "",
            role: "",
        });
        setMessage("");
    };

    return (
        <section className="admin-card">
            <h2>User Management</h2>

            {message && (
                <p 
                    className="admin-message"
                    aria-live="polite"
                >
                    {message}
                </p>
            )}

        <div className="admin-table-wrapper">

            <table className="admin-table">

                <thead>

                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            {editingUser === user.id ? (

                                <>

                                    <td>

                                        <label
                                            className="sr-only"
                                            htmlFor={`username-${user.id}`}
                                        >
                                            Username
                                        </label>

                                        <input
                                            id={`username-${user.id}`}
                                            type="text"
                                            value={editForm.username}
                                            required
                                            onChange={(event) =>
                                                setEditForm({
                                                    ...editForm,
                                                    username: event.target.value,
                                                })
                                            }
                                        />

                                    </td>

                                    <td>

                                        <label
                                            className="sr-only"
                                            htmlFor={`email-${user.id}`}
                                        >
                                            Email
                                        </label>

                                        <input
                                            id={`email-${user.id}`}
                                            type="email"
                                            value={editForm.email}
                                            required
                                            onChange={(event) =>
                                                setEditForm({
                                                    ...editForm,
                                                    email: event.target.value,
                                                })
                                            }
                                        />

                                    </td>

                                    <td>
                                        <label
                                            className="sr-only"
                                            htmlFor={`role-${user.id}`}
                                        >
                                            Role
                                        </label>

                                        <select
                                            id={`role-${user.id}`}
                                            value={editForm.role}
                                            required
                                            onChange={(event) =>
                                                setEditForm({
                                                    ...editForm,
                                                    role: event.target.value,
                                                })
                                            }
                                        >

                                            <option value="student">
                                                Student
                                            </option>

                                            <option value="teacher">
                                                Teacher
                                            </option>

                                            <option value="admin">
                                                Admin
                                            </option>

                                        </select>

                                    </td>

                                    <td className="admin-actions">

                                        <button
                                            type="button"
                                            className="admin-btn save-btn"
                                            onClick={() =>
                                                saveUser(user.id)
                                            }
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            className="admin-btn cancel-btn"
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>

                                    </td>

                                </>

                            ) : (

                                <>

                                    <td>{user.username}</td>

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                    <td className="admin-actions">

                                        <button
                                            type="button"
                                            className="admin-btn edit-btn"
                                            onClick={() =>
                                                editUser(user)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="admin-btn delete-btn"
                                            onClick={() =>
                                                deleteUser(user.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </>

                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
        </section>
    );

}

export default AdminUserTable;