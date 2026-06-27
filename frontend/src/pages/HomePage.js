import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/HomePage.css";

function HomePage() {
    const { isAuthenticated, role } = useSelector(
        (state) => state.auth
    );

    return (
        <main className="home">
            <section className="hero">

                <h1>Science Academy</h1>

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
        </main>
    );
}

export default HomePage;