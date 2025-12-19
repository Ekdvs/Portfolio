
import './App.css'
import React from 'react';


// Import data
import { projects } from './data/projects';
import { skills } from './data/skills';
import { services } from './data/services';
import Navbar from './components/Navbar,';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';




const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Navbar />
      <Hero />
      <About services={services}  profileImage="vishwa.png"/>
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;