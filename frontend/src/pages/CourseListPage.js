import { useEffect, useState } from "react";
import api from "../api/axios";

function CourseListPage () {
// Stores courses retrieved from the API
const [courses, setCourses] = useState([]);
// Stores loading state
const [loading, setLoading] = useState(true);

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

                </div>
            ))
        )}
    </div>
);
}


export default CourseListPage;