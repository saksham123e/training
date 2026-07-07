import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import StudentCard from "./components/StudentCard";
import EmployeeCard from "./components/EmployeeCard";
import EventDemo from "./components/EventDemo";
import Footer from "./components/Footer";
import LoginStatus from "./components/LoginStatus";

function App() {
  return (
    <>
      <Navbar />

      <Hero
        name="Saksham Arora"
        role="Full Stack Developer"
        description="Currently learning React fundamentals to become better in Next.js."
      />

      <About />
      <Skills />
      <Projects />

      <h2>Student Details</h2>

      <StudentCard name="Saksham Arora" course="B.Tech CSE" age="22" />
      <StudentCard name="Rahul Sharma" course="BCA" age="21" />
      <StudentCard name="Priya Singh" course="MCA" age="23" />

      <h2>Employee Details</h2>

      <EmployeeCard
        name="Aman"
        designation="Backend Developer"
        salary="12 LPA"
        experience="3 Years"
      />

      <EmployeeCard
        name="Priya"
        designation="Frontend Developer"
        salary="10 LPA"
        experience="2 Years"
      />

      <EmployeeCard
        name="Rohit"
        designation="UI Designer"
        salary="11 LPA"
        experience="4 Years"
      />

      <LoginStatus />
      
      <EventDemo />

      <Footer />
    </>
  );
}

export default App;