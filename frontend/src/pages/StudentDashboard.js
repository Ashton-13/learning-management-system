import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Student.css"

function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await api.get(
                    "api/my-courses/", {
                        headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                console.log("My courses:",response.data);
                setCourses(response.data);
            } catch (error) {
                console.error(
                    "There's been an error loading your courses:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);


    if (loading) {
        return <p>Loading your dashboard...</p>;

    }
    const completedCourses = courses.filter(
        (c) => c.is_completed === true
    );
    return (
        <div className="student-dashboard">
            <h1>Student Dashboard</h1>
            <section>
            <h2>My Courses</h2>
            {courses.length === 0 ? (
                <p>You currently don't have any courses. Head over to "Browse Courses" and get yourself enrolled!!</p>
            ) : ( 
                courses.map((course) => (
                <div 
                    key={course.id}
                    className="course-card"
                >   
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <span className="status">
                        In Progress
                    </span>
                </div>
                ))
            )}
            </section>
            <hr />
            <section>
            <h2>Completed Courses</h2>
            {completedCourses.length === 0 ? (
                <p>No completed courses yet. Keep working at it, you got this!</p>
            ) : (
                completedCourses.map((course) => (
                    <div
                        key={course.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            background: "e8f5e9",
                        }}
                    >
                        <h4>{course.title}</h4>
                        <p>{course.course.description}</p>
                    </div>
                ))
            )}
            </section>
        </div>
    );
}

export default StudentDashboard;