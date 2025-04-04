import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook to go back

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white p-4 shadow-md flex items-center justify-between">
      <div className="container mx-auto flex justify-between items-center">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white text-blue-700 p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          title="Go Back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold">Voting System</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" label="Home" location={location} />
          <NavLink to="/login" label="Login" location={location} />
          <NavLink to="/register" label="Register" location={location} />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink to="/" label="Home" location={location} mobile />
          <NavLink to="/login" label="Login" location={location} mobile />
          <NavLink to="/register" label="Register" location={location} mobile />
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, label, location, mobile = false }) {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`${
        isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300"
      } ${mobile ? "block p-2" : "text-lg"}`}
    >
      {label}
    </Link>
  );
}

export default Navbar;
