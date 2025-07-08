import Navbar from './components/navbar';
   import React from 'react';
   import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
   

   //import Home from './components/Home';
   //import About from './components/About';
   //import Contact from './components/Contact';


    

   function App() {
     return (
       <BrowserRouter>
         <div>
           <Navbar />
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
           </Routes>
           {/* Altri contenuti */}
         </div>
       </BrowserRouter>
     );
   }
   

   export default App;