import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/home-page.css";

function HomePage() {
    const { isAuthenticated, role } = useSelector(
        (state) => state.auth
    );

    return (
        <main className="home">
            <section className="hero">

                <h1>🪐Science Academy</h1>

                <p>Explore various aspects of Physics and Chemistry through interactive online courses designed for students of all levels!</p>

                <div className="hero-buttons">
                    <Link 
                        to="/courses"
                        className="primary-button"
                    >
                        Browse Courses
                    </Link>

                    {!isAuthenticated ? (
                        <Link
                            to="/login"
                            className="secondary-button"
                        >
                            Login
                        </Link>
                    ) : (
                        <Link 
                            to={
                                role === "student"
                                    ? "/student"
                                    : "/teacher"
                            }
                            className="secondary-button"
                        >
                            Dashboard   
                        </Link>
                    )}
                </div>

            </section>

            <section>
                <h2>Subjects</h2>
                <div className="subject-container">
                <div className="subject-card">
                    <h3>Physics⚛️</h3>
                    <p>
                        Study motion, energy, electricity, forces and the laws that explain how our universe works.
                    </p>
                </div>
                <div className="subject-card">
                    <h3>Chemistry🧪</h3>
                    <p>
                        Discover atoms, molecules, chemical reactions and the building blocks of matter.
                    </p>
                </div>
                </div>
            </section>
            <section className="feature">
                    <h2>Why should you study with Science Academy?</h2>
                    <div className="feature-container">
                        <div className="feature-card">
                            <h3>Interactive Learning</h3>
                            <p>Browse science courses and study at your own pace.</p>
                        </div>
                    <div className="feature-card">
                        <h3>Track Your Progress</h3>
                        <p>Keep track of which courses you have enrolled in and which ones you have completed.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Teacher Support</h3>
                        <p>Book in a one-to-one lesson with your teacher when you find yourself needing some extra help.</p>
                    </div>
                    </div>
            </section>
            <footer 
                id="container"
                className="footer"
            >
                <h2>Contact Us</h2>
                <p>Email: support@scienceacademy.com</p>
                <p>Phone: +44 1324 06978</p>
                <p>©️ Science Academy est. 2026</p>
            </footer>
        </main>
    );
}

export default HomePage;