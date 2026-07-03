import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Hero
        name="Saksham Arora"
        role="bussiness man"
        description=""
      />
      <Hero
        name="Virat Kohli"
        role="Cricketer"
        description="One of the greatest batsmen."
      />

      <Hero
        name="Elon Musk"
        role="Entrepreneur"
        description="CEO of Tesla and SpaceX."
      />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}

export default App;