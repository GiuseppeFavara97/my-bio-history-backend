  
   import './navbar.css'; // Importa il foglio di stile (opzionale)

   const Navbar = () => {
     return (
       <nav className="navbar">
         <div className="navbar-brand">
           {/* Logo o nome del sito */}
           <a href="/">Nome del Sito</a>
         </div>
         <ul className="navbar-links">
           <li><a href="/">Home</a></li>
           <li><a href="/about">About</a></li>
           <li><a href="/contact">Contact</a></li>
         </ul>
       </nav>
     );
   };

   export default Navbar;