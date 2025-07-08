//import logo from './logo.svg'; <img src={logo} className="App-logo" alt="logo" />
import './App.css';

import React from 'react';
import Header from './pages/home/header/header';
import Home from './pages/home/home';
import About from './pages/home/about/about';
import Contact from './pages/home/contact/contact';
import Footer from './pages/home/footer/footer';



const App: React.FC = () => {
  return (
        <>
      <Header />
      <main>
        <Home />
        <About />
        <Contact />
      </main> 
      <Footer />
    </>
  );
};



export default App;
