import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CourseListPage () {

const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [enrolledCourses, setEnrolledCourses] = useState([]);
const navigate = useNavigate();

const handleEnrollment = async (courseId) => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        navigate("/login");
        return;
    }
    try {
        await api.post("/api/enroll/", {
            course: courseId,
        });

    setEnrolledCourses((prev) => [...prev, courseId]);
} catch (error) {
    console.error(
        "Enrollment failed:",
        error.response?.data || error
    );
    if(error.response?.status === 400) {
        alert("Enrolled in this course already.");
    } else {
        alert("Enrollment failed.")
    }
}
};

useEffect(() => {
    const fetchCourses = async () => {

        try {
            const response = await api.get(
                "api/courses/"
            );
            setCourses(response.data);
        } catch (error) {
            console.error(
                "Error loading courses:",
                error
            );
        } finally {
            setLoading(false);
        }
    };
    fetchCourses();

}, []);

if (loading) {
    return <p>Loading courses...</p>;
}

return (
    <div>

        <h1>Available Courses</h1>

        {courses.length === 0 ? (
            <p>No courses available.</p>
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
                    <h3>
                        {course.title}
                    </h3>

                    <p>
                        {course.description}
                    </p>
                    <button onClick={() => handleEnrollment(course.id)}
                        disabled={enrolledCourses.includes(course.id)}
                        style={{
                            backgroundColor: enrolledCourses.includes(course.id)
                                ? "green"
                                : "#00897B",
                            color: "white",
                            padding: "8px 12px",
                            border: "none",
                            cursor: enrolledCourses.includes(course.id)
                                ? "default"
                                : "pointer",
                            opacity: enrolledCourses.includes(course.id)
                                ? 0.7
                                : 1,
                        }}
                    >
                        {enrolledCourses.includes(course.id)
                        ? "Enrolled ✔"
                        : "Enroll"}
                    </button>
                </div>
            ))
        )}
    </div>
);
}



export default CourseListPage;