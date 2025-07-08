//import logo from './logo.svg'; <img src={logo} className="App-logo" alt="logo" />
import './App.css';

import Header from './pages/home/header/header';
import Home from './pages/home/home';
import About from './pages/home/about/about';
import Contact from './pages/home/contact/contact';
import Footer from './pages/home/footer/footer';
import Navbar from './components/navbar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserList from './components/userList';
// import Profile from './components/profile';



const App: React.FC = () => {
  return (
    <BrowserRouter>
        <>
      <Header />
       <Navbar />
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
           </Routes>
      <main>
        <Home />
         <UserList />
        <About />
        <Contact />
      </main> 
      <Footer />
    </>
         
       </BrowserRouter>
  );
};



export default App;