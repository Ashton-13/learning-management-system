import { useEffect, useState } from "react";
import api from "../api/axios";

function CourseListPage () {

const [courses, setCourses] = useState([]);

const [loading, setLoading] = useState(true);

const handleEnrollment = async (courseId) => {
    try {
        await api.post("api/enroll/", {
            course: courseId,
        });
        alert("Successfully enrolled!");
    } catch (error) {
        console.error(
            "Enrollment was unsuccessful",
            error.response?.data || error
        );

        if (error.response?.status === 400) {
        alert("You are already enrolled in this course.");
    } else {
        alert("Enrollment unsuccessful. Please try again.");
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
                    <button onClick={() => handleEnrollment(course.id)}>Enroll</button>
                </div>
            ))
        )}
    </div>
);
}



export default CourseListPage;