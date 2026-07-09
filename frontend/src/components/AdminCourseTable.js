import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminCourseTable() {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "", 
        description: "",
    });

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get(
                "api/admin/courses/"
            );
            setCourses(response.data);

        } catch (error) {
            console.error("Failed to load courses", error);
            setMessage("Unable to load courses.");
        }
    };

    const createCourse = async (event) => {
        event.preventDefault();

        setMessage("");

        try {
            await api.post(
                "api/courses/",
                newCourse
            );

            setNewCourse({
                title: "",
                description: "",
            });

            setMessage("Course created successfully.");
            fetchCourses();
        } catch (error) {
            console.error("Failed to create course", error);
            setMessage("Unable to create course.")
        }
    };

    const editCourse = (course) => {
        setEditingCourse(course.id);

        setEditForm({
            title: course.title,
            description: course.description,
        });
        setMessage("");
    };
    const saveCourse = async (id) => {
        setMessage("");
        try {
            await api.patch(
                `api/courses/${id}/`,
                editForm
            );
            setEditingCourse(null);
            setMessage("Course updated successfully.");
            fetchCourses();
        } catch(error) {
            console.error("Failed to update course", error);
            setMessage("Unable to update course.")
        }
    };

    const deleteCourse = async (id) => {
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
            setMessage("Course deleted successfully.");
            fetchCourses();
        } catch (error) {
            console.error("Failed to delete course", error);
            setMessage("Unable to delete course.");
        }
    };

    const cancelEdit = () => {
        setEditingCourse(null);
        setEditForm({
            title: "",
            description: "",
        });
        setMessage("");
    };

    return (
        <section className="admin-card">
            <h2>Course Management</h2>

            {message && (
                <p
                    className="admin-message"
                    aria-live="polite"
                >
                    {message}
                </p>
            )}

            <form
                className="admin-course-form"
                onSubmit={createCourse}
            >
                <h3>Create New Course</h3>

                <label htmlFor="admin-course-title">
                    Course Title
                </label>

                <input
                    id="admin-course-title"
                    type="text"
                    value={newCourse.title}
                    required
                    onChange={(event) =>
                        setNewCourse({
                            ...newCourse,
                            title:event.target.value,
                        })
                    }
                />
                <label htmlFor="admin-course-description">
                    Course Description
                </label>

                <textarea
                    id="admin-course-description"
                    value={newCourse.description}
                    required
                    onChange={(event) =>
                        setNewCourse({
                            ...newCourse,
                            description: event.target.value,
                        })
                    }
                />
                <button
                    type="submit"
                    className="admin-btn save-btn"
                >
                    Create Course
                </button>
                
            </form>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Description</th>
                            <th>Teacher ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                {editingCourse === course.id ? (
                                    <>
                                        <td>
                                            <label
                                                className="sr-only"
                                                htmlFor={`course-title-${course.id}`}
                                            >
                                                Course Title
                                            </label>

                                            <input
                                                id={`course-title-${course.id}`}
                                                type="text"
                                                value={editForm.title}
                                                required
                                                onChange={(event) => 
                                                    setEditForm({
                                                        ...editForm,
                                                        title: event.target.value,
                                                    })
                                                }
                                            />
                                            
                                        </td>

                                        <td>
                                            <label
                                                className="sr-only"
                                                htmlFor={`course-description-${course.id}`}
                                            >
                                                Course Description
                                            </label>
                                            <textarea
                                                id={`course-description-${course.id}`}
                                                value={editForm.description}
                                                required
                                                onChange={(event) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        description: event.target.value,
                                                    })
                                                }
                                            />
                                        </td>

                                        <td>{course.teacher}</td>
                                        <td className="admin-actions">
                                            <button
                                                type="button"
                                                className="admin-btn save-btn"
                                                onClick={() =>
                                                    saveCourse(course.id)
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
                                        <td>{course.title}</td>
                                        <td>{course.description}</td>
                                        <td>{course.teacher}</td>
                                        <td className = "admin-actions">
                                            <button
                                                type="button"
                                                className="admin-btn edit-btn"
                                                onClick={() =>
                                                    editCourse(course)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="admin-btn delete-btn"
                                                onClick={() =>
                                                    deleteCourse(course.id)
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

export default AdminCourseTable;