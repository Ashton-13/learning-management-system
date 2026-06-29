import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/TeacherDashboard.css";

function TeacherDashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const { username } = useSelector(
        (state) => state.auth
    );
    const token = localStorage.getItem("accessToken");

        const fetchCourses = async () => {
            try {
                const response = await api.get("api/teacher/courses/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCourses(response.data);
            } catch (error) {
                console.error("Error loading teacher dashboard", error);
            } finally {
                setLoading(false);
            }
        };
          
    useEffect(() => {
        fetchCourses(); 
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                if (editingId) {
                    await api.put(
                        `/api/courses/${editingId}/`,
                        {title, description},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } else {
                    await api.post(
                        "/api/courses/",
                        {title, description},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }

                setTitle("");
                setDescription("");
                setEditingId(null);
                fetchCourses();
            } catch (error) {
                console.error("Save failed", error);
            }
        };

        const handleDelete = async (id) => {
            const confirmed = window.confirm(
                "Are you sure you want to permanantly delete this course?"
            );

            if (!confirmed) return;

            try {
                await api.delete(`/api/courses/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                fetchCourses();
            } catch (error) {
                console.error("Delete failed", error);
            }
        };

        const handleEdit = (course) => {
            setTitle(course.title);
            setDescription(course.description);
            setEditingId(course.id);
        };

    if (loading) {
        return <p>Loading teacher's dashboard...</p>
    }
    return ( 
        <div className="teacher-dashboard">
            <h1>Teacher Dashboard</h1>
            <p>Welcome, {username}</p>

            <section className="course-form">
                <h2>{editingId ? "Edit Course" : "Create New Course"}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Course tile"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Course description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {editingId ? "Update Course" : "Create Course"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setTitle("");
                                setDescription("");
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </section>

            <section>
            <h2>My Courses</h2>
            {courses.length === 0 ? (
                <p>You currently have no created courses yet.</p>
            ) : (
                <div className="course-list">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        <div className="actions">
                            <button onClick={() => handleEdit(course)}>
                                Edit
                            </button>

                            <button onClick={() => handleDelete(course.id)}
                                    style={{ background: "red", color: "white" }}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}
                </div>
            )}
            </section>
        </div>
    );
}

export default TeacherDashboard;