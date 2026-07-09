import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import "../styles/teacherdashboard.css";

function TeacherDashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");

    const { username } = useSelector(
        (state) => state.auth
    );

    const fetchCourses = useCallback(async () => {
        try {
            const response = await api.get(
                "api/teacher/courses/"
            );

            setCourses(response.data);

        } catch (error) {
            console.error(
                "Error loading teacher dashboard",
                error
            );

            setMessage(
                "Unable to load your courses."
            );

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");

        try {
            if (editingId) {
                await api.put(
                    `api/courses/${editingId}/`,
                    {
                        title,
                        description,
                    }
                );

                setMessage(
                    "Course updated successfully."
                );

            } else {
                await api.post(
                    "api/courses/",
                    {
                        title,
                        description,
                    }
                );

                setMessage(
                    "Course created successfully."
                );
            }

            setTitle("");
            setDescription("");
            setEditingId(null);

            fetchCourses();

        } catch (error) {
            console.error(
                "Save failed",
                error
            );

            setMessage(
                "Unable to save course. Please try again."
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this course?"
        );

        if (!confirmed) {
            return;
        }

        setMessage("");

        try {
            await api.delete(
                `api/courses/${id}/`
            );

            setMessage(
                "Course deleted successfully."
            );

            fetchCourses();

        } catch (error) {
            console.error(
                "Delete failed",
                error
            );

            setMessage(
                "Unable to delete course. Please try again."
            );
        }
    };

    const handleEdit = (course) => {
        setTitle(course.title);
        setDescription(course.description);
        setEditingId(course.id);
        setMessage("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setMessage("");
    };

    if (loading) {
        return (
            <p className="teacher-loading">
                Loading teacher dashboard...
            </p>
        );
    }

    return (
        <div className="teacher-dashboard">
            <h1>Teacher Dashboard</h1>

            <p className="teacher-welcome">
                Welcome, {username}
            </p>

            {message && (
                <p
                    className="teacher-message"
                    aria-live="polite"
                >
                    {message}
                </p>
            )}

            <section className="course-form">
                <h2>
                    {editingId ? "Edit Course" : "Create New Course"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="course-title">
                        Course Title
                    </label>

                    <input
                        id="course-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        required
                    />

                    <label htmlFor="course-description">
                        Course Description
                    </label>

                    <textarea
                        id="course-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />

                    <div className="form-actions">
                        <button type="submit">
                            {editingId ? "Update Course" : "Create Course"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="teacher-courses">
                <h2>My Courses</h2>

                {courses.length === 0 ? (
                    <p>
                        You currently have no created courses yet.
                    </p>
                ) : (
                    <div className="teacher-course-list">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="teacher-course-card"
                            >
                                <h3>{course.title}</h3>

                                <p>{course.description}</p>

                                <div className="actions">
                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEdit(course)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(course.id)
                                        }
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