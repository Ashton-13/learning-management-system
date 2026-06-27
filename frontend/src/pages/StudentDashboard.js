import { useEffect, useState } from "react";
import api from "../api/axios";

function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await api.get(
                    "api/my-courses/"
                );
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
        <div style = {{ padding:"20px" }}>
            <h1>Student Dashboard</h1>
            <h3>My Courses</h3>
            {courses.length === 0 ? (
                <p>You currently don't have any courses. Head over to "Browse Courses" and get yourself enrolled!!</p>
            ) : ( 
                courses.map((course) => (
                <div 
                    key={course.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >   
                    <h4>{course.title}</h4>
                    <p>{course.desctiption}</p>
                </div>
                ))
            )}
            <hr />
            <h3>Completed Courses</h3>
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
                        <p>{course.description}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default StudentDashboard;