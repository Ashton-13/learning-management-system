import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/studentdashboard.css"

function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await api.get(
                    "api/my-courses/");

                console.log("My courses:",response.data);
                setCourses(response.data);

            } catch (error) {
                console.error(
                    "There's been an error loading your courses:",
                    error
                );

                setMessage("Unable to load your courses.");

            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);
    
    const toggleCompletion = async (courseId) => {
        setMessage("");

        try {
            await api.patch(
                `/api/courses/${courseId}/toggle-complete/`,
                {}
            );

            setCourses((prev) =>
                prev.map((course) => 
                    course.id === courseId
                        ? {
                            ...course,
                            is_completed: !course.is_completed,
                          }
                        : course
                )
            );

            setMessage("Course status updated successfully.");

        } catch (error) {
            console.error("Error updating courses:", error);

            setMessage("Failed to update course status.");
        }
    };

    if (loading) {
        return <p className="student-loading">Loading your dashboard...</p>;

    }

    const inProgressCourses = courses.filter(
        (course) => !course.is_completed
    );

    const completedCourses = courses.filter(
        (course) => course.is_completed
    );

    return (
        <div className="student-dashboard">
            <h1>Student Dashboard</h1>

            {message && (
                <p 
                    className="student-message" 
                    aria-live="polite"
                >   
                    {message}
                </p>
            )}

            <section>
                <h2>My Courses</h2>

                {inProgressCourses.length === 0 ? (
                    <p>
                        You currently don't have any courses. Head over to "Browse Courses" and get yourself enrolled!!
                    </p>
            ) : (
                <div className="course-grid"> 
                    {inProgressCourses.map((course) => (
                    <div 
                        key={course.id}
                        className="student-course-card"
                    >   
                        <h3>{course.title}</h3>

                        <p>{course.description}</p>

                        <button className="complete-btn" onClick={() => toggleCompletion(course.id)}>
                            ✔ Mark Completed   
                        </button>
                    </div>
                ))}
                </div>
            )}

            </section>
            <hr />
            <section>
            <h2>Completed Courses</h2>
            {completedCourses.length === 0 ? (
                <p>No completed courses yet. Keep working at it, you got this!</p>
            ) : (
                <div className="course-grid">
                {completedCourses.map((course) => (
                    <div key={course.id} className="student-course-card">
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>
                        <button className="in-progress-btn" onClick={() => toggleCompletion(course.id)}>
                            ↩ Mark In Progress
                        </button>
                    </div>
                ))}
                </div>
            )}
            </section>
        </div>
    );
}

export default StudentDashboard;