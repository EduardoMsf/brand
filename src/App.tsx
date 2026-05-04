import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Quotes from "./components/Quotes";
import Footer from "./components/Footer";

function SectionDivider() {
  return <div className="section-divider" />;
}

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
        <SectionDivider />
        <Quotes />
      </main>

      <Footer />
    </>
  );
}
