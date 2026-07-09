import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/courses.css"

function CourseListPage () {

const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [enrolledCourses, setEnrolledCourses] = useState([]);
const [message, setMessage] = useState("");
const navigate = useNavigate();

const getCourses = async () => {
    try {
        const response = await api.get("api/courses/");
        setCourses(response.data);

    } catch (error) {
        console.error("Error loading courses:", error);

        setMessage("Error loading courses. Please try again later.");

    } finally {
        setLoading(false);
    }
};

const fetchEnrollments = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return;
    }
    try {
        const response = await api.get("api/my-courses/");

        const enrolledIds = response.data.map(course => course.id);

        setEnrolledCourses(enrolledIds);

    } catch (error) {
        console.log("No enrollments or not logged in")
    }
};

    useEffect(() => {
        getCourses();
        fetchEnrollments();
    }, []);

    const handleEnrollment = async (courseId) => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        navigate("/login");
        return;
    }

    setMessage("");

    try {
        await api.post("/api/enroll/", 
            { course_id: courseId },
        );

    setEnrolledCourses((prev) => [...prev, courseId]);

    setMessage("Successfully enrolled in the course!");

} catch (error) {
    console.error(error);

    setMessage("Error enrolling in the course. Please try again.");

}
};
        
if (loading) {
    return <p className="courseloading">Loading courses...</p>;
}

return (
    <div className="course-page">

        <h1>Browse Courses</h1>

        {message && (
            <p 
            className="course-message" 
            aria-live="polite"
            >
                {message}
            </p>
        )}

        <div className="course-list">
            {courses.map(course => {
                const isEnrolled = enrolledCourses.includes(course.id);

                return (
                    <div key={course.id} className="browse-course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button
                            type="button"
                            onClick={() => handleEnrollment(course.id)}
                            disabled={isEnrolled}
                            className={isEnrolled ? "btn-enrolled" : "btn-enroll"}
                        >
                            {isEnrolled ? "Enrolled ✔" : "Enroll"}
                        </button>
                    </div>
                );
            })}
        </div>
    
    </div>
);
}



export default CourseListPage;