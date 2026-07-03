import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import StudentCard from "./components/StudentCard";

function App() {
  return (
    <>
      <Navbar />

      <Hero
        name="Saksham Arora"
        role="Full Stack Developer"
        description="Currently learning React and Next.js."
      />

      <About />

      <Skills />

      <Projects />

      <h2>Student Details</h2>

      <StudentCard
        name="Saksham Arora"
        course="B.Tech CSE"
        age="22"
      />

      <StudentCard
        name="Rahul Sharma"
        course="BCA"
        age="21"
      />

      <StudentCard
        name="Priya Singh"
        course="MCA"
        age="23"
      />

      <Footer />
    </>
  );
}

export default App;