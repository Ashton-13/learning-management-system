import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/courses.css"

function CourseListPage () {

const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [enrolledCourses, setEnrolledCourses] = useState([]);
const navigate = useNavigate();

const getCourses = async () => {
    try {
        const response = await api.get("api/courses/");
        setCourses(response.data);
    } catch (error) {
        console.error("Error loading courses:", error);
    } finally {
        setLoading(false);
    }
};

const fetchEnrollments = async () => {
    try {
        const response = await api.get("api/my-courses/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

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
    try {
        await api.post("/api/enroll/", 
            { course_id: courseId },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

    setEnrolledCourses((prev) => [...prev, courseId]);
} catch (error) {
    console.error(error);
}
};
        
if (loading) {
    return <p>Loading courses...</p>;
}

return (
    <div className="course-page">

        <h1>Browse Courses</h1>

        <div className="course-list">
            {courses.map(course => {
                const isEnrolled = enrolledCourses.includes(course.id);

                return (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button
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